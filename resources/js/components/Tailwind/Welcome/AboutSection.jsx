import { useEffect, useState, useRef } from "react";
import GeneralRest from "../../../actions/GeneralRest";
import ImageOverSection from "./ImageOverSection";

const generalRest = new GeneralRest();

const AboutSection = () => {
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
                        <h3 className="font-dmsans text-black text-base sm:text-lg 2xl:text-xl 4xl:text-2xl tracking-wide font-light">
                            Tu tranquilidad es nuestra prioridad
                        </h3>
                        <h2 className="font-sora text-black text-3xl sm:text-4xl 2xl:text-5xl 4xl:text-6xl font-semibold tracking-tight !leading-tight">
                            Comunicación y Seguridad en tu Hogar o Espacio de Trabajo
                        </h2>
                    </div>
                   
                    <div className="flex flex-col xl:flex-row gap-10 w-full items-center justify-center">
                        <div className="w-full xl:w-1/2 flex flex-col gap-2 justify-center items-start">
                            <h3 className="font-sora text-black text-3xl sm:text-4xl 2xl:text-4xl 4xl:text-5xl font-semibold tracking-tight !leading-tight">
                                Nosotros
                            </h3>
                            <p className="font-dmsans text-black text-base 2xl:text-lg 4xl:text-xl tracking-wide font-light">
                                Conocemos las necesidades de nuestros clientes, en términos de seguridad y comunicación electrónica.
                            </p> 
                            <div className="flex flex-col sm:flex-row justify-start items-start gap-5 md:gap-8 lg:gap-5 2xl:gap-12 4xl:gap-14 w-full mt-4">
                                <div onMouseEnter={() => setActiveImage(1)}
                                    className={`w-full lg:w-1/2 flex flex-col justify-center items-start border-2 rounded-xl p-6 gap-4 transition-all duration-300 cursor-default
                                    ${activeImage === 1 ? 'border-black' : ' border-black border-opacity-20'}`}
                                    >
                                        <div className="w-14 h-14 4xl:w-16 4xl:h-16 rounded-full bg-[#030e16] flex flex-col justify-center items-center">
                                            <img className="w-8 4xl:w-10" src="/assets/img/crecimiento.png"></img>
                                        </div>
                                        <h3 className="font-sora text-black text-xl 2xl:text-2xl 4xl:text-3xl font-semibold tracking-tight !leading-tight">
                                            Prestigio a través de los años
                                        </h3>
                                        <p className="font-dmsans text-black text-base 2xl:text-lg 4xl:text-xl tracking-wide font-light">
                                            Desde 1988, en La Casa del Intercomunicador, cada solución que ofrecemos lleva el sello de una experiencia perfeccionada durante más de tres décadas, dedicadas enteramente a la mejor atención y servicio en todos los productos.
                                        </p> 
                                </div>
                                <div onMouseEnter={() => setActiveImage(2)}
                                    className={`w-full lg:w-1/2 flex flex-col justify-center items-start border-2 rounded-xl p-6 gap-4 transition-all duration-300 cursor-default
                                    ${activeImage === 2 ? 'border-black' : ' border-black border-opacity-20'}`}
                                    >
                                        <div className="w-14 h-14 4xl:w-16 4xl:h-16 rounded-full bg-[#030e16] flex flex-col justify-center items-center">
                                            <img className="w-9 4xl:w-12" src="/assets/img/servicio.png"></img>
                                        </div>
                                        <h3 className="font-sora text-black text-xl 2xl:text-2xl 4xl:text-3xl font-semibold tracking-tight !leading-tight">
                                            Empresa líder en el país
                                        </h3>
                                        <p className="font-dmsans text-black text-base 2xl:text-lg 4xl:text-xl tracking-wide font-light">
                                            Llevamos seguridad y conectividad a hogares y empresas. Contamos con la fuerza operativa de más de 50 técnicos expertos en seguridad electrónica, listos para implementar las soluciones más avanzadas del mercado.
                                        </p> 
                                </div>
                            </div>
                        </div>
                        <div className="w-full xl:w-1/2 flex flex-col gap-4 justify-center items-end">
                           <ImageOverSection activeImage={activeImage} onToggle={handleToggleImage} />
                        </div>
                    </div>
                
            </div>
        </div>
    );
};

export default AboutSection;
