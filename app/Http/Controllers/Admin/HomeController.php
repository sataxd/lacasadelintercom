<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\Item;
use App\Models\Sale;
use App\Models\SaleDetail;
use App\Models\Status;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends BasicController
{
    public $reactView = 'Admin/Home';
    public $reactRootView = 'admin';

    // Nombres de estados considerados como ventas completadas
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
        ];
    }

    /**
     * Obtiene los IDs de los estados completados
     */
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

        $dailySalesTrend = $this->calculateTrend($dailySales, $prevDailySales);

        // Pedidos mensuales
        $monthlySales = Sale::whereIn('status_id', $statusIds)
            ->whereMonth('created_at', $currentMonth)
            ->count();

        $prevMonthlySales = Sale::whereIn('status_id', $statusIds)
            ->whereMonth('created_at', $currentMonth->copy()->subMonth())
            ->count();

        $monthlySalesTrend = $this->calculateTrend($monthlySales, $prevMonthlySales);

        // Ticket promedio
        $averageSaleValue = Sale::whereIn('status_id', $statusIds)
            ->whereMonth('created_at', $currentMonth)
            ->avg('total_amount');

        $prevASV = Sale::whereIn('status_id', $statusIds)
            ->whereMonth('created_at', $currentMonth->copy()->subMonth())
            ->avg('total_amount');

        $asvTrend = $this->calculateTrend($averageSaleValue, $prevASV);

        // Nuevos clientes
        $newCustomers = Sale::whereIn('status_id', $statusIds)
            ->whereDate('created_at', $today)
            ->distinct('user_id')
            ->count('user_id');

        $prevNewCustomers = Sale::whereIn('status_id', $statusIds)
            ->whereDate('created_at', $yesterday)
            ->distinct('user_id')
            ->count('user_id');

        $newCustomersTrend = $this->calculateTrend($newCustomers, $prevNewCustomers);

        return [
            'daily_sales' => $dailySales ?? 0,
            'daily_sales_trend' => $dailySalesTrend,
            'monthly_orders' => $monthlySales,
            'monthly_orders_trend' => $monthlySalesTrend,
            'average_order_value' => $averageSaleValue ?? 0,
            'aov_trend' => $asvTrend,
            'new_customers' => $newCustomers,
            'new_customers_trend' => $newCustomersTrend,
        ];
    }

    protected function getSalesData($range)
    {
        $statusIds = $this->getCompletedStatusIds();

        $query = Sale::whereIn('status_id', $statusIds)
            ->selectRaw('
                DATE(created_at) as date,
                SUM(total_amount) as total
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
                'y' => $item->total
            ])->toArray();
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

    private function calculateTrend($current, $previous)
    {
        if ($previous == 0) return $current > 0 ? 100 : 0;
        return round(($current - $previous) / $previous * 100, 2);
    }
}
