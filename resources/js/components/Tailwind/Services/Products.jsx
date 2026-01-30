import React, { useState, useEffect } from 'react';
import ProductInfiniteSlider from '../Products/ProductInfiniteSlider';


const productItems = [
  {
    id: "prod_001",
    slug: "intercomunicador-premium-hd",
    name: "Portero Digital Premium HD",
    summary: "Sistema de intercomunicación Full HD con reconocimiento facial",
    price: 2899.90,
    final_price: 2499.90,
    discount: 400.00,
    image: "intercomunicador-premium.jpg",
    colors: [
      {
        name: "Negro mate",
        code: "#1a1a1a",
        image: "intercomunicador-negro.jpg"
      },
      {
        name: "Plateado",
        code: "#c0c0c0",
        image: "intercomunicador-plateado.jpg"
      }
    ]
  },
  {
    id: "prod_002",
    slug: "cerco-electrico-industrial",
    name: "Cerco Eléctrico Industrial",
    summary: "Sistema de seguridad perimetral de alta tensión para industrias",
    price: 12500.00,
    final_price: 11250.00,
    discount: 1250.00,
    image: "cerco-electrico-industrial.jpg",
    colors: [
      {
        name: "Verde industrial",
        code: "#2e7d32",
        image: "cerco-verde.jpg"
      }
    ]
  },
  {
    id: "prod_003",
    slug: "control-acceso-biometrico",
    name: "Control de Acceso Biométrico",
    summary: "Terminal biométrico con huella, rostro y tarjeta RFID",
    price: 1899.00,
    final_price: 1599.00,
    discount: 300.00,
    image: "control-biometrico.jpg",
    colors: [
      {
        name: "Blanco",
        code: "#ffffff",
        image: "control-blanco.jpg"
      },
      {
        name: "Negro",
        code: "#000000",
        image: "control-negro.jpg"
      },
      {
        name: "Gris",
        code: "#616161",
        image: "control-gris.jpg"
      }
    ]
  },
  {
    id: "prod_004",
    slug: "camara-ptz-4k",
    name: "Cámara PTZ 4K",
    summary: "Cámara robótica 4K con zoom óptico 20x y visión nocturna",
    price: 3499.00,
    final_price: 2999.00,
    discount: 500.00,
    image: "camara-ptz-4k.jpg",
    colors: [
      {
        name: "Blanco",
        code: "#ffffff",
        image: "camara-blanco.jpg"
      }
    ]
  },
  {
    id: "prod_005",
    slug: "alarma-residencial-smart",
    name: "Alarma Residencial Smart",
    summary: "Sistema de alarma inteligente con control por app móvil",
    price: 1599.00,
    final_price: 1399.00,
    discount: 200.00,
    image: "alarma-smart.jpg",
    colors: [
      {
        name: "Blanco",
        code: "#ffffff",
        image: "alarma-blanco.jpg"
      },
      {
        name: "Negro",
        code: "#000000",
        image: "alarma-negro.jpg"
      }
    ]
  },
  {
    id: "prod_006",
    slug: "nvr-32-canales",
    name: "NVR 32 Canales",
    summary: "Grabador de video en red con procesamiento inteligente",
    price: 4299.00,
    final_price: 3899.00,
    discount: 400.00,
    image: "nvr-32canales.jpg",
    colors: [
      {
        name: "Negro",
        code: "#000000",
        image: "nvr-negro.jpg"
      }
    ]
  },
  {
    id: "prod_007",
    slug: "sensor-movimiento-exterior",
    name: "Sensor de Movimiento Exterior",
    summary: "Detector PIR con protección IP67 y alcance de 20 metros",
    price: 299.00,
    final_price: 249.00,
    discount: 50.00,
    image: "sensor-movimiento.jpg",
    colors: [
      {
        name: "Blanco",
        code: "#ffffff",
        image: "sensor-blanco.jpg"
      }
    ]
  },
  {
    id: "prod_008",
    slug: "central-monitoreo-profesional",
    name: "Central de Monitoreo Profesional",
    summary: "Software de monitoreo con análisis de video inteligente",
    price: 8999.00,
    final_price: 7999.00,
    discount: 1000.00,
    image: "central-monitoreo.jpg",
    colors: null // Sin variantes de color
  },
  {
    id: "prod_009",
    slug: "sirena-exterior-120db",
    name: "Sirena Exterior 120dB",
    summary: "Sirena de alta potencia con luz estroboscópica integrada",
    price: 599.00,
    final_price: 499.00,
    discount: 100.00,
    image: "sirena-exterior.jpg",
    colors: [
      {
        name: "Rojo",
        code: "#d32f2f",
        image: "sirena-roja.jpg"
      },
      {
        name: "Blanco",
        code: "#ffffff",
        image: "sirena-blanca.jpg"
      }
    ]
  },
  {
    id: "prod_010",
    slug: "kit-vigilancia-completo",
    name: "Kit de Vigilancia Completo",
    summary: "Kit todo en uno con 4 cámaras, NVR y accesorios",
    price: 5499.00,
    final_price: 4799.00,
    discount: 700.00,
    image: "kit-vigilancia.jpg",
    colors: null // Sin variantes de color
  }
];


