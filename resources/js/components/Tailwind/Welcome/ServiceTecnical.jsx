import { useEffect, useState, useRef } from "react";
import GeneralRest from "../../../actions/GeneralRest";

const generalRest = new GeneralRest();

const ServiceTecnical = () => {
    const [Benefits, setBenefits] = useState(null);
    const [Toallas, setToallas] = useState(null);
    const [Soles, setSoles] = useState(null);
    
    const [activeImage, setActiveImage] = useState(1);
    const handleToggleImage = () => {
        setActiveImage(prev => prev === 1 ? 2 : 1);
    };

    useEffect(() => {
        // ... (Tu lógica de fetch se mantiene igual)
        const fetchBenefits = async () => {
            try {
                const data = await generalRest.getBenefits();
                setBenefits(data);
            } catch (error) {
                console.error("Error fetching benefits:", error);
            }
        };
        fetchBenefits();
    }, []);
    
    return (

        <div className="relative overflow-hidden">
            <div className="relative w-full px-[5%] 4xl:px-[8%] gap-10 xl:gap-16 flex flex-col items-center py-10 xl:py-20">

                    <div className="w-full flex flex-col items-center justify-center gap-5 max-w-3xl 4xl:max-w-4xl text-center">
                        <h3 className="font-dmsans text-black text-lg xl:text-xl 4xl:text-2xl tracking-wide font-light">
                            Contamos con el personal calificado para
                        </h3>
                        <h2 className="font-sora text-black text-3xl sm:text-4xl 2xl:text-5xl 4xl:text-6xl font-semibold tracking-tight !leading-tight">
                            Instalaciones y Servicios Técnicos Multimarca
                        </h2>
                    </div>
                   
                    <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 2xl:gap-20 w-full items-center justify-center">
                        <div className="w-full xl:w-1/2 flex flex-col gap-2 justify-center items-start order-2 lg:order-1">
                            <h3 className="font-sora text-black text-3xl sm:text-4xl 2xl:text-4xl 4xl:text-5xl font-semibold tracking-tight !leading-tight mb-3">
                                Nosotros lo instalamos
                            </h3>
                            <p className="font-dmsans text-black text-base xl:text-lg 4xl:text-xl tracking-wide font-light">
                               Realizamos instalaciones de todos los productos (Intercomunicadores, Sistemas de Alarma contra Robo, Cercos Eléctricos y Sistemas contra Incendios)
                               de distintas marcas en tendencia, desde los más comerciales hasta alta gama, sujeto a evaluación técnica del proyecto.
                            </p> 
                            <p className="font-dmsans text-black text-base xl:text-lg 4xl:text-xl tracking-wide font-light">
                               Además, brindamos servicios de Reparaciones, Mantenimiento, Ampliaciones, Modificaciones, Traslados, etc.
                            </p> 
                            <div className="flex flex-row mt-2">
                                <a href="/"
                                    className="bg-[#030e16] font-dmsans border-[2px] border-accent text-white flex flex-row items-center px-3 md:px-6 py-2 text-base xl:text-lg 4xl:text-xl rounded-xl font-medium">
                                    Ir a nosotros
                                </a>
                            </div>
                        </div>
                        <div className="w-full xl:w-1/2 flex flex-col justify-center items-center  order-1 lg:order-2">
                            <div className="relative h-[250px] sm:h-[350px] 4xl:h-[450px] overflow-hidden rounded-2xl group">
                                <img src="/assets/img/tecnicos.webp" alt="" className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110 " />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 2xl:gap-20 w-full items-center justify-center">
                        
                        <div className="w-full xl:w-1/2 flex flex-col justify-center items-center">
                            <div className="relative h-[250px] sm:h-[350px] 4xl:h-[450px] overflow-hidden rounded-2xl group">
                                <img src="/assets/img/certificado.webp" alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 " />
                            </div>
                        </div>
                        
                        <div className="w-full xl:w-1/2 flex flex-col gap-2 justify-center lg:items-end">
                            <h3 className="font-sora text-black text-3xl sm:text-4xl 2xl:text-4xl 4xl:text-5xl font-semibold tracking-tight !leading-tight mb-3">
                                Certificado para INDECI 
                            </h3>
                            <p className="font-dmsans text-black text-base xl:text-lg 4xl:text-xl tracking-wide font-light lg:text-right">
                               Respecto a Sistemas de Alarma contra Incendio cumplimos con todas las exigencias y recomendaciones de los fabricantes para el control, instalacion, y mantenimiento de estos sistemas. 
                               
                            </p> 
                            <p className="font-dmsans text-black text-base xl:text-lg 4xl:text-xl tracking-wide font-light lg:text-right">
                               Finalizado el servicio se otorgará un certificado de operatividad que le será de utilidad al momento de la inspección INDECI
                            </p> 
                        </div>
                        
                    </div>
                
            </div>
        </div>
    );
};

export default ServiceTecnical;
