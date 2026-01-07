import { useEffect, useState, useRef } from "react";
import GeneralRest from "../../../actions/GeneralRest";
import ContactForm from "../../Contact/ContactForm";

const generalRest = new GeneralRest();

const ContactSection = ({tieneMargen = false}) => {
    const [Benefits, setBenefits] = useState(null);
    const [Toallas, setToallas] = useState(null);
    const [Soles, setSoles] = useState(null);
    
    const [activeImage, setActiveImage] = useState(1);
    const handleToggleImage = () => {
        setActiveImage(prev => prev === 1 ? 2 : 1);
    };

    const bgVariable = tieneMargen ? "mt-[70px]" : "mt-0";

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
            <div className={`relative w-full px-[5%] 4xl:px-[8%] gap-10 xl:gap-16 flex flex-col items-center py-10 xl:py-16 bg-[#0b0b0b] ${bgVariable}`}>

                    <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 2xl:gap-20 w-full items-center justify-center">
                        <div className="w-full xl:w-1/2 flex flex-col gap-2 justify-center items-start">
                            
                            <h3 className="font-sora text-white text-3xl sm:text-4xl 2xl:text-4xl 4xl:text-5xl font-semibold tracking-tight !leading-tight mb-3">
                                Ponte en contacto
                            </h3>
                            <p className="font-dmsans text-white text-base 2xl:text-lg 4xl:text-xl tracking-wide font-light">
                                Enviando un mensaje al correo comunicaciones.compras@gmail.com o completar el formulario de contacto en nuestro sitio web. También puede encontrarnos en las redes sociales, donde compartimos noticias y actualizaciones de la empresa.
                            </p>
                            <div className="flex flex-col gap-3 w-full max-w-md my-3">
                                <div className="flex flex-row gap-3 border border-gray-100 border-opacity-20 rounded-2xl p-3 bg-gray-900 bg-opacity-10 group">
                                    <div className="flex flex-col justify-center items-center">
                                        <div className="border border-gray-100 border-opacity-20 rounded-md px-2 bg-gray-900 bg-opacity-10">
                                            <i className="mdi mdi-email-outline text-[22px] text-white"></i> 
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-between w-full">
                                        <div className="flex flex-col">
                                            <h2 className="font-sora font-medium text-white text-sm 2xl:text-base">Correo Electronico</h2>
                                            <p className="font-dmsans text-white text-sm 2xl:text-base">diego.martinez.r@tecsup.edu.pe</p>
                                        </div>
                                        <div className="flex flex-row justify-center items-center">
                                            <div className="rounded-full w-9 h-9 flex flex-row justify-center items-center bg-gray-300 bg-opacity-10">
                                                <i className="mdi mdi-arrow-top-right text-[22px] text-white group-hover:rotate-45 transition-all duration-500"></i> 
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-row gap-3 border border-gray-100 border-opacity-20 rounded-2xl p-3 bg-gray-900 bg-opacity-10 group">
                                    <div className="flex flex-col justify-center items-center">
                                        <div className="border border-gray-100 border-opacity-20 rounded-md px-2 bg-gray-900 bg-opacity-10">
                                            <i className="mdi mdi-cellphone text-[22px] text-white"></i> 
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-between w-full">
                                        <div className="flex flex-col">
                                            <h2 className="font-sora font-medium text-white text-sm 2xl:text-base">Teléfono móvil</h2>
                                            <p className="font-dmsans text-white text-sm 2xl:text-base">+51 123456789</p>
                                        </div>
                                        <div className="flex flex-row justify-center items-center">
                                            <div className="rounded-full w-9 h-9 flex flex-row justify-center items-center bg-gray-300 bg-opacity-10">
                                                <i className="mdi mdi-arrow-top-right text-[22px] text-white group-hover:rotate-45 transition-all duration-500"></i> 
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-row gap-3 border border-gray-100 border-opacity-20 rounded-2xl p-3 bg-gray-900 bg-opacity-10 group">
                                    <div className="flex flex-col justify-center items-center">
                                        <div className="border border-gray-100 border-opacity-20 rounded-md px-2 bg-gray-900 bg-opacity-10">
                                            <i className="mdi mdi-map-marker-outline text-[22px] text-white"></i> 
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-between w-full">
                                        <div className="flex flex-col">
                                            <h2 className="font-sora font-medium text-white text-sm 2xl:text-base">Dirección</h2>
                                            <p className="font-dmsans text-white text-sm 2xl:text-base">C. Morelli 341 - San Borja, Lima</p>
                                        </div>
                                        <div className="flex flex-row justify-center items-center">
                                            <div className="rounded-full w-9 h-9 flex flex-row justify-center items-center bg-gray-300 bg-opacity-10">
                                                <i className="mdi mdi-arrow-top-right text-[22px] text-white group-hover:rotate-45 transition-all duration-500"></i> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                            
                        </div>
                        <div className="w-full xl:w-1/2 flex flex-col justify-center items-center">
                            <ContactForm />
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default ContactSection;
