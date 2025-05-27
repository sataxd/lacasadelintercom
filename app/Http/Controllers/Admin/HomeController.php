<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\Item;
use App\Models\Sale;
use App\Models\SaleDetail;
use App\Models\SaleStatus;
use App\Models\Status;
use App\Models\User;
use App\Models\WebsiteStatistic;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends BasicController
{
    public $reactView = 'Admin/Home';
    public $reactRootView = 'admin';

    // Ajusta los nombres de status a los que realmente representan ventas efectivas en tu sistema
    private $completedStatusNames = ['Concluido', 'Procesando'];

    public function setReactViewProperties(Request $request)
    {
        // Pedidos por estado
        $statuses = Status::all();
        $ordersByStatus = [];
        foreach ($statuses as $status) {
            $count = Sale::where('status_id', $status->id)->count();
            $ordersByStatus[] = [
                'name' => $status->name,
                'color' => $status->color,
                'count' => $count
            ];
        }

        // Productos con inventario bajo (incluye variantes)
        $lowStockItems = Item::where('stock', '<=', 'min_stock')
            ->orderBy('stock')
            ->get(['id', 'name', 'sku', 'stock','image','final_price']);
        // Agregar variantes con bajo stock
        $variantLowStock = DB::table('item_variants')
            ->join('items', 'item_variants.item_id', '=', 'items.id')
            ->select('item_variants.id', 'items.name', 'items.sku', 'item_variants.stock', 'item_variants.color_id', 'item_variants.zise_id')
            ->where('item_variants.stock', '<=', 'item_variants.min_stock')
            ->orderBy('item_variants.stock')
            ->get();
        $lowStock = collect($lowStockItems)->merge($variantLowStock)->map(function($item) {
            return [
                'id' => $item->id,
                'name' => $item->name,
                'sku' => $item->sku ?? '',
                'stock' => $item->stock,
                'image' => $item->image?? null,
                'price' => $item->final_price ?? 0

            ];
        })->values();

        // Top productos por cantidad y por ingresos
        $topProducts = $this->getTopProducts();

        // Ventas por ubicación (departamento, provincia, distrito)
        $salesByLocation = $this->getSalesByLocation();

        // Tráfico y conversión
        $trafficStats = $this->getTrafficStats();
        $conversionStats = $this->getConversionStats();

        // Tráfico por fuente y redes sociales
        $trafficSources = $this->getTrafficSources();
        $socialMediaTraffic = $this->getSocialMediaTraffic();

        // Provincias top
        $topProvinces = $this->getTopProvinces();

        // Pedidos recientes
        $recentOrders = $this->getRecentSales();


        // KPIs requeridos: ventas hoy, ventas mes, pedidos hoy, pedidos mes
        $kpis = $this->getKpis();
        // También incluir los KPIs en el array 'metrics' para compatibilidad si algún frontend lo espera
        $metrics = $kpis;
        // Datos de ventas para gráfica de barras (últimos 30 días)
        $salesBarData = $this->getSalesBarData();

        // Usuarios
        $userStats = $this->getUserStats();

        return [
            'kpis' => $kpis,
            'metrics' => $metrics, // para compatibilidad, pero el frontend usará kpis
            'sales_bar_data' => $salesBarData,
            'ordersByStatus' => $ordersByStatus,
            'top_products' => $topProducts,
            'recent_orders' => $recentOrders,
            'low_stock' => $lowStock,
            'traffic_stats' => $trafficStats,
            'conversion_stats' => $conversionStats,
            'sales_by_location' => $salesByLocation,
            'user_stats' => $userStats,
            'top_provinces' => $topProvinces,
            'traffic_sources' => $trafficSources,
            'social_media_traffic' => $socialMediaTraffic,
        ];

    }

    // KPIs requeridos para el dashboard
    protected function getKpis()
    {
        $statusIds = $this->getCompletedStatusIds();
        $today = Carbon::now('America/Lima')->startOfDay();
        $monthStart = Carbon::now('America/Lima')->startOfMonth();

        // Ventas hoy
        $salesToday = Sale::whereIn('status_id', $statusIds)
            ->whereBetween('created_at', [$today, $today->copy()->endOfDay()])
            ->sum('total_amount');
        // Ventas mes
        $salesMonth = Sale::whereIn('status_id', $statusIds)
            ->whereBetween('created_at', [$monthStart, $monthStart->copy()->endOfMonth()])
            ->sum('total_amount');
        // Pedidos hoy
        $ordersToday = Sale::whereIn('status_id', $statusIds)
            ->whereBetween('created_at', [$today, $today->copy()->endOfDay()])
            ->count();
        // Pedidos mes
        $ordersMonth = Sale::whereIn('status_id', $statusIds)
            ->whereBetween('created_at', [$monthStart, $monthStart->copy()->endOfMonth()])
            ->count();

        return [
            'sales_today' => $salesToday,
            'sales_month' => $salesMonth,
            'orders_today' => $ordersToday,
            'orders_month' => $ordersMonth,
        ];
    }

    // Gráfica de barras: pedidos y montos por fecha (últimos 30 días)
    protected function getSalesBarData()
    {
        $statusIds = $this->getCompletedStatusIds();
        $start = Carbon::now('America/Lima')->subDays(29)->startOfDay();
        $end = Carbon::now('America/Lima')->endOfDay();
        $sales = Sale::whereIn('status_id', $statusIds)
            ->whereBetween('created_at', [$start, $end])
            ->selectRaw('DATE(created_at) as date, SUM(total_amount) as total_sales, COUNT(*) as order_count')
            ->groupBy('date')
            ->orderBy('date')
            ->get();
        // Rellenar días faltantes
        $dates = collect();
        for ($d = $start->copy(); $d->lte($end); $d->addDay()) {
            $dates->push($d->format('Y-m-d'));
        }
        $salesByDate = $sales->keyBy('date');
        $result = $dates->map(function($date) use ($salesByDate) {
            $row = $salesByDate->get($date);
            return [
                'date' => $date,
                'total_sales' => $row ? (float)$row->total_sales : 0,
                'order_count' => $row ? (int)$row->order_count : 0,
            ];
        })->values();
        return $result;
    }

    protected function getTopProvinces($limit = 5)
    {
        $statusIds = $this->getCompletedStatusIds();

        return Sale::whereIn('status_id', $statusIds)
            ->whereNotNull('province')
            ->select(
                'province',
                DB::raw('COUNT(*) as total_orders'),
                DB::raw('SUM(total_amount) as total_sales')
            )
            ->groupBy('province')
            ->orderByDesc('total_sales')
            ->take($limit)
            ->get()
            ->map(function ($item) {
                return [
                    'province' => $item->province,
                    'total_sales' => $item->total_sales,
                    'total_orders' => $item->total_orders
                ];
            });
    }

    protected function getTrafficSources()
    {
        return WebsiteStatistic::selectRaw('
            CASE 
                WHEN source LIKE "%instagram%" THEN "Instagram"
                WHEN source LIKE "%facebook%" THEN "Facebook"
                WHEN source LIKE "%tiktok%" THEN "TikTok"
                WHEN source LIKE "%google%" THEN "Google"
                WHEN source = "direct" THEN "Directo"
                ELSE "Otros"
            END as source_group,
            COUNT(*) as visits
        ')
        ->groupBy('source_group')
        ->get();
    }

    protected function getSocialMediaTraffic()
    {
        return WebsiteStatistic::selectRaw('
            source,
            COUNT(*) as visits,
            SUM(CASE WHEN device_type = "mobile" THEN 1 ELSE 0 END) as mobile_visits,
            SUM(CASE WHEN device_type = "desktop" THEN 1 ELSE 0 END) as desktop_visits
        ')
        ->whereIn('source', ['instagram', 'facebook', 'tiktok'])
        ->groupBy('source')
        ->orderByDesc('visits')
        ->get();
    }


    private function getCompletedStatusIds()
    {
        return Status::whereIn('name', $this->completedStatusNames)
            ->pluck('id')
            ->toArray();
    }

    protected function getMetrics()
    {
        $statusIds = $this->getCompletedStatusIds();
        // Usar la zona horaria local (America/Lima)
        $today = Carbon::now('America/Lima')->startOfDay();
        $yesterday = Carbon::now('America/Lima')->subDay()->startOfDay();
        $currentMonth = Carbon::now('America/Lima')->startOfMonth();

        // Ventas diarias
        $dailySales = Sale::whereIn('status_id', $statusIds)
            ->whereBetween('created_at', [$today, $today->copy()->endOfDay()])
            ->sum('total_amount');

        $prevDailySales = Sale::whereIn('status_id', $statusIds)
            ->whereBetween('created_at', [$yesterday, $yesterday->copy()->endOfDay()])
            ->sum('total_amount');

        // Pedidos mensuales
        $monthlySales = Sale::whereIn('status_id', $statusIds)
            ->whereBetween('created_at', [$currentMonth, $currentMonth->copy()->endOfMonth()])
            ->count();

        $prevMonthlySales = Sale::whereIn('status_id', $statusIds)
            ->whereBetween('created_at', [$currentMonth->copy()->subMonth(), $currentMonth->copy()->subMonth()->endOfMonth()])
            ->count();

        // Ticket promedio
        $averageSaleValue = Sale::whereIn('status_id', $statusIds)
            ->whereBetween('created_at', [$currentMonth, $currentMonth->copy()->endOfMonth()])
            ->avg('total_amount');

        $prevASV = Sale::whereIn('status_id', $statusIds)
            ->whereBetween('created_at', [$currentMonth->copy()->subMonth(), $currentMonth->copy()->subMonth()->endOfMonth()])
            ->avg('total_amount');

        // Nuevos clientes
        $newCustomers = Sale::whereIn('status_id', $statusIds)
            ->whereBetween('created_at', [$today, $today->copy()->endOfDay()])
            ->distinct('user_id')
            ->count('user_id');

        $prevNewCustomers = Sale::whereIn('status_id', $statusIds)
            ->whereBetween('created_at', [$yesterday, $yesterday->copy()->endOfDay()])
            ->distinct('user_id')
            ->count('user_id');

        return [
            'daily_sales' => $dailySales ?? 0,
            'daily_sales_trend' => $this->calculateTrend($dailySales, $prevDailySales),
            'monthly_orders' => $monthlySales,
            'monthly_orders_trend' => $this->calculateTrend($monthlySales, $prevMonthlySales),
            'average_order_value' => $averageSaleValue ?? 0,
            'aov_trend' => $this->calculateTrend($averageSaleValue, $prevASV),
            'new_customers' => $newCustomers,
            'new_customers_trend' => $this->calculateTrend($newCustomers, $prevNewCustomers),
            'total_users' => User::count(),
            'active_users' => User::where('created_at', '>=', Carbon::now('America/Lima')->subWeek())->count(), //last_login_at
        ];
    }

    protected function getSalesByLocation()
    {
        $statusIds = $this->getCompletedStatusIds();

        // Si no hay status completados, devolvemos array vacío
        if (empty($statusIds)) {
            return [];
        }

        // Obtener todas las ventas con ubicación, incluso si district es NULL
        $sales = Sale::whereIn('status_id', $statusIds)
            ->whereNotNull('department')
            ->whereNotNull('province')
            ->select([
                'department',
                'province',
                DB::raw('COALESCE(district, "Sin distrito") as district'),
                DB::raw('COUNT(*) as total_orders'),
                DB::raw('SUM(total_amount) as total_sales')
            ])
            ->groupBy('department', 'province', 'district')
            ->get();

        // Si no hay resultados, retornamos array vacío
        if ($sales->isEmpty()) {
            return [];
        }

        // Agrupamos jerárquicamente: department → province → district
        return $sales->groupBy('department')->map(function ($departments) {
            return [
                'total_orders' => $departments->sum('total_orders'),
                'total_sales' => $departments->sum('total_sales'),
                'provinces' => $departments->groupBy('province')->map(function ($provinces) {
                    return [
                        'total_orders' => $provinces->sum('total_orders'),
                        'total_sales' => $provinces->sum('total_sales'),
                        'districts' => $provinces->map(function ($district) {
                            return [
                                'district' => $district->district,
                                'total_orders' => $district->total_orders,
                                'total_sales' => $district->total_sales
                            ];
                        })->values(),
                    ];
                }),
            ];
        });
    }

    protected function getUserStats()
    {
        $today = Carbon::today();

        return [
            'total_users' => User::count(),
            'new_users_today' => User::whereDate('created_at', $today)->count(),
            'active_users' => User::where('created_at', '>=', $today->subWeek())->count(), //last_login_at
            'users_by_type' => User::select('status', DB::raw('COUNT(*) as count')) //type
                ->groupBy('status')
                ->get()
                ->mapWithKeys(fn($item) => [$item->status => $item->count]),
        ];
    }

    protected function getSalesData($range)
    {
        $statusIds = $this->getCompletedStatusIds();

        $query = Sale::whereIn('status_id', $statusIds)
        ->selectRaw('
            DATE(created_at) as date, 
            SUM(total_amount) as total_sales,
            COUNT(*) as order_count,
            AVG(total_amount) as average_order_value
        ')
        ->groupBy('date');
      

        switch ($range) {
            case 'day':
                $query->whereDate('created_at', Carbon::today());
                break;
            case 'week':
                $query->whereBetween('created_at', [
                    Carbon::now()->startOfWeek(),
                    Carbon::now()->endOfWeek()
                ]);
                break;
            case 'month':
                $query->whereMonth('created_at', Carbon::now()->month);
                break;
        }

        return $query->get()
        ->map(fn($item) => [
            'x' => $item->date,
            'sales' => $item->total_sales,
            'orders' => $item->order_count,
            'average' => $item->average_order_value
        ])
        ->toArray();
    }

    protected function getTopProducts($limit = 5)
    {
        $statusIds = $this->getCompletedStatusIds();

        return SaleDetail::with(['item' => fn($q) => $q->select('id', 'name', 'sku','image')])
            ->select([
                'item_id',
                DB::raw('SUM(quantity) as total_sold'),
                DB::raw('SUM(quantity * price) as total_revenue')
            ])
            ->whereHas('sale', fn($q) => $q->whereIn('status_id', $statusIds))
            ->groupBy('item_id')
            ->orderByDesc('total_sold')
            ->take($limit)
            ->get()
            ->map(function ($detail) {
                return [
                    'id' => $detail->item_id,
                    'name' => $detail->item->name ?? 'Producto eliminado',
                    'sku' => $detail->item->sku ?? 'N/A',
                    'image' => $detail->item->image?? null,
                    'total_sold' => $detail->total_sold,
                    'total_revenue' => $detail->total_revenue
                ];
            });
    }

    protected function getRecentSales($limit = 5)
    {
        $statusIds = $this->getCompletedStatusIds();

        return Sale::with(['status', 'user' => fn($q) => $q->select('id', 'name')])
            ->whereIn('status_id', $statusIds)
            ->latest()
            ->take($limit)
            ->get()
            ->map(fn($sale) => [
                'id' => $sale->id,
                'code' => $sale->code,
                'customer_name' => $sale->fullname ?? $sale->user->name ?? 'Cliente anónimo',
                'status' => [
                    'name' => $sale->status->name,
                    'color' => $sale->status->color ?? '#6c757d'
                ],
                'total' => $sale->total_amount,
                'date' => $sale->created_at->format('d/m/Y H:i')
            ]);
    }

    protected function getLowStockItems($threshold = 15)
    {
        return Item::where('stock', '<=', $threshold)
            ->orderBy('stock')
            ->get(['id', 'name', 'stock'])
            ->map(fn($item) => [
                'id' => $item->id,
                'name' => $item->name,
                'stock' => $item->stock
            ]);
    }

    protected function getTrafficStats()
    {
        return [
            'by_device' => WebsiteStatistic::selectRaw('
                device_type as device,
                COUNT(*) as visits,
                ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM website_statistics), 2) as percentage
            ')
                ->groupBy('device_type')
                ->get(),

            'by_source' => WebsiteStatistic::selectRaw('
                source,
                COUNT(*) as visits
            ')
                ->groupBy('source')
                ->get(),

            'by_os' => WebsiteStatistic::selectRaw('
                os,
                COUNT(*) as visits
            ')
                ->groupBy('os')
                ->orderByDesc('visits')
                ->limit(5)
                ->get(),

            'by_browser' => WebsiteStatistic::selectRaw('
                browser,
                COUNT(*) as visits
            ')
                ->groupBy('browser')
                ->orderByDesc('visits')
                ->limit(5)
                ->get(),
        ];
    }

    protected function getConversionStats()
    {
        return [
            'by_device' => WebsiteStatistic::selectRaw('
            COALESCE(ws.device, "Sin dispositivo") as device,
            COUNT(ws.id) as visits,
            COUNT(ss.sale_id) as conversions,
            ROUND(
                CASE WHEN COUNT(ws.id) > 0 THEN COUNT(ss.sale_id) * 100.0 / COUNT(ws.id)
                ELSE 0 END,
                2
            ) as conversion_rate
        ')
                ->from('website_statistics as ws')
                ->leftJoin('statistics_sales as ss', 'ws.id', '=', 'ss.website_statistic_id')
                ->groupBy(DB::raw('COALESCE(ws.device, "Sin dispositivo")'))
                ->get()
                ->map(function ($item) {
                    $item->visits = (int)$item->visits;
                    $item->conversions = (int)$item->conversions;
                    $item->conversion_rate = (float)$item->conversion_rate;
                    return $item;
                }),
        ];
    }

    private function calculateTrend($current, $previous)
    {
        if ($previous == 0) return $current > 0 ? 100 : 0;
        return round(($current - $previous) / $previous * 100, 2);
    }

        // Nuevo endpoint: ventas diarias por rango de fechas
    public function salesByDateRange(Request $request)
    {
        $statusIds = $this->getCompletedStatusIds();
        $start = $request->input('start_date');
        $end = $request->input('end_date');
        if (!$start || !$end) {
            return response()->json(['error' => 'Debe enviar start_date y end_date'], 400);
        }
        $startDate = Carbon::parse($start, 'America/Lima')->startOfDay();
        $endDate = Carbon::parse($end, 'America/Lima')->endOfDay();

        $sales = Sale::whereIn('status_id', $statusIds)
            ->whereBetween('created_at', [$startDate, $endDate])
            ->selectRaw('DATE(created_at) as date, SUM(total_amount) as total_sales, COUNT(*) as order_count')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Calcular monto acumulado diario
        $accum = 0;
        $result = $sales->map(function($item) use (&$accum) {
            $accum += $item->total_sales;
            return [
                'date' => $item->date,
                'total_sales' => (float)$item->total_sales,
                'order_count' => (int)$item->order_count,
                'accum_sales' => (float)$accum
            ];
        });

        return response()->json($result);
    }
}
