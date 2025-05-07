import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import CreateReactScript from "../Utils/CreateReactScript";
import BaseAdminto from "../Components/Adminto/Base";
import Chart from "react-apexcharts";

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
    BarChart3,
    MapPin,
} from "lucide-react";

// Importar estilos de Leaflet
import "leaflet/dist/leaflet.css";

// Tarjetas KPI
const MetricCard = ({ title, value, trend, isCurrency = false }) => {
    const trendColor = trend >= 0 ? "text-success" : "text-danger";
    const TrendIcon = trend >= 0 ? TrendingUp : TrendingDown;

    // Seleccionar icono según título
    const getIcon = () => {
        switch (title) {
            case "Ventas Hoy":
                return <DollarSign className="text-primary" size={32} />;
            case "Pedidos Mes":
                return <ShoppingCart className="text-primary" size={32} />;
            case "Clientes Nuevos":
                return <Users className="text-primary" size={32} />;
            case "Ticket Promedio":
                return <Activity className="text-primary" size={32} />;
            default:
                return <Package className="text-primary" size={32} />;
        }
    };

    return (
        <div className="col-md-6 col-xl-3">
            <div className="card h-100 shadow-sm border-0">
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
                        <div className="bg-light rounded p-2">{getIcon()}</div>
                    </div>
                    <span
                        className={`badge mt-2 d-inline-flex align-items-center ${trendColor}`}
                    >
                        <TrendIcon size={14} className="me-1" />{" "}
                        {Math.abs(trend)}%
                    </span>
                </div>
            </div>
        </div>
    );
};

// Gráfico de tendencias de ventas
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
        stroke: { curve: "smooth" },
        xaxis: {
            type: "datetime",
            labels: { format: "dd MMM" },
        },
        yaxis: {
            labels: { formatter: (val) => `S/ ${val.toLocaleString()}` },
        },
        tooltip: {
            x: { format: "dd MMM yyyy" },
        },
        colors: ["#435ebe"],
    };

    const series = [
        {
            name: "Ventas",
            data: data[timeRange].map((item) => ({
                x: new Date(item.x),
                y: item.y,
            })),
        },
    ];

    return (
        <div className="col-lg-8">
            <div className="card shadow-sm">
                <div className="card-header d-flex justify-content-between align-items-center">
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
                    <Chart
                        options={options}
                        series={series}
                        type="area"
                        height={350}
                    />
                </div>
            </div>
        </div>
    );
};

