import { useEffect, useState, useRef } from "react";
import GeneralRest from "../../../actions/GeneralRest";

const generalRest = new GeneralRest();

const CategoriesSection = () => {
    const [Benefits, setBenefits] = useState(null);
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
            <div className="relative w-full px-[5%] 4xl:px-[8%] gap-10 xl:gap-16 flex flex-col items-center py-10 xl:py-20 bg-[#030e16]">

                    <div className="w-full flex flex-col items-center justify-center gap-5 max-w-5xl 4xl:max-w-6xl text-center">
                        <h2 className="font-sora text-white text-3xl sm:text-4xl 2xl:text-5xl 4xl:text-6xl font-semibold tracking-tight !leading-tight">
                            Intercomunicadores y sistemas de seguridad para todo tipo instalaciones
                        </h2>
                    </div>
                   
                    <div className="flex w-full items-center justify-center py-5">
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 4xl:gap-16 ">
                            
                            <a href="/services?slug=fisioterapia-ortopedica" className="relative h-[250px] sm:h-[300px] 4xl:h-[400px] overflow-hidden rounded-2xl group">
                                <div className="w-full h-full">
                                    <img src="/assets/img/cat_intercomunicador.webp" alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                </div>

                                <div className="pointer-events-none absolute inset-0">
                                    <div className="absolute rounded-xl inset-0 bg-gradient-to-br from-[rgba(0,0,0,0.56)_23.61%] to-[rgba(0,0,0,0)_64.76%]"></div>
                                    <h2 className="text-white absolute top-8 left-8 font-sora text-xl 2xl:text-2xl 4xl:text-3xl font-semibold tracking-normal !leading-tight max-w-sm">
                                        Sistemas de Intercomunicadores
                                    </h2>
                                </div>
                            </a>

                            <a href="/services?slug=fisioterapia-ortopedica" className="relative h-[250px] sm:h-[300px] 4xl:h-[400px] overflow-hidden rounded-2xl group">
                                <div className="w-full h-full">
                                    <img src="/assets/img/cat_videoporteros.webp" alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 " />
                                </div>

                                <div className="pointer-events-none absolute inset-0">
                                    <div className="absolute rounded-xl inset-0 bg-gradient-to-br from-[rgba(0,0,0,0.56)_23.61%] to-[rgba(0,0,0,0)_64.76%]"></div>
                                    <h2 className="text-white absolute top-8 left-8 font-sora text-xl 2xl:text-2xl 4xl:text-3xl font-semibold tracking-tight !leading-tight max-w-sm">
                                        Sistemas de Videoporteros
                                    </h2>
                                </div>
                            </a>

                            <a href="/services?slug=fisioterapia-ortopedica" className="relative h-[250px] sm:h-[300px] 4xl:h-[400px] overflow-hidden rounded-2xl group">
                                <div className="w-full h-full">
                                    <img src="/assets/img/cat_incendio.webp" alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 " />
                                </div>

                                <div className="pointer-events-none absolute inset-0">
                                    <div className="absolute rounded-xl inset-0 bg-gradient-to-br from-[rgba(0,0,0,0.56)_23.61%] to-[rgba(0,0,0,0)_64.76%]"></div>
                                    <h2 className="text-white absolute top-8 left-8 font-sora text-xl 2xl:text-2xl 4xl:text-3xl font-semibold tracking-tight !leading-tight max-w-sm">
                                        Sistemas de Alarmas contra Incendio
                                    </h2>
                                </div>
                            </a>

                            <a href="/services?slug=fisioterapia-ortopedica" className="relative h-[250px] sm:h-[300px] 4xl:h-[400px] overflow-hidden rounded-2xl group">
                                <div className="w-full h-full">
                                    <img src="/assets/img/cat_alarmacontrarobo.webp" alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 " />
                                </div>

                                <div className="pointer-events-none absolute inset-0">
                                    <div className="absolute rounded-xl inset-0 bg-gradient-to-br from-[rgba(0,0,0,0.56)_23.61%] to-[rgba(0,0,0,0)_64.76%]"></div>
                                    <h2 className="text-white absolute top-8 left-8 font-sora text-xl 2xl:text-2xl 4xl:text-3xl font-semibold tracking-tight !leading-tight max-w-sm">
                                        Sistema de Alarma Contra Robo
                                    </h2>
                                </div>
                            </a>

                            <a href="/services?slug=fisioterapia-ortopedica" className="relative h-[250px] sm:h-[300px] 4xl:h-[400px] overflow-hidden rounded-2xl group">
                                <div className="w-full h-full">
                                    <img src="/assets/img/cat_hospitalario.webp" alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 " />
                                </div>

                                <div className="pointer-events-none absolute inset-0">
                                    <div className="absolute rounded-xl inset-0 bg-gradient-to-br from-[rgba(0,0,0,0.56)_23.61%] to-[rgba(0,0,0,0)_64.76%]"></div>
                                    <h2 className="text-white absolute top-8 left-8 font-sora text-xl 2xl:text-2xl 4xl:text-3xl font-semibold tracking-tight !leading-tight max-w-sm">
                                        Intercomunicador Hospitalario
                                    </h2>
                                </div>
                            </a>

                            <a href="/services?slug=fisioterapia-ortopedica" className="relative h-[250px] sm:h-[300px] 4xl:h-[400px] overflow-hidden rounded-2xl group">
                                <div className="w-full h-full">
                                    <img src="/assets/img/cat_cercoelectrico.webp" alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 " />
                                </div>

                                <div className="pointer-events-none absolute inset-0">
                                    <div className="absolute rounded-xl inset-0 bg-gradient-to-br from-[rgba(0,0,0,0.56)_23.61%] to-[rgba(0,0,0,0)_64.76%]"></div>
                                    <h2 className="text-white absolute top-8 left-8 font-sora text-xl 2xl:text-2xl 4xl:text-3xl font-semibold tracking-tight !leading-tight max-w-sm">
                                        Sistema de Cerco Eléctrico
                                    </h2>
                                </div>
                            </a>

                        </div>
                        
                    </div>
                
            </div>
        </div>
    );
};

export default CategoriesSection;

