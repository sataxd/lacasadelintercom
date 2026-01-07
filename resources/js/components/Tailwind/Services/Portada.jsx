import React from 'react';

const Portada = ({ textoshome }) => {
  
  const handleImageError = (e) => {
    e.currentTarget.src = '/images/imagen/noimagen.jpg';
    e.currentTarget.onerror = null; 
  };

  const benefits = [
  {
    id: "uid_1", // El ID interno puede ser cualquiera
    title: "Reparaciones",
    subtitle: "Diagnóstico de Precisión",
    description: "Restauramos la operatividad de sus equipos con repuestos originales y protocolos técnicos avanzados.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "uid_2",
    title: "Mantenimiento",
    subtitle: "Rendimiento Continuo",
    description: "Programas preventivos diseñados para mitigar riesgos operativos y extender la vida útil de su infraestructura.",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "uid_3",
    title: "Instalaciones",
    subtitle: "Ingeniería en Seguridad",
    description: "Despliegue estratégico de sistemas de intercomunicación y cercos eléctricos bajo normativas internacionales.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1000"
  },
];

  return (
    <section>
      <div className="flex flex-col relative gap-10 xl:gap-16 w-full px-[5%] 4xl:px-[8%] py-10 md:py-16 bg-white mt-[70px]">
        
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-0">
          
          {/* Columna Izquierda: Textos y Botón */}
          <div className="col-span-2 flex flex-col justify-center">
            <div className="flex flex-col p-2 justify-center items-start gap-5">
              
                <h2 className="font-sora text-black text-3xl sm:text-4xl 2xl:text-5xl 4xl:text-6xl font-semibold tracking-tight !leading-tight">
                    Intercomunicadores
                </h2>
              
                <div className="flex flex-row mb-2">
                    <a href="/"
                        className="group bg-black text-white font-dmsans border-[1.5px] border-white border-opacity-50 flex flex-row items-center px-3 md:px-5 py-1.5 text-base 2xl:text-lg 4xl:text-xl rounded-xl font-medium">
                        Ver todos los productos
                        <div className="rounded-full flex flex-row justify-center items-center ml-2">
                            <i className="mdi mdi-arrow-up-circle text-2xl text-white group-hover:rotate-180 transition-all duration-500"></i>
                        </div>
                    </a>
                </div>
              
                <h2 className="font-dmsans text-black text-base 2xl:text-lg 4xl:text-xl tracking-wide font-light">
                    Los sistemas de intercomunicadores permiten identificar a las personas desde el momento en que habla con ellos a través del intercomunicador o portero, de la misma forma que usted se comunica por un teléfono convencional o monitor.
                </h2>

            </div>
          </div>

          {/* Columna Central: Imagen */}
          <div className="col-span-2 flex flex-col justify-end items-center">
            <img 
              className="h-96 md:h-[550px] w-full object-contain object-center" 
              src="/assets/img/intercomunicador_h.png" 
              alt="Estadística Helado"
              onError={handleImageError} 
            />
          </div>

          {/* Columna Derecha: Lista de Beneficios */}
          <div className="col-span-2 lg:col-span-1 flex flex-col sm:flex-row gap-5 sm:gap-10 lg:flex-col justify-around items-start lg:items-end">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 xl:gap-4">
              {benefits && benefits.map((beneficio, index) => {
                const content = (
                  <div className="flex flex-col pl-2 max-w-xs text-left xl:text-right">
                    <h3 className="text-[#052F4E] text-4xl font-galano_bold">
                      {beneficio?.descripcionshort ?? "Ingrese texto"}
                    </h3>
                    <h2 className="text-[#052F4E] text-sm 3xs:text-base md:text-lg font-galano_medium leading-none">
                      {beneficio?.titulo ?? "Ingrese texto"}
                    </h2>
                    <p className="text-[#052F4E] text-xs 3xs:text-sm md:text-sm font-galano_regular !leading-none mt-2">
                      {beneficio?.descripcion ?? "Ingrese texto"}
                    </p>
                  </div>
                );

                return (
                  <React.Fragment key={index}>
                    {beneficio.link1 ? (
                      <a href={beneficio.link1}>
                        {content}
                      </a>
                    ) : (
                      <div>
                        {content}
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Portada;