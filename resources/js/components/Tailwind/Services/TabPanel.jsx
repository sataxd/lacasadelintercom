import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATOS (Ya no necesitamos el ID manual para mostrarlo, solo para keys si quieres) ---
const services = [
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
  {
    id: "uid_4",
    title: "Ampliaciones",
    subtitle: "Escalabilidad Modular",
    description: "Adaptamos y expandimos sus sistemas actuales integrando nuevas tecnologías sin comprometer la estructura.",
    image: "https://images.unsplash.com/photo-1590059132213-f91575ee301b?auto=format&fit=crop&q=80&w=1000"
  }
];

const SplitText = ({ text, className, delay = 0 }) => {
  const letters = text.split("");
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      // Hacemos el stagger más rápido (0.015s en vez de 0.03s) para acompañar la velocidad
      transition: { staggerChildren: 0.015, delayChildren: delay } 
    })
  };

  const childVariants = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20, 
      rotateX: -90, 
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap" }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span variants={childVariants} key={index} style={{ position: "relative" }}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

// --- COMPONENTE PRINCIPAL ---
const TabPanel = () => {
  const [activeTab, setActiveTab] = useState(services[0]);

  // ANIMACIÓN DE IMAGEN MÁS RÁPIDA
  const jumpImageVariants = {
    initial: { 
      x: '120%',       
      scale: 0.6,      
      opacity: 0,
      rotate: 5        
    },
    animate: { 
      x: '0%',         
      scale: 1,        
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.5, // REDUCIDO: De 1s a 0.5s        
        ease: "backOut"      
      }
    },
    exit: { 
      x: '120%',       
      scale: 0.6,      
      opacity: 0,
      rotate: 5,
      transition: {
        duration: 0.4, // REDUCIDO: Salida un poco más rápida        
        ease: "backIn"       
      }
    }
  };

  return (
    <section className="relative overflow-hidden mt-[70px]">
      <div className="relative w-full px-[5%] 4xl:px-[8%] gap-10 xl:gap-16 flex flex-col items-center py-10 xl:py-16">
          
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 w-full items-start justify-center">

            <div className="w-full xl:w-2/5 flex flex-col gap-4">
              
              <div className='flex flex-col gap-2 justify-center items-start'>
                <h3 className="font-sora text-black text-3xl sm:text-4xl 2xl:text-4xl 4xl:text-5xl font-semibold tracking-tight !leading-tight mb-3">
                    Nuestros Clientes
                </h3>
                <p className="font-dmsans text-black text-base 2xl:text-lg 4xl:text-xl tracking-wide font-light">
                    Desde Instituciones públicas hasta grandes corporaciones y proyectos residenciales,
                    La Casa del Intercomunicador provee soluciones estratégicas en comunicación y seguridad electrónica. 
                </p>
              </div>

              <div className='flex flex-col w-full'>
                {/* AQUI AGREGAMOS EL INDEX */}
                {services.map((service, index) => (
                  <button
                    key={service.id}
                    onClick={() => setActiveTab(service)}
                    className={`flex items-center gap-3 py-4 sm:py-6 max-w-md border-b border-gray-200 transition-all duration-300 group text-left ${
                    activeTab.id === service.id ? 'opacity-100' : 'opacity-60 hover:opacity-70'
                  }`}
                  >
                    {/* CAMBIO: Generación automática del número */}
                    <span className={`font-sora font-bold ${
                        activeTab.id === service.id ? 'text-black text-xl' : 'text-gray-800 text-base'
                      }`}>
                        {(index + 1).toString().padStart(2, '0')}
                    </span>

                    <h2 className={`font-sora transition-all duration-300 font-medium tracking-tight !leading-tight ${
                        activeTab.id === service.id 
                          ? 'text-xl sm:text-2xl 4xl:text-3xl font-semibold text-black' 
                          : 'text-base sm:text-lg  4xl:text-2xl text-gray-800'
                        }`}>
                        {service.title}
                    </h2>
                  </button>
                ))}
              </div>
            </div>

            
            <div className="w-full xl:w-3/5 flex flex-col justify-start items-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab.id}
                  className="w-full flex flex-col gap-5"
                >

                  <div className="relative w-full h-[250px] sm:h-[450px] 4xl:h-[600px] overflow-hidden rounded-2xl bg-gray-100">
                    <motion.img 
                      variants={jumpImageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      src={activeTab.image} 
                      alt={activeTab.title} 
                      className="w-full h-full object-cover transition-all duration-500"
                    />
                  </div>

                 
                  <div className="relative z-0 px-2">
                  
                    <SplitText 
                      text={activeTab.subtitle} 
                      className="font-sora text-black text-2xl sm:text-3xl 4xl:text-4xl font-semibold tracking-tight mb-4 !leading-tight"
                      // CAMBIO: Delay reducido a 0.3s (antes 0.5) para que aparezca apenas entra la imagen
                      delay={0.3}  
                    />
                  
                    <div className="mt-4">
                      <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          // CAMBIO: Delay reducido a 0.5s y duración 0.4s
                          transition={{ delay: 0.5, duration: 0.4 }}
                          className="font-dmsans text-black text-base 2xl:text-lg 4xl:text-xl tracking-wide"
                      >
                          {activeTab.description}
                      </motion.p>
                    </div>

                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>

      </div>
    </section>
  );
};

export default TabPanel;