// Productos más vendidos
const TopProducts = ({ products }) => (
    <div className="col-lg-4">
        <div className="card shadow-sm h-100">
            <div className="card-header">
                <h5 className="mb-0">🏆 Productos Más Vendidos</h5>
            </div>
            <ul className="list-group list-group-flush">
                {products.map((product, index) => (
                    <li
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
                                S/ {Number(product.total_revenue).toFixed(2)}
                            </small>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

// Últimos pedidos
const RecentOrders = ({ orders }) => (
    <div className="col-lg-6">
        <div className="card shadow-sm h-100">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">🛍️ Ventas Recientes</h5>
                <button className="btn btn-outline-primary btn-sm">
                    Ver más
                </button>
            </div>
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
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
                                <td>
                                    S/ {Number(order.total).toLocaleString()}
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

// Tráfico web - Por dispositivo y fuente
const TrafficStats = ({ traffic_stats }) => (
    <div className="col-lg-6">
        <div className="card shadow-sm h-100">
            <div className="card-header">
                <h5 className="mb-0">🌐 Tráfico Web</h5>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-4">
                        <h6>Por dispositivo</h6>
                        <ul className="list-unstyled">
                            {traffic_stats.by_device.map((item, i) => (
                                <li key={i}>
                                    {item.device}: {item.visits} visitas
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h6>Por sistema operativo</h6>
                        <ul className="list-unstyled">
                            {traffic_stats.by_os.map((item, i) => (
                                <li key={i}>
                                    {item.os}: {item.visits} visitas
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h6>Por fuente</h6>
                        <ul className="list-unstyled">
                            {traffic_stats.by_source.map((item, i) => (
                                <li key={i}>
                                    {item.source}: {item.visits} visitas
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// Tasas de conversión
const ConversionRate = ({ conversion_stats }) => (
    <div className="col-lg-6">
        <div className="card shadow-sm h-100">
            <div className="card-header">
                <h5 className="mb-0">📊 Tasas de Conversión</h5>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                        <h6>Por dispositivo</h6>
                        <TableComponent
                            headers={[
                                "Dispositivo",
                                "Visitas",
                                "Conversión",
                                "Tasa",
                            ]}
                            rows={conversion_stats.by_device.map((item) => [
                                item.device,
                                item.visits,
                                item.conversions,
                                `${item.conversion_rate}%`,
                            ])}
                        />
                    </div>
                    <div className="col-md-6">
                        <h6>Por fuente</h6>
                        <TableComponent
                            headers={[
                                "Fuente",
                                "Visitas",
                                "Conversión",
                                "Tasa",
                            ]}
                            rows={conversion_stats.by_source.map((item) => [
                                item.source,
                                item.visits,
                                item.conversions,
                                `${item.conversion_rate}%`,
                            ])}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// Tabla reutilizable
const TableComponent = ({ headers, rows }) => (
    <table className="table table-sm table-borderless">
        <thead>
            <tr>
                {headers.map((h, i) => (
                    <th key={i}>{h}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {rows.map((r, i) => (
                <tr key={i}>
                    {r.map((cell, j) => (
                        <td key={j}>{cell}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
);

// Estadísticas de usuarios
const UserStats = ({ user_stats }) => (
    <div className="col-lg-6">
        <div className="card shadow-sm h-100">
            <div className="card-header">
                <h5 className="mb-0">👥 Estadísticas de Usuarios</h5>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                        <h6>Total de usuarios</h6>
                        <h4>{user_stats.total_users}</h4>
                    </div>
                    <div className="col-md-6">
                        <h6>Nuevos esta semana</h6>
                        <h4>{user_stats.new_users_today}</h4>
                    </div>
                    <div className="col-md-12 mt-3">
                        <h6>Usuarios por estado</h6>
                        <ul className="list-group">
                            {Object.entries(user_stats.users_by_type).map(
                                ([status, count]) => (
                                    <li
                                        key={status}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                        <span>{status}</span>
                                        <span className="badge bg-primary rounded-pill">
                                            {count}
                                        </span>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// Gráfico de barras por departamento
const SalesByLocationBarChart = ({ sales_by_location }) => {
    const departments = Object.keys(sales_by_location);
    const salesData = departments.map(
        (dept) => sales_by_location[dept].total_sales
    );

    const options = {
        chart: { type: "bar", height: 300 },
        plotOptions: { bar: { horizontal: false } },
        xaxis: { categories: departments },
        yaxis: { labels: { formatter: (val) => `S/ ${val.toLocaleString()}` } },
        tooltip: { y: { formatter: (val) => `S/ ${val.toLocaleString()}` } },
        colors: ["#435ebe"],
    };

    return (
        <div className="col-lg-12">
            <div className="card shadow-sm">
                <div className="card-header">
                    <h5 className="mb-0">📊 Ventas por Departamento</h5>
                </div>
                <div className="card-body">
                    <Chart
                        options={options}
                        series={[{ name: "Total Ventas", data: salesData }]}
                        type="bar"
                        height={300}
                    />
                </div>
            </div>
        </div>
    );
};

// Mapa interactivo con Leaflet

const LocationMap = ({ sales_by_location }) => {
    const mapRef = React.useRef(null);
    const mapInstanceRef = React.useRef(null);

    // Generar coordenadas ficticias cercanas a Lima
    const defaultCenter = [-12.0937, -77.0433]; // Lima, Perú
    const locations = [];

    for (const dept in sales_by_location) {
        const provinces = sales_by_location[dept].provinces;
        for (const prov in provinces) {
            for (const district of provinces[prov].districts) {
                locations.push({
                    name: district.district,
                    latlng: [
                        defaultCenter[0] + Math.random() * 0.5,
                        defaultCenter[1] + Math.random() * 0.5,
                    ],
                    sales: district.total_sales,
                });
            }
        }
    }

    React.useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current) return;

        // Crear el mapa manualmente
        const L = window.L;
        const map = L?.map(mapRef.current).setView(defaultCenter, 6);
        mapInstanceRef.current = map;

        // Agregar capa de OpenStreetMap
        L?.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> Contributors',
        }).addTo(map);

        // Agregar marcadores
        locations.forEach((loc, index) => {
            const marker = L.marker(loc.latlng).addTo(map);
            marker.bindPopup(
                `<strong>${loc.name}</strong><br>Ventas: S/ ${loc.sales.toFixed(
                    2
                )}`
            );
        });

        // Limpiar al desmontar
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [sales_by_location]);

    return (
        <div className="col-lg-12">
            <div className="card shadow-sm">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">🗺️ Ubicaciones de Ventas</h5>
                </div>
                <div
                    className="card-body"
                    style={{ height: "400px", position: "relative" }}
                >
                    <div
                        ref={mapRef}
                        style={{ width: "100%", height: "100%", zIndex: 1 }}
                    />
                </div>
            </div>
        </div>
    );
};

// Gráfico circular por provincia
const ProvincePieChart = ({ sales_by_location }) => {
    const provinces = [];
    const sales = [];

    for (const dept in sales_by_location) {
        const provs = sales_by_location[dept].provinces;
        for (const p in provs) {
            provinces.push(p);
            sales.push(provs[p].total_sales);
        }
    }

    const options = {
        chart: { type: "donut", height: 300 },
        labels: provinces.slice(0, 5),
        legend: { position: "bottom" },
    };

    return (
        <div className="col-md-6">
            <div className="card shadow-sm">
                <div className="card-header">
                    <h5 className="mb-0">🥧 Provincias con más ventas</h5>
                </div>
                <div className="card-body">
                    <Chart
                        options={options}
                        series={sales.slice(0, 5)}
                        type="donut"
                        height={300}
                    />
                </div>
            </div>
        </div>
    );
};

// Gráfico circular por distrito
const DistrictPieChart = ({ sales_by_location }) => {
    const districts = [];
    const sales = [];

    for (const dept in sales_by_location) {
        const provs = sales_by_location[dept].provinces;
        for (const p in provs) {
            for (const d of provs[p].districts) {
                districts.push(d.district);
                sales.push(d.total_sales);
            }
        }
    }

    const options = {
        chart: { type: "pie", height: 300 },
        labels: districts.slice(0, 5),
        legend: { position: "bottom" },
    };

    return (
        <div className="col-md-6">
            <div className="card shadow-sm">
                <div className="card-header">
                    <h5 className="mb-0">🥧 Distritos con más ventas</h5>
                </div>
                <div className="card-body">
                    <Chart
                        options={options}
                        series={sales.slice(0, 5)}
                        type="pie"
                        height={300}
                    />
                </div>
            </div>
        </div>
    );
};

// Diagrama de flujo jerárquico
const LocationFlowChart = ({ sales_by_location }) => {
    return (
        <div className="col-lg-12">
            <div className="card shadow-sm">
                <div className="card-header">
                    <h5 className="mb-0">
                        🧱 Flujo Jerárquico: Depto → Prov → Distrito
                    </h5>
                </div>
                <div className="card-body">
                    <div className="flow-diagram overflow-x-auto">
                        <div className="diagram-row d-flex flex-wrap">
                            {Object.entries(sales_by_location)
                                .slice(0, 3)
                                .map(([dept, data]) => (
                                    <div
                                        key={dept}
                                        className="diagram-node mx-3"
                                    >
                                        <div className="node dept">{dept}</div>
                                        <div className="subnodes">
                                            {Object.entries(data.provinces)
                                                .slice(0, 3)
                                                .map(([prov, p]) => (
                                                    <div
                                                        key={prov}
                                                        className="node province"
                                                    >
                                                        {prov}
                                                        <div className="subnodes">
                                                            {p.districts
                                                                .slice(0, 2)
                                                                .map((d, i) => (
                                                                    <div
                                                                        key={i}
                                                                        className="node district"
                                                                    >
                                                                        {
                                                                            d.district
                                                                        }
                                                                    </div>
                                                                ))}
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                <style jsx>{`
                    .flow-diagram {
                        padding: 20px;
                    }
                    .diagram-row {
                        gap: 20px;
                    }
                    .node {
                        background: #f8f9fa;
                        border: 1px solid #ccc;
                        padding: 10px;
                        text-align: center;
                        border-radius: 6px;
                        margin-bottom: 10px;
                        min-width: 100px;
                    }
                    .dept {
                        font-weight: bold;
                        background: #e9ecef;
                    }
                    .province {
                        background: #f1f3f5;
                    }
                    .district {
                        background: #f8f9fa;
                    }
                    .subnodes {
                        margin-top: 10px;
                    }
                `}</style>
            </div>
        </div>
    );
};

// Vista principal del Dashboard
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
                setError("Error al cargar los datos del dashboard.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 300000); // Cada 5 minutos
        return () => clearInterval(interval);
    }, []);

    if (loading) return <div className="text-center py-5">Cargando...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container-fluid py-4">
            {/* Bienvenida */}
            <div className="row mb-4">
                <div className="col">
                    <h1 className="h3">
                        Bienvenido, {session.name} {session.lastname}
                    </h1>
                </div>
            </div>

            {/* KPI Cards */}
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
            </div>

            {/* Gráfica + Top Products */}
            <div className="row g-4 mb-4">
                <SalesChart data={dashboardData.sales_data} />
                <TopProducts products={dashboardData.top_products} />
            </div>

            {/* Gráfico de barras - Departamentos */}
            <SalesByLocationBarChart
                sales_by_location={dashboardData.sales_by_location}
            />

            {/* Mapa interactivo */}
            <LocationMap sales_by_location={dashboardData.sales_by_location} />

            {/* Gráficos circulares */}
            <div className="row g-4 mb-4">
                <ProvincePieChart
                    sales_by_location={dashboardData.sales_by_location}
                />
                <DistrictPieChart
                    sales_by_location={dashboardData.sales_by_location}
                />
            </div>

            {/* Diagrama de flujo */}
            <LocationFlowChart
                sales_by_location={dashboardData.sales_by_location}
            />

            {/* Stats de usuarios + tráfico */}
            <div className="row g-4 mb-4">
                <UserStats user_stats={dashboardData.user_stats} />
                <TrafficStats traffic_stats={dashboardData.traffic_stats} />
            </div>

            {/* Conversión + Inventario */}
            <div className="row g-4 mb-4">
                <ConversionRate
                    conversion_stats={dashboardData.conversion_stats}
                />
                <LowStockAlert low_stock={dashboardData.low_stock} />
            </div>

            {/* Ventas recientes */}
            <div className="row g-4">
                <RecentOrders orders={dashboardData.recent_orders} />
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
