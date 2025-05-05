import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import CreateReactScript from "../Utils/CreateReactScript";
import BaseAdminto from "../Components/Adminto/Base";
import Chart from "react-apexcharts";

const MetricCard = ({ title, value, trend, isCurrency = false }) => {
    const trendColor = trend >= 0 ? "success" : "danger";
    const trendIcon = trend >= 0 ? "▲" : "▼";

    return (
        <div className="card h-100">
            <div className="card-body">
                <h6 className="text-muted mb-3">{title}</h6>
                <div className="d-flex justify-content-between align-items-center">
                    <h2 className="mb-0">
                        {isCurrency
                            ? `S/ ${Number(value).toLocaleString()}`
                            : value}
                    </h2>
                    <span className={`badge bg-${trendColor}`}>
                        {trendIcon} {Math.abs(trend)}%
                    </span>
                </div>
            </div>
        </div>
    );
};

const SalesChart = ({ data }) => {
    const [timeRange, setTimeRange] = useState("week");

    const options = {
        chart: { type: "area", height: 350, zoom: { enabled: false } },
        dataLabels: { enabled: false },
        stroke: { curve: "smooth" },
        xaxis: { type: "datetime" },
        yaxis: { labels: { formatter: (val) => `S/ ${val.toLocaleString()}` } },
        tooltip: { x: { format: "dd MMM yyyy" } },
    };

    return (
        <div className="card h-100">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Tendencias de Ventas</h5>
                <select
                    className="form-select w-auto"
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                >
                    <option value="day">Últimas 24h</option>
                    <option value="week">Última semana</option>
                    <option value="month">Último mes</option>
                </select>
            </div>
            <div className="card-body">
                <Chart
                    options={options}
                    series={[{ name: "Ventas", data: data[timeRange] }]}
                    type="area"
                    height={350}
                />
            </div>
        </div>
    );
};

const TopProducts = ({ products }) => (
    <div className="card h-100">
        <div className="card-header">
            <h5 className="mb-0">Productos Más Vendidos</h5>
        </div>
        <div className="card-body p-0">
            <div className="list-group list-group-flush">
                {products.map((product, index) => (
                    <div
                        key={product.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        <div className="d-flex align-items-center">
                            <span className="badge bg-primary me-2">
                                {index + 1}
                            </span>
                            <div>
                                <h6 className="mb-0">{product.name}</h6>
                                <small className="text-muted">
                                    SKU: {product.sku}
                                </small>
                            </div>
                        </div>
                        <div className="text-end">
                            <div className="fw-bold">
                                {product.total_sold} unidades
                            </div>
                            <small className="text-success">
                                S/{" "}
                                {Number(
                                    product.total_revenue.toLocaleString()
                                ).toFixed(2)}
                            </small>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const RecentOrders = ({ orders }) => (
    <div className="card h-100">
        <div className="card-header">
            <h5 className="mb-0">Ventas Recientes</h5>
        </div>
        <div className="card-body p-0">
            <div className="table-responsive">
                <table className="table table-hover mb-0">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Cliente</th>
                            <th>Estado</th>
                            <th>Total</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>#{order.code}</td>
                                <td>{order.customer_name}</td>
                                <td>
                                    <span
                                        className="badge"
                                        style={{
                                            backgroundColor: order.status.color,
                                        }}
                                    >
                                        {order.status.name}
                                    </span>
                                </td>
                                <td>S/ {order.total.toLocaleString()}</td>
                                <td>{order.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

const Home = ({ session, ...props }) => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/admin/home-data");
                const data = await response.json();
                setDashboardData(data);
            } catch (err) {
                setError("Error cargando datos del dashboard");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 300000); // Actualizar cada 5 min
        return () => clearInterval(interval);
    }, []);

    if (loading) return <p>Cargando...</p>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container-fluid">
            {/* Sección de Bienvenida */}
            <div className="row mb-4">
                <div className="col">
                    <h1 className="h3">
                        Bienvenido, {session.name} {session.lastname}
                    </h1>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4 mb-4">
                <div className="col">
                    <MetricCard
                        title="Ventas Hoy"
                        value={dashboardData.metrics.daily_sales}
                        trend={dashboardData.metrics.daily_sales_trend}
                        isCurrency
                    />
                </div>
                <div className="col">
                    <MetricCard
                        title="Pedidos Mes"
                        value={dashboardData.metrics.monthly_orders}
                        trend={dashboardData.metrics.monthly_orders_trend}
                    />
                </div>
                {/*
                <div className="col">
                    <MetricCard
                        title="Ticket Promedio"
                        value={dashboardData.metrics.average_order_value}
                        trend={dashboardData.metrics.aov_trend}
                        isCurrency
                    />
                </div>
              */}
                <div className="col">
                    <MetricCard
                        title="Clientes Nuevos"
                        value={dashboardData.metrics.new_customers}
                        trend={dashboardData.metrics.new_customers_trend}
                    />
                </div>
            </div>

            {/* Gráficos Principales */}
            <div className="row g-4 mb-4">
                <div className="col-12 col-lg-8">
                    <SalesChart data={dashboardData.sales_data} />
                </div>
                <div className="col-12 col-lg-4">
                    <TopProducts products={dashboardData.top_products} />
                </div>
            </div>

            {/* Sección Inferior */}
            <div className="row g-4">
                <div className="col-12 col-lg-6">
                    <RecentOrders orders={dashboardData.recent_orders} />
                </div>
                <div className="col-12 col-lg-6">
                    <div className="card h-100">
                        <div className="card-header">
                            <h5 className="mb-0">Inventario Bajo</h5>
                        </div>
                        <div className="card-body">
                            <div className="list-group">
                                {dashboardData.low_stock.map((product) => (
                                    <div
                                        key={product.id}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                        <div>{product.name}</div>
                                        <span
                                            className={`badge bg-${
                                                product.stock <= 5
                                                    ? "danger"
                                                    : "warning"
                                            }`}
                                        >
                                            Stock: {product.stock}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <BaseAdminto {...properties} title="Dashboard">
            <Home {...properties} />
        </BaseAdminto>
    );
});
