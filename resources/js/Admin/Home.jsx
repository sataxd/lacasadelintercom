import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import CreateReactScript from "../Utils/CreateReactScript";
import BaseAdminto from "../Components/Adminto/Base";
import Chart from "react-apexcharts";
import L from "leaflet";
// Lucide Icons
import {
    DollarSign,
    ShoppingCart,
    TrendingUp,
    TrendingDown,
    Activity,
    Users,
    Package,
    AlertCircle,
    Globe,
    MapPin,
    Loader2,
} from "lucide-react";
// Estilos Leaflet
import "leaflet/dist/leaflet.css";

// --- COMPONENTES ---

// Componente de carga
const LoadingSkeleton = () => (
    <div className="container-fluid py-4">
        <div className="row g-4">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="col-md-3">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <div className="placeholder-glow">
                                <span
                                    className="placeholder col-6 bg-secondary mb-2"
                                    style={{ height: "20px" }}
                                ></span>
                                <h5 className="card-title placeholder-glow">
                                    <span
                                        className="placeholder col-8 bg-secondary"
                                        style={{ height: "30px" }}
                                    ></span>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// Mensaje para datos vacíos
const NoDataMessage = ({
    icon: Icon = AlertCircle,
    message = "No hay datos disponibles",
}) => (
    <div className="col-12">
        <div className="card shadow-sm">
            <div className="card-body text-center py-5">
                <Icon className="text-muted mb-3" size={48} />
                <h5>{message}</h5>
            </div>
        </div>
    </div>
);

// Tarjetas KPI
const MetricCard = ({ title, value, trend, isCurrency = false }) => {
    const trendColor = trend >= 0 ? "text-success" : "text-danger";
    const TrendIcon = trend >= 0 ? TrendingUp : TrendingDown;
    const getIcon = () => {
        const iconProps = { className: "text-white", size: 32 };
        switch (title) {
            case "Ventas Hoy":
                return <DollarSign {...iconProps} />;
            case "Pedidos Mes":
                return <ShoppingCart {...iconProps} />;
            case "Clientes Nuevos":
                return <Users {...iconProps} />;
            case "Ticket Promedio":
                return <Activity {...iconProps} />;
            default:
                return <Package {...iconProps} />;
        }
    };
    return (
        <div className="col-md-6 col-xl-3">
            <div className="card h-100 shadow-sm border-0 transition-all hover-transform">
                <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <p className="text-muted mb-2">{title}</p>
                            <h4 className="mb-0 fw-bold">
                                {isCurrency
                                    ? `S/ ${Number(value).toLocaleString()}`
                                    : value}
                            </h4>
                        </div>
                        <div className="bg-primary rounded-circle p-3">
                            {getIcon()}
                        </div>
                    </div>
                    <span
                        className={`badge mt-2 d-inline-flex align-items-center ${trendColor}`}
                    >
                        <TrendIcon size={14} className="me-1" />
                        {Math.abs(trend)}%
                    </span>
                </div>
            </div>
        </div>
    );
};

// Gráfico de ventas
const SalesChart = ({ data }) => {
    const [timeRange, setTimeRange] = useState("week");
    const options = {
        chart: {
            type: "area",
            height: 350,
            zoom: { enabled: false },
            toolbar: { show: false },
        },
        dataLabels: { enabled: false },
        stroke: { curve: "smooth", width: 2 },
        xaxis: { type: "datetime", labels: { format: "dd MMM" } },
        yaxis: { labels: { formatter: (val) => `S/ ${val.toLocaleString()}` } },
        tooltip: { x: { format: "dd MMM yyyy" } },
        colors: ["#435ebe"],
        grid: { borderColor: "#f1f3f5" },
    };
    const series = [
        {
            name: "Ventas",
            data: (data?.[timeRange] || []).map((item) => ({
                x: new Date(item.x),
                y: item.y,
            })),
        },
    ];
    return (
        <div className="col-lg-8">
            <div className="card shadow-sm">
                <div className="card-header d-flex justify-content-between align-items-center bg-white border-bottom">
                    <h5 className="mb-0">📈 Tendencias de Ventas</h5>
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
                    {data ? (
                        <Chart
                            options={options}
                            series={series}
                            type="area"
                            height={350}
                        />
                    ) : (
                        <div
                            className="d-flex justify-content-center align-items-center"
                            style={{ height: "350px" }}
                        >
                            <Loader2
                                className="animate-spin text-muted"
                                size={40}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const SalesByDistrictTable = ({ sales_by_location }) => {
    if (!sales_by_location || Object.keys(sales_by_location).length === 0) {
        return <NoDataMessage message="No hay datos de ventas por ubicación" />;
    }

    const flattenData = () => {
        let data = [];
        Object.entries(sales_by_location).forEach(([department, deptData]) => {
            Object.entries(deptData.provinces).forEach(
                ([province, provData]) => {
                    provData.districts.forEach((district) => {
                        data.push({
                            department,
                            province,
                            district: district.district,
                            total_orders: district.total_orders,
                            total_sales: district.total_sales,
                        });
                    });
                }
            );
        });
        return data;
    };

    const flatData = flattenData();

    return (
        <div className="col-lg-12">
            <div className="card shadow-sm">
                <div className="card-header bg-white d-flex justify-content-between align-items-center border-bottom">
                    <h5 className="mb-0">📍 Ventas por Distrito</h5>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th>Departamento</th>
                                <th>Provincia</th>
                                <th>Distrito</th>
                                <th>Ventas</th>
                                <th>Monto Total (S/)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {flatData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.department}</td>
                                    <td>{item.province}</td>
                                    <td>{item.district}</td>
                                    <td>{item.total_orders}</td>
                                    <td>
                                        {Number(item.total_sales).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
// Productos más vendidos
const TopProducts = ({ products }) => {
    if (!products?.length)
        return <NoDataMessage message="No hay productos vendidos" />;
    return (
        <div className="col-lg-4">
            <div className="card shadow-sm h-100">
                <div className="card-header bg-white border-bottom">
                    <h5 className="mb-0">🏆 Productos Más Vendidos</h5>
                </div>
                <ul className="list-group list-group-flush">
                    {products.map((product, index) => (
                        <li
                            key={product.id}
                            className="list-group-item d-flex justify-content-between align-items-center py-3"
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
                                    {Number(product.total_revenue).toFixed(2)}
                                </small>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

// Ventas recientes
const RecentOrders = ({ orders }) => {
    if (!orders?.length)
        return <NoDataMessage message="No hay ventas recientes" />;
    return (
        <div className="col-lg-6">
            <div className="card shadow-sm h-100">
                <div className="card-header d-flex justify-content-between align-items-center bg-white border-bottom">
                    <h5 className="mb-0">🛍️ Ventas Recientes</h5>
                    <button className="btn btn-outline-primary btn-sm">
                        Ver más
                    </button>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
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
                                                backgroundColor:
                                                    order.status.color,
                                            }}
                                        >
                                            {order.status.name}
                                        </span>
                                    </td>
                                    <td>
                                        S/{" "}
                                        {Number(order.amount).toLocaleString()}
                                    </td>
                                    <td>{order.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// Inventario bajo
const LowStockAlert = ({ low_stock }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="col-lg-6">
            <div className="card shadow-sm border border-danger">
                <div className="card-header bg-danger text-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">⚠️ Inventario Bajo</h5>
                    <button
                        className="btn btn-light btn-sm"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? "Ocultar" : "Mostrar"}
                    </button>
                </div>
                {isOpen && (
                    <div className="card-body p-0">
                        <ul className="list-group list-group-flush">
                            {low_stock.map((product) => (
                                <li
                                    key={product.id}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    <span>{product.name}</span>
                                    <span
                                        className={`badge ${
                                            product.stock <= 5
                                                ? "bg-danger"
                                                : "bg-warning"
                                        } rounded-pill`}
                                    >
                                        Stock: {product.stock}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

// Mapa interactivo
const LocationMap = ({ sales_by_location }) => {
    const mapRef = React.useRef(null);
    const [mapReady, setMapReady] = useState(false);

    useEffect(() => {
        if (!sales_by_location || mapReady || !mapRef.current) return;

        // Inicializa el mapa
        const map = L.map(mapRef.current).setView([-12.0464, -77.0428], 6);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
            map
        );

        // Agrega marcadores basados en los datos
        Object.entries(sales_by_location).forEach(([dept, data]) => {
            Object.entries(data.provinces).forEach(([prov, pData]) => {
                pData.districts.forEach((district) => {
                    const lat = -12.0464 + Math.random(); // Puedes mejorar esto con coordenadas reales
                    const lng = -77.0428 + Math.random();
                    const marker = L.marker([lat, lng]).addTo(map);
                    marker.bindPopup(`
                        <strong>${district.district}</strong><br>
                        Total Ventas: S/ ${parseFloat(
                            district.total_sales
                        ).toLocaleString()}
                    `);
                });
            });
        });

        setMapReady(true);
        return () => map.remove();
    }, [sales_by_location]);

    if (!sales_by_location)
        return (
            <NoDataMessage icon={Globe} message="No hay datos de ubicaciones" />
        );

    return (
        <div className="col-lg-12">
            <div className="card shadow-sm">
                <div className="card-header bg-white border-bottom">
                    <h5 className="mb-0">🗺️ Ubicaciones de Ventas</h5>
                </div>
                <div className="card-body p-0" style={{ height: "500px" }}>
                    <div
                        ref={mapRef}
                        style={{ height: "100%", width: "100%" }}
                    />
                </div>
            </div>
        </div>
    );
};

// Gráfico de tráfico por dispositivo
const DeviceTrafficChart = ({ traffic }) => {
    if (!traffic?.by_device?.length)
        return (
            <NoDataMessage message="No hay datos de tráfico por dispositivo" />
        );

    const series = traffic?.by_device.map((item) => item.visits);
    const labels = traffic?.by_device.map(
        (item) => item?.device?.charAt(0).toUpperCase() + item?.device?.slice(1)
    );

    const options = {
        chart: { type: "donut" },
        labels,
        legend: { show: true, position: "bottom" },
        dataLabels: { enabled: true },
        colors: ["#435ebe", "#5b73e8", "#f1b521"],
        title: { text: "Tráfico por Dispositivo", align: "center" },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: { width: "100%" },
                    legend: { position: "bottom" },
                },
            },
        ],
    };

    return (
        <div className="col-lg-6">
            <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">📱 Tráfico por Dispositivo</h5>
                    <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                        <Chart options={options} series={series} type="donut" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Gráfico de tasa de conversión por dispositivo
const ConversionRateChart = ({ conversion }) => {
    if (
        !conversion?.by_device?.length ||
        conversion.by_device.every((d) => d.visits === 0)
    ) {
        return (
            <NoDataMessage message="No hay datos de conversión disponibles" />
        );
    }

    const series = [
        {
            name: "Conversión (%)",
            data: conversion.by_device.map((item) => item.conversion_rate),
        },
    ];

    const options = {
        chart: { type: "bar", height: 300 },
        xaxis: {
            categories: conversion.by_device.map((item) => item.device),
        },
        yaxis: {
            labels: { formatter: (val) => `${val}%` },
        },
        plotOptions: { bar: { borderRadius: 4, columnWidth: "60%" } },
        dataLabels: { enabled: false },
        colors: ["#435ebe"],
        title: { text: "Tasa de Conversión por Dispositivo", align: "center" },
    };

    return (
        <div className="col-lg-6">
            <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">📊 Tasa de Conversión</h5>
                    <div className="flex-grow-1">
                        <Chart
                            options={options}
                            series={series}
                            type="bar"
                            height={300}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
// Vista principal
const Home = ({ session, ...props }) => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/admin/home-data");
                const data = await response.json();
                setDashboardData(data);
            } catch (err) {
                setError("Error al cargar los datos del dashboard");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 300000);
        return () => clearInterval(interval);
    }, []);

    if (loading) return <LoadingSkeleton />;
    if (error) return <NoDataMessage icon={AlertCircle} message={error} />;

    return (
        <div className="container-fluid py-4">
            <div className="row mb-4">
                <div className="col">
                    <h1 className="h3 mb-0">
                        Bienvenido, {session.name} {session.lastname}
                    </h1>
                    <p className="text-muted">Resumen general de tu tienda</p>
                </div>
            </div>
            <div className="row g-4 mb-4">
                <MetricCard
                    title="Ventas Hoy"
                    value={dashboardData.metrics.daily_sales}
                    trend={dashboardData.metrics.daily_sales_trend}
                    isCurrency
                />
                <MetricCard
                    title="Pedidos Mes"
                    value={dashboardData.metrics.monthly_orders}
                    trend={dashboardData.metrics.monthly_orders_trend}
                />
                <MetricCard
                    title="Ticket Promedio"
                    value={dashboardData.metrics.average_order_value}
                    trend={dashboardData.metrics.aov_trend}
                    isCurrency
                />
                <MetricCard
                    title="Clientes Nuevos"
                    value={dashboardData.metrics.new_customers}
                    trend={dashboardData.metrics.new_customers_trend}
                />
                <MetricCard
                    title="Clientes Totales"
                    value={dashboardData.metrics.total_users}
                    trend={dashboardData.metrics.new_customers_trend}
                />
            </div>
            <div className="row g-4 mb-4">
                <SalesChart data={dashboardData.sales_data} />
                <TopProducts products={dashboardData.top_products} />
            </div>
            <div className="row g-4 mb-4">
                <SalesByDistrictTable
                    sales_by_location={dashboardData.sales_by_location}
                />
            </div>
            <div className="row g-4 mb-4">
                <DeviceTrafficChart traffic={dashboardData.traffic_stats} />
                <ConversionRateChart
                    conversion={dashboardData.conversion_stats}
                />
            </div>
            <div className="row g-4">
                <RecentOrders orders={dashboardData.recent_orders} />
                <LowStockAlert low_stock={dashboardData.low_stock} />
            </div>
        </div>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <BaseAdminto {...properties} title="Dashboard - Admin">
            <Home {...properties} />
        </BaseAdminto>
    );
});
