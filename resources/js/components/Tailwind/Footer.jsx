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
    console.log(aboutuses);
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
            <footer className="bg-[#5F48B7] text-white">
                <div className="pl-[5%] max-w-[20rem] lg:max-w-6xl xl:max-w-5xl 2xl:max-w-7xl md:px-0 mx-auto py-11 lg:py-16">
                    <div className=" flex md:flex-row flex-wrap xl:flex-nowrap gap-4 lg:gap-8">
                        <div className="hidden w-3/12 lg:flex justify-center">
                            <img
                                src="https://i.ibb.co/pvgT612S/image.png"
                                alt="weFem Logo"
                                className="md:w-[170.52px] md:h-[120.27px] 2xl:w-[197.52px] 2xl:h-[136.27px] object-cover"
                            />
                        </div>

                        <div className="w-8/12  text-[12.77px] lg:w-3/12 xl:w-4/12  border-r-[#FFFFFF]  border-r-2 lg:pr-4 md:text-[18.77px] 2xl:text-[23.77px] leading-[23.77px] tracking-[-0.07px] font-light">
                            <nav className="space-y-2 lg:space-y-4">
                                {WhatsApp && (
                                    <a
                                        href={WhatsApp.link}
                                        aria-label="WhatsApp"
                                        target="_blank"
                                        className="block hover:opacity-80 transition-opacity "
                                    >
                                        Conversemos
                                    </a>
                                )}

                                {/* <a
                                    href="#"
                                    className="block hover:opacity-80 transition-opacity "
                                >
                                    Preguntas frecuentes
                                </a>*/}
                                <a
                                    onClick={openModal}
                                    className="cursor-pointer block hover:opacity-80 transition-opacity "
                                >
                                    Términos y condiciones
                                </a>
                                {libroReclamaciones && (
                                    <a
                                        href={libroReclamaciones}
                                        target="_blank"
                                        className=" cursor-pointer block hover:opacity-80 transition-opacity "
                                    >
                                        Libro de Reclamaciones
                                    </a>
                                )}
                            </nav>
                        </div>

                        <div className="w-2/12 md:w-[35%] text-[15.77px] lg:w-2/12 lg:border-r-[#FFFFFF]  lg:border-r-2  md:text-[18.77px] 2xl:text-[23.77px] leading-[23.77px] tracking-[-0.07px] font-normal">
                            <nav className="space-y-2 lg:space-y-4">
                                {telefono && (
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
                                )}
                            </nav>
                        </div>
                        <div className=" w-6/12 mt-4 lg:mt-0  lg:hidden  flex items-center justify-start md:block">
                            <img
                                src="https://i.ibb.co/pvgT612S/image.png"
                                alt="weFem Logo"
                                className="h-[70.27px]  md:w-[170.52px] md:h-[120.27px] 2xl:w-[197.52px] 2xl:h-[136.27px] object-cover"
                            />
                        </div>

                        <div className="w-5/12 mt-4 lg:mt-0  md:w-[35%] lg:w-3/12 flex items-end lg:items-start lg:pt-4">
                            <div className="flex flex-row gap-1 lg:gap-4 ">
                                {Instagram && (
                                    <a
                                        href={Instagram.link}
                                        aria-label="Instagram"
                                        target="_blank"
                                    >
                                        <img
                                            src="/assets/img/footer/instagram.png"
                                            alt="facebook"
                                            className=" h-[35.65px] md:h-[59.65px] xl:h-[41.33px] 2xl:h-[61.33px] w-auto"
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
                                            className="h-[35.65px] md:h-[59.65px] xl:h-[41.33px] 2xl:h-[61.33px] w-auto "
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
                                            className="h-[35.65px] md:h-[59.65px] xl:h-[41.33px] 2xl:h-[61.33px] w-auto "
                                        />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-[#FFFFFF]">
                    <div className="px-[5%]  md:max-w-xl lg:max-w-5xl 2xl:max-w-7xl md:px-0 mx-auto md:h-[77.91px] md:py-0 flex items-center justify-start">
                        <p className="hidden md:block text-[14.72px] leading-[22.26px] text-[#EFEDF8]">
                            Copyright © 2025 weFem® | Todos los derechos
                            reservados | Juntxs sin límites
                        </p>
                        <p className="md:hidden flex w-full items-center justify-center text-center text-[8.72px] py-4 leading-[22.26px] text-[#EFEDF8]">
                            Copyright © 2025 weFem® Todos los derechos
                            reservados | Juntxs sin límites
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
