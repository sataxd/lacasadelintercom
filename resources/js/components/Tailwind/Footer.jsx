import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";

import Tippy from "@tippyjs/react";
import HtmlContent from "../../Utils/HtmlContent";
import GeneralRest from "../../actions/GeneralRest";

ReactModal.setAppElement("#app");

const Footer = ({ terms, footerLinks = [] }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const generalRest = new GeneralRest();
    const links = {};
    /* footerLinks.forEach((fl) => {
        links[fl.correlative] = fl.description;
    });*/
    const [socials, setSocials] = useState([]);

    useEffect(() => {
        const fetchSocials = async () => {
            try {
                const data = await generalRest.getSocials();
                setSocials(data);
            } catch (error) {
                console.error("Error fetching socials:", error);
            }
        };

        fetchSocials();
    }, []); // Asegúrate de que este array de dependencias está vacío si solo se ejecuta una vez

    const TikTok = socials.find((social) => social.description === "TikTok");
    const WhatsApp = socials.find(
        (social) => social.description === "WhatsApp"
    );
    const Instagram = socials.find(
        (social) => social.description === "Instagram"
    );
    const Facebook = socials.find(
        (social) => social.description === "Facebook"
    );

    const [aboutuses, setAboutuses] = useState(null); // o useState({});

    useEffect(() => {
        const fetchAboutuses = async () => {
            try {
                const data = await generalRest.getAboutuses();
                setAboutuses(data);
            } catch (error) {
                console.error("Error fetching about:", error);
            }
        };

        fetchAboutuses();
    }, []);
    //console.log(aboutuses);
    // Extrae los datos necesarios
    const aboutusData = aboutuses?.aboutus || [];
    const generalsData = aboutuses?.generals || [];

    // 1. Libro de reclamaciones (de aboutus)
    const libroReclamaciones = aboutusData.find(
        (item) => item.correlative === "customer-complaints"
    )?.description;
    const telefono = aboutusData.find(
        (item) => item.correlative === "phone"
    )?.description;
    const mail = aboutusData.find(
        (item) => item.correlative === "email"
    )?.description;
    const f_whatsapp = aboutusData.find(
        (item) => item.correlative === "whatsapp"
    )?.description;

    // 2. Términos y condiciones (de generals)
    const termsConditions = generalsData.find(
        (item) => item.correlative === "terms_conditions"
    )?.description;

    return (
        <>
            <footer className="bg-[#0b0b0b] text-white">
                <div className="px-[5%] py-10 lg:py-12">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 lg:gap-8">
                        
                        <div className="w-full sm:col-span-6 flex flex-col gap-6 sm:gap-4 2xl:gap-5 4xl:gap-6 justify-start">
                            <a href="/">
                                <img
                                    src="/assets/img/lacasadelintercom_white.webp"
                                    alt="WeFem Logo"
                                    className="h-[43px] 2xl:h-[50px] 4xl:h-[55px] object-cover -mt-2"
                                />
                            </a>

                            <div className="flex flex-col gap-0">
                                <p className="font-dmsans text-white text-opacity-70 text-sm 2xl:text-base 4xl:text-lg">Calle Morelli 341 - San Borja, Lima</p>
                                <p className="font-dmsans text-white text-opacity-70 text-sm 2xl:text-base 4xl:text-lg">San Borja, Lima</p>
                                <p className="font-dmsans text-white text-opacity-70 text-sm 2xl:text-base 4xl:text-lg">Perú</p>
                            </div>

                            <div className="flex flex-row gap-5 max-w-md">
                                <div className="flex flex-col gap-1">
                                    <p className="font-dmsans text-white text-opacity-70 text-sm 2xl:text-base 4xl:text-lg">Teléfono fijo</p>
                                    <p className="font-dmsans text-white text-sm 2xl:text-base 4xl:text-lg">+51 1234567</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="font-dmsans text-white text-opacity-70 text-sm 2xl:text-base 4xl:text-lg">Email</p>
                                    <p className="font-dmsans text-white text-sm 2xl:text-base 4xl:text-lg">ventas@lacasadelintercom.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-full sm:col-span-2 sm:pl-5">
                            
                            <p className="font-dmsans text-white text-opacity-70 text-sm 2xl:text-base 4xl:text-lg">Menu</p>
                            
                            <nav className="flex flex-col gap-1 2xl:gap-2 4xl:gap-4 mt-3 sm:mt-5">
                                
                                {/* {WhatsApp && (
                                    <a
                                        href={WhatsApp.link}
                                        aria-label="WhatsApp"
                                        target="_blank"
                                        className="block hover:opacity-80 transition-opacity "
                                    >
                                        Conversemos
                                    </a>
                                )} */}
                                
                                <a onClick={openModal} className="cursor-pointer hover:opacity-80 transition-opacity font-dmsans text-white text-sm 2xl:text-base 4xl:text-lg">Inicio</a>

                                <a onClick={openModal} className="cursor-pointer hover:opacity-80 transition-opacity font-dmsans text-white text-sm 2xl:text-base 4xl:text-lg">Servicio Técnico</a>

                                <a onClick={openModal} className="cursor-pointer hover:opacity-80 transition-opacity font-dmsans text-white text-sm 2xl:text-base 4xl:text-lg">Contacto</a>

                                <a onClick={openModal} className="cursor-pointer hover:opacity-80 transition-opacity font-dmsans text-white text-sm 2xl:text-base 4xl:text-lg">Únete</a>

                            </nav>
                        </div>

                        <div className="w-full sm:col-span-2">

                            <p className="font-dmsans text-white text-opacity-70 text-sm 2xl:text-base 4xl:text-lg">Servicio al cliente</p>

                            <nav className="flex flex-col gap-1 2xl:gap-2 4xl:gap-4 mt-3 sm:mt-5">

                                <a onClick={openModal} className="cursor-pointer hover:opacity-80 transition-opacity font-dmsans text-white text-sm 2xl:text-base 4xl:text-lg">Terminos y Condiciones</a>

                                <a onClick={openModal} className="cursor-pointer hover:opacity-80 transition-opacity font-dmsans text-white text-sm 2xl:text-base 4xl:text-lg">Politicas de privacidad</a>
                                {/* {telefono && (
                                    <a
                                        href={`tel:${telefono}`}
                                        className="block hover:opacity-80 transition-opacity "
                                    >
                                        Teléfono
                                    </a>
                                )}
                                {mail && (
                                    <a
                                        href={`mailto:${mail}`}
                                        className="block hover:opacity-80 transition-opacity "
                                    >
                                        Mail
                                    </a>
                                )}
                                {f_whatsapp && (
                                    <a
                                        href={`//wa.me/${f_whatsapp}`}
                                        aria-label="WhatsApp"
                                        target="_blank"
                                        className="block hover:opacity-80 transition-opacity "
                                    >
                                        Whatsapp
                                    </a>
                                )} */}
                            </nav>
                        </div>
                        
                        <div className="w-full sm:col-span-2 flex flex-col">

                            <p className="font-dmsans text-white text-opacity-70 text-sm 2xl:text-base 4xl:text-lg">Redes Sociales</p>

                            <div className="flex flex-row justify-end gap-4 max-w-32 mt-3 sm:mt-5">
                                {Instagram && (
                                    <a
                                        href={Instagram.link}
                                        aria-label="Instagram"
                                        target="_blank"
                                    >
                                        <img
                                            src="/assets/img/footer/instagram.png"
                                            alt="facebook"
                                            className="w-auto"
                                        />
                                    </a>
                                )}

                                {Facebook && (
                                    <a
                                        href={Facebook.link}
                                        aria-label="Facebook"
                                        target="_blank"
                                    >
                                        <img
                                            src="/assets/img/footer/facebook.png"
                                            alt="Facebook"
                                            className="w-auto"
                                        />
                                    </a>
                                )}

                                {WhatsApp && (
                                    <a
                                        href={WhatsApp.link}
                                        aria-label="WhatsApp"
                                        target="_blank"
                                    >
                                        <img
                                            src="/assets/img/footer/whatsapp.png"
                                            alt="WhatsApp"
                                            className="w-auto"
                                        />
                                    </a>
                                )}
                            </div>
                        </div>

                    </div>

                </div>

                <div className="border-t border-white border-opacity-20 mx-[5%] py-5">
                    <div className="flex items-center justify-start">
                        <p className="text-center font-dmsans text-white text-opacity-70 text-[15px] 4xl:text-lg">
                            Copyright © {new Date().getFullYear()} La Casa del Intercomunicador | Todos los derechos
                            reservados
                        </p>
                    </div>
                </div>
            </footer>
            {/* Modal para Términos y Condiciones */}
            <ReactModal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                contentLabel="Términos y condiciones"
                className="absolute left-1/2 -translate-x-1/2 bg-white p-6 rounded shadow-lg w-[95%] max-w-2xl my-8 outline-none h-[90vh]"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
            >
                <button
                    onClick={closeModal}
                    className="float-right text-gray-500 hover:text-gray-900"
                >
                    Cerrar
                </button>
                <h2 className="text-xl font-bold mb-4">
                    Terminos y Condiciones
                </h2>
                <HtmlContent
                    className="prose h-[calc(90vh-120px)] lg:h-[calc(90vh-90px)] overflow-auto"
                    html={termsConditions}
                />
            </ReactModal>
        </>
    );
};

export default Footer;
