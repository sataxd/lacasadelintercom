import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import CreateReactScript from "../Utils/CreateReactScript";
import BaseAdminto from "../Components/Adminto/Base";
import Chart from "react-apexcharts";

const Home = ({ session, ...props }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Mismo useEffect original sin cambios
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

  // Componente MetricCard rediseñado
  const MetricCard = ({ title, value, trend, icon, isCurrency = false, secondaryText }) => (
    <div className="col-xl-3 col-md-6">
      <div className="card">
        <div className="card-body widget-user">
          <div className="d-flex align-items-center">
            <div className="flex-shrink-0 avatar-lg me-3">
              <span className="avatar-title rounded-circle bg-soft-primary">
                <i className={`${icon} font-22 text-primary`}></i>
              </span>
            </div>
            <div className="flex-grow-1 overflow-hidden">
              <h5 className="mb-1">
                {isCurrency ? `S/ ${Number(value).toLocaleString()}` : value}
              </h5>
              <p className="text-muted mb-0 text-truncate">{title}</p>
              {trend && (
                <div className="text-muted font-13">
                  <i className={`fas fa-arrow-${trend >= 0 ? 'up text-success' : 'down text-danger'} me-1`}></i>
                  <span>{Math.abs(trend)}% vs período anterior</span>
                </div>
              )}
              {secondaryText && <small className="text-muted">{secondaryText}</small>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // SalesChart original adaptado al nuevo diseño
  const SalesChart = ({ data }) => {
    const [timeRange, setTimeRange] = useState("week");
    
    const options = {
      chart: {
        type: "area",
        height: 350,
        zoom: { enabled: false },
        toolbar: { show: false }
      },
      colors: ['#727cf5'],
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 2 },
      xaxis: { type: "datetime", labels: { format: "dd MMM" } },
      yaxis: { labels: { formatter: (val) => `S/ ${val.toLocaleString()}` } },
      tooltip: { x: { format: "dd MMM yyyy" } },
      grid: { borderColor: '#f1f3f5' }
    };

    return (
      <div className="col-xl-7">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">Tendencias de Ventas</h5>
            <select 
              className="form-select w-auto" 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="day">24H</option>
              <option value="week">Semana</option>
              <option value="month">Mes</option>
            </select>
          </div>
          <div className="card-body">
            <Chart
              options={options}
              series={[{ 
                name: "Ventas",
                data: (data?.[timeRange] || []).map(item => ({
                  x: new Date(item.x),
                  y: item.y
                }))
              }]}
              type="area"
              height={350}
            />
          </div>
        </div>
      </div>
    );
  };

  // TopProducts con diseño mejorado
  const TopProducts = ({ products }) => (
    <div className="col-xl-5">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Productos Más Vendidos</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-centered table-hover mb-0">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Ventas</th>
                  <th>Ingresos</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                        <img
                                    src={`/api/items/media/${product.image}`}
                                    style={{
                                        width: "60px",
                                        height: "38px",
                                        objectFit: "cover",
                                        objectPosition: "center",
                                        borderRadius: "4px",
                                    }}
                                    onError={(e) =>
                                        (e.target.src =
                                            "/api/cover/thumbnail/null")
                                    }
                                />
                        </div>
                        <div className="flex-grow-1 ms-2">
                          <h5 className="font-14 my-1">{product.name}</h5>
                          <span className="text-muted">{product.sku}</span>
                        </div>
                      </div>
                    </td>
                    <td>{product.total_sold}</td>
                    <td className="text-success">
                      S/ {Number(product.total_revenue).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );


  const TopProvincesChart = ({ data }) => {
    const options = {
      chart: {
        type: 'bar',
        height: 350,
        toolbar: { show: false }
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: data?.map(item => item.province) || [],
        title: { text: 'Monto Total (S/)' }
      },
      yaxis: { title: { text: 'Provincias' } },
      colors: ['#727cf5']
    };

    const series = [{
      name: 'Ventas',
      data: data?.map(item => item.total_sales) || []
    }];

    return (
      <div className="col-xl-6">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">Top Provincias por Ventas</h5>
          </div>
          <div className="card-body">
            <Chart
              options={options}
              series={series}
              type="bar"
              height={350}
            />
          </div>
        </div>
      </div>
    );
  };

  // Nuevo componente: Fuentes de Tráfico
  const TrafficSourcesChart = ({ data }) => {
    const options = {
      chart: { type: 'donut' },
      labels: data?.map(item => item.source_group) || [],
      colors: ['#727cf5', '#0acf97', '#fa5c7c', '#ffbc00', '#5b69bc'],
      legend: { position: 'bottom' },
      responsive: [{
        breakpoint: 480,
        options: { chart: { width: 200 } }
      }]
    };

    const series = data?.map(item => item.visits) || [];

    return (
      <div className="col-xl-6">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">Fuentes de Tráfico</h5>
          </div>
          <div className="card-body">
            <Chart
              options={options}
              series={series}
              type="donut"
              height={300}
            />
          </div>
        </div>
      </div>
    );
  };

  // Nuevo componente: Tráfico de Redes Sociales
  const SocialMediaTrafficChart = ({ data }) => {
    // Preparar datos para el gráfico
    const categories = data?.map(item => {
      const socialName = item.source.charAt(0).toUpperCase() + item.source.slice(1);
      return `${socialName} (${item.visits})`;
    }) || [];
  
    const series = [
      {
        name: 'Móviles',
        data: data?.map(item => item.mobile_visits) || [],
        color: '#727cf5' // Azul principal
      },
      {
        name: 'Escritorio',
        data: data?.map(item => item.desktop_visits) || [],
        color: '#0acf97' // Verde
      }
    ];
  
    const options = {
      chart: {
        type: 'bar',
        height: 350,
        stacked: false,
        toolbar: { show: false }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 4,
        },
      },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 2, colors: ['transparent'] },
      xaxis: {
        categories: categories,
        labels: {
          style: { fontSize: '12px' }
        }
      },
      yaxis: { title: { text: 'Visitas' } },
      fill: { opacity: 0.9 },
      tooltip: {
        y: {
          formatter: (val) => `${val} visitas`,
          title: {
            formatter: (seriesName) => `${seriesName}:`
          }
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center'
      },
      responsive: [{
        breakpoint: 600,
        options: {
          chart: { height: 400 },
          plotOptions: { bar: { columnWidth: '70%' } }
        }
      }]
    };
  
    return (
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">
              <i className="fas fa-hashtag me-2 text-primary"></i>
              Tráfico de Redes Sociales
            </h5>
          </div>
          <div className="card-body">
            <Chart
              options={options}
              series={series}
              type="bar"
              height={350}
            />
            
            {/* Leyenda adicional con porcentajes */}
            <div className="row mt-3 text-center">
              {data?.map((item, index) => (
                <div key={index} className="col-md-4 mb-2">
                  <div className="d-flex align-items-center justify-content-center">
                    <i className={`fab fa-${item.source} me-2 fs-5`} 
                       style={{ color: index === 0 ? '#727cf5' : index === 1 ? '#0acf97' : '#fa5c7c' }}></i>
                    <div>
                      <div className="small text-muted">Total Visitas</div>
                      <div className="h5 mb-0">{item.visits}</div>
                      <div className="small">
                        <span className="text-primary">{item.mobile_visits} móviles</span> / {' '}
                        <span className="text-success">{item.desktop_visits} escritorio</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <div className="spinner-border text-primary m-5"></div>;
  if (error) return <div className="alert alert-danger m-4">{error}</div>;

  return (
    <>
      <div className="row mb-4">
        <div className="col">
          <h1 className="h3 mb-1">
            Bienvenido, {session.name} {session.lastname}
          </h1>
          <p className="text-muted">Resumen general de tu tienda</p>
        </div>
      </div>

      {/* Métricas usando TUS datos originales */}
      <div className="row">
        <MetricCard
          title="Ventas Hoy"
          value={dashboardData.metrics.daily_sales}
          trend={dashboardData.metrics.daily_sales_trend}
          icon="fas fa-shopping-cart"
          isCurrency
          secondaryText={`${dashboardData.metrics.monthly_orders} pedidos este mes`}
        />
        
        <MetricCard
          title="Pedidos Mes"
          value={dashboardData.metrics.monthly_orders}
          trend={dashboardData.metrics.monthly_orders_trend}
          icon="fas fa-clipboard-list"
          secondaryText={`${dashboardData.metrics.average_order_value} ticket promedio`}
        />
        
        <MetricCard
          title="Clientes Nuevos"
          value={dashboardData.metrics.new_customers}
          trend={dashboardData.metrics.new_customers_trend}
          icon="fas fa-user-plus"
          secondaryText={`${dashboardData.metrics.total_users} clientes totales`}
        />
        
        <MetricCard
          title="Ticket Promedio"
          value={dashboardData.metrics.average_order_value}
          trend={dashboardData.metrics.aov_trend}
          icon="fas fa-chart-line"
          isCurrency
          secondaryText="Valor promedio por transacción"
        />
      </div>

      <div className="row">
        <SalesChart data={dashboardData.sales_data} />
        <TopProducts products={dashboardData.top_products} />
      </div>
 {/* Sección de Gráficos Principales */}


      {/* Nuevos Gráficos Agregados */}
      <div className="row mt-4">
        <TopProvincesChart data={dashboardData.top_provinces} />
        <TrafficSourcesChart data={dashboardData.traffic_sources} />
      </div>

      {/* Tabla de Redes Sociales */}
      <div className="row mt-4">
      <div className="col-xl-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Estado de Pedidos</h5>
            </div>
            <div className="card-body">
              <Chart 
                options={{
                  labels: dashboardData.ordersByStatus.map(s => s.name),
                  colors: dashboardData.ordersByStatus.map(s => s.color),
                  legend: {
                    position: 'bottom'
                  }
                }}
                series={dashboardData.ordersByStatus.map(s => s.count)}
                type="donut"
                height={300}
              />
            </div>
          </div>
        </div>
        <div className="col-xl-6">
    <SocialMediaTrafficChart data={dashboardData.social_media_traffic} />
    </div>
      </div>

      


      {/* Sección de Ventas Recientes e Inventario */}
      <div className="row">
        <div className="col-xl-6">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Ventas Recientes</h5>
              <button className="btn btn-outline-primary btn-sm">Ver todo</button>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Cliente</th>
                      <th>Total</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.recent_orders?.map((order) => (
                      <tr key={order.id}>
                        <td>#{order.code}</td>
                        <td>{order.customer_name}</td>
                        <td>S/ {order.total}</td>
                        <td>
                          <span 
                            className="badge p-2" 
                            style={{ backgroundColor: order.status.color }}
                          >
                            {order.status.name}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-6">
          <div className="card border-danger">
            <div className="card-header bg-danger text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0"><i className="fas fa-exclamation-triangle me-2"></i>Inventario Bajo</h5>
              <span className="badge bg-light text-danger">{dashboardData.low_stock?.length}</span>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                {dashboardData.low_stock?.map((product) => (
                  <div key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-0">{product.name}</h6>
                      <small className="text-muted">SKU: {product.sku}</small>
                    </div>
                    <span className={`badge ${product.stock <= 5 ? 'bg-danger' : 'bg-warning'}`}>
                      {product.stock} unidades
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos adicionales conservando tu data original */}
      <div className="row">
        <div className="col-xl-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Tráfico por Dispositivo</h5>
            </div>
            <div className="card-body">
              <Chart
                options={{
                  labels: dashboardData.traffic_stats?.by_device?.map(d => d.device),
                  colors: ['#727cf5', '#0acf97', '#fa5c7c'],
                  legend: { position: 'bottom' }
                }}
                series={dashboardData.traffic_stats?.by_device?.map(d => d.visits)}
                type="donut"
                height={300}
              />
            </div>
          </div>
        </div>

        <div className="col-xl-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Conversión por Dispositivo</h5>
            </div>
            <div className="card-body">
              <Chart
                options={{
                  chart: { type: 'bar' },
                  xaxis: { 
                    categories: dashboardData.conversion_stats?.by_device?.map(d => d.device),
                  },
                  colors: ['#727cf5'],
                  plotOptions: { bar: { borderRadius: 4, columnWidth: '60%' } }
                }}
                series={[{
                  name: 'Tasa de Conversión',
                  data: dashboardData.conversion_stats?.by_device?.map(d => d.conversion_rate)
                }]}
                type="bar"
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

CreateReactScript((el, properties) => {
  createRoot(el).render(
    <BaseAdminto {...properties} title="Dashboard - Admin">
      <Home {...properties} />
    </BaseAdminto>
  );
});