const Products = ({ textoshome }) => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  
  const handleImageError = (e) => {
    e.currentTarget.src = '/images/imagen/noimagen.jpg';
    e.currentTarget.onerror = null; 
  };

  // Definir las categorías y subcategorías
  const categories = [
    { 
      id: 'todos', 
      label: 'Todos',
      hasSubcategories: false
    },
    { 
      id: 'edificios-grandes', 
      label: 'Edificios Grandes',
      hasSubcategories: true,
      subcategories: [
        { id: 'linea-premium', label: 'Línea Premium' },
        { id: 'linea-intercambiable', label: 'Línea Intercambiable' }
      ]
    },
    { 
      id: 'edificios-medianos-pequenos', 
      label: 'Edificios Medianos y Pequeños',
      hasSubcategories: false
    }
  ];

  // Efecto para seleccionar automáticamente la primera subcategoría
  // cuando se selecciona una categoría que tiene subcategorías
  useEffect(() => {
    const currentCategory = categories.find(cat => cat.id === selectedCategory);
    
    if (currentCategory && currentCategory.hasSubcategories && currentCategory.subcategories.length > 0) {
      // Si la categoría tiene subcategorías, seleccionar la primera
      setSelectedSubCategory(currentCategory.subcategories[0].id);
    } else {
      // Si no tiene subcategorías, limpiar la selección de subcategoría
      setSelectedSubCategory(null);
    }
  }, [selectedCategory]);

  // Manejar selección de categoría
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // Manejar selección de subcategoría
  const handleSubCategorySelect = (subCategoryId) => {
    setSelectedSubCategory(subCategoryId);
  };

  // Obtener la categoría actual seleccionada
  const getCurrentCategory = () => {
    return categories.find(cat => cat.id === selectedCategory);
  };

  const benefits = [
    {
      id: "uid_1",
      title: "Reparaciones",
      subtitle: "Diagnóstico de Precisión",
      description: "Restauramos la operatividad de sus equipos con repuestos originales y protocolos técnicos avanzados.",
      image: "/assets/img/crecimiento.png"
    },
    {
      id: "uid_2",
      title: "Mantenimiento",
      subtitle: "Rendimiento Continuo",
      description: "Programas preventivos diseñados para mitigar riesgos operativos y extender la vida útil de su infraestructura.",
      image: "/assets/img/crecimiento.png"
    },
    {
      id: "uid_3",
      title: "Instalaciones",
      subtitle: "Ingeniería en Seguridad",
      description: "Despliegue estratégico de sistemas de intercomunicación y cercos eléctricos bajo normativas internacionales.",
      image: "/assets/img/crecimiento.png"
    },
  ];

  return (
    <section className='mx-[5%] 4xl:mx-[8%] rounded-3xl overflow-hidden'>
      <div className="flex flex-col relative w-full py-5"
        style={{
          backgroundImage: "url('/assets/img/fondoproductosf.webp')",
          backgroundSize: 'cover',   
          backgroundPosition: 'right',
          backgroundRepeat: 'no-repeat' 
        }}>
        
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-5 lg:gap-10">
          
          {/* Columna Izquierda: Logo y Filtro */}
          <div className="col-span-1 xl:col-span-1 flex flex-col gap-5 sm:gap-10 justify-start items-start p-5">
            <div>
              <img
                src="/assets/img/itower_logo.png"
                alt="Itower"
                className="h-[43px] 2xl:h-[60px] 4xl:h-[75px] object-cover"
              />
            </div>

            <div className='flex flex-col gap-0 w-full max-w-sm'>
              {categories.map((category) => (
                <div key={category.id} className="space-y-1">
                  {/* Categoría principal */}
                  <label className={`
                    flex items-center gap-3 rounded-lg cursor-pointer transition-colors p-2
                    ${selectedCategory === category.id ? 'bg-gray-200' : 'hover:bg-gray-200'}
                  `}>
                    <input 
                      type="radio" 
                      name="category"
                      className="form-radio rounded border-black text-black focus:ring-0 focus:ring-offset-0"
                      checked={selectedCategory === category.id}
                      onChange={() => handleCategorySelect(category.id)}
                    />
                    <span className="text-black font-medium text-sm 4xl:text-lg font-sora">
                      {category.label}
                    </span>
                  </label>
                  
                  {/* Subcategorías (solo si la categoría está seleccionada y tiene subcategorías) */}
                  {category.hasSubcategories && selectedCategory === category.id && (
                    <div className="ml-6">
                      {category.subcategories.map((subCat) => (
                        <label 
                          key={subCat.id}
                          className={`
                            flex items-center gap-3 px-3 rounded-lg cursor-pointer transition-colors p-2
                            ${selectedSubCategory === subCat.id ? 'bg-gray-200' : 'hover:bg-gray-200'}
                          `}
                        >
                          <input 
                            type="radio" 
                            name={`subcategory-${category.id}`}
                            className="form-radio rounded border-black text-black focus:ring-0 focus:ring-offset-0"
                            checked={selectedSubCategory === subCat.id}
                            onChange={() => handleSubCategorySelect(subCat.id)}
                          />
                          <span className="text-black font-medium text-sm 4xl:text-base font-sora">
                            {subCat.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Columna Derecha: Texto y Productos */}
          <div className="col-span-1 xl:col-span-3 flex flex-col gap-5 4xl:gap-8 justify-start items-start p-5">
            
            <div className="flex flex-col justify-start items-start gap-2">
              <h2 className="font-sora text-black text-2xl sm:text-3xl 2xl:text-4xl 4xl:text-5xl font-semibold tracking-tight !leading-tight">
                {getCurrentCategory()?.label || 'Seleccione una categoría'}
              </h2>
              <h2 className="font-dmsans text-black text-base 2xl:text-lg 4xl:text-xl tracking-normal font-light">
                Restauramos la operatividad de sus equipos con repuestos originales y protocolos técnicos avanzados, originales y protocolos técnicos avanzados, originales y protocolos técnicos avanzados, originales y protocolos técnicos avanzados
              </h2>
            </div>

            <div className='w-full'>
             <ProductInfiniteSlider items={productItems}/> 
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;