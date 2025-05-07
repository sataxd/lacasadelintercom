<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\Item;
use App\Models\Sale;
use App\Models\SaleDetail;
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

    private $completedStatusNames = ['Pagado', 'Enviado', 'Entregado'];

    public function setReactViewProperties(Request $request)
    {
        return [
            'metrics' => $this->getMetrics(),
            'sales_data' => [
                'day' => $this->getSalesData('day'),
                'week' => $this->getSalesData('week'),
                'month' => $this->getSalesData('month'),
            ],
            'top_products' => $this->getTopProducts(),
            'recent_orders' => $this->getRecentSales(),
            'low_stock' => $this->getLowStockItems(),
            'traffic_stats' => $this->getTrafficStats(),
            'conversion_stats' => $this->getConversionStats(),
            'sales_by_location' => $this->getSalesByLocation(),
            'user_stats' => $this->getUserStats(),
        ];
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
        $today = Carbon::today();
        $yesterday = Carbon::yesterday();
        $currentMonth = Carbon::now()->startOfMonth();

        // Ventas diarias
        $dailySales = Sale::whereIn('status_id', $statusIds)
            ->whereDate('created_at', $today)
            ->sum('total_amount');

        $prevDailySales = Sale::whereIn('status_id', $statusIds)
            ->whereDate('created_at', $yesterday)
            ->sum('total_amount');

        // Pedidos mensuales
        $monthlySales = Sale::whereIn('status_id', $statusIds)
            ->whereMonth('created_at', $currentMonth)
            ->count();

        $prevMonthlySales = Sale::whereIn('status_id', $statusIds)
            ->whereMonth('created_at', $currentMonth->copy()->subMonth())
            ->count();

        // Ticket promedio
        $averageSaleValue = Sale::whereIn('status_id', $statusIds)
            ->whereMonth('created_at', $currentMonth)
            ->avg('total_amount');

        $prevASV = Sale::whereIn('status_id', $statusIds)
            ->whereMonth('created_at', $currentMonth->copy()->subMonth())
            ->avg('total_amount');

        // Nuevos clientes
        $newCustomers = Sale::whereIn('status_id', $statusIds)
            ->whereDate('created_at', $today)
            ->distinct('user_id')
            ->count('user_id');

        $prevNewCustomers = Sale::whereIn('status_id', $statusIds)
            ->whereDate('created_at', $yesterday)
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
            'active_users' => User::where('created_at', '>=', $today->subWeek())->count(), //last_login_at
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
            ->selectRaw('DATE(created_at) as date, SUM(total_amount) as total')
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
            ->map(fn($item) => ['x' => $item->date, 'y' => $item->total])
            ->toArray();
    }

    protected function getTopProducts($limit = 5)
    {
        $statusIds = $this->getCompletedStatusIds();

        return SaleDetail::with(['item' => fn($q) => $q->select('id', 'name', 'sku')])
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
}
