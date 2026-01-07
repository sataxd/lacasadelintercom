import React from 'react';
import { Building2, Briefcase, Factory, Hospital, School, Landmark } from 'lucide-react';
import { OrbitingCirclesDemo } from './OrbitingCirclesDemo';


const SectoresClientes = () => {
  const sectores = [
    { nombre: 'Construcción', icono: <Building2 className="w-6 h-6" /> },
    { nombre: 'Corporativo', icono: <Briefcase className="w-6 h-6" /> },
    { nombre: 'Manufactura', icono: <Factory className="w-6 h-6" /> },
    { nombre: 'Salud', icono: <Hospital className="w-6 h-6" /> },
    { nombre: 'Educación', icono: <School className="w-6 h-6" /> },
    { nombre: 'Gobierno', icono: <Landmark className="w-6 h-6" /> },
  ];

  return (
    <div className="relative overflow-hidden">
            <div className="relative w-full px-[5%] 4xl:px-[8%] gap-10 xl:gap-16 flex flex-col items-center py-10 xl:py-16">

                    <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 2xl:gap-20 w-full items-center justify-center">
                        <div className="w-full xl:w-1/2 flex flex-col gap-2 justify-center items-start">
                            
                            <h3 className="font-sora text-black text-3xl sm:text-4xl 2xl:text-4xl 4xl:text-5xl font-semibold tracking-tight !leading-tight mb-3">
                                Nuestros Clientes
                            </h3>
                            <p className="font-dmsans text-black text-base 2xl:text-lg 4xl:text-xl tracking-wide font-light">
                                Desde Instituciones públicas hasta grandes corporaciones y proyectos residenciales,
                                La Casa del Intercomunicador provee soluciones estratégicas en comunicación y seguridad electrónica. 
                                
                            </p>
                            <p className="font-dmsans text-black text-base 2xl:text-lg 4xl:text-xl tracking-wide font-light">
                              Garantizamos un producto de calidad, soporte técnico especializado y atención personalizada.
                              Por ello, la confianza de empresas del estado y clientes particulares respalda nuestra trayectoria.
                            </p>
                           
                        </div>
                        <div className="w-full xl:w-1/2 flex flex-col justify-center items-center">
                              <OrbitingCirclesDemo className="hidden" />
                        </div>
                        
                    </div>
            </div>
        </div>
  );
};

export default SectoresClientes;