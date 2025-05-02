import Tippy from "@tippyjs/react";
import React, { useState, useEffect, useRef, useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import GeneralRest from "../../actions/GeneralRest";
import { TbBrush } from "react-icons/tb";
import { Trash2 } from "lucide-react";

const generalRest = new GeneralRest();
const Header = ({
    session,
    showSlogan = true,
    gradientStart,
    menuGradientEnd,
    backgroundType = "none",
    backgroundSrc = "",
    backgroundHeight = "h-full",
    backgroundPosition = "object-top",
    children,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const btnToggleRef = useRef(null);
    const { incrementarCantidad, decrementarCantidad } =
        useContext(CarritoContext);

    const toggleMenu = (event) => {
        if (event.target.closest(".menu-toggle")) {
            setIsOpen(!isOpen);
        } else {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                btnToggleRef.current == event.target ||
                btnToggleRef.current.contains(event.target)
            )
                return;
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 1);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const { carrito, eliminarProducto } = useContext(CarritoContext);
    const [animar, setAnimar] = useState(false);
    const totalProductos = carrito.reduce((acc, item) => {
        if (item.variations && item.variations.length > 0) {
            return (
                acc + item.variations.reduce((sum, v) => sum + v.quantity, 0)
            );
        }
        return acc + item.quantity;
    }, 0);

    useEffect(() => {
        if (totalProductos > 0) {
            setAnimar(true);
            setTimeout(() => setAnimar(false), 500); // Duración de la animación
        }
    }, [totalProductos]);
    const [mostrarCarrito, setMostrarCarrito] = useState(false);
    const totalPrecio = carrito.reduce((acc, item) => {
        if (item.variations && item.variations.length > 0) {
            return (
                acc +
                item.variations.reduce(
                    (sum, v) => sum + item.final_price * v.quantity,
                    0
                )
            );
        }
        return acc + item.final_price * item.quantity;
    }, 0);

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
    return (
        <>
            {showSlogan && (
                <div
                    className={`text-center px-[5%] py-4 font-light bg-[#6048B7] text-white text-[10.21px] md:text-[16.21px] leading-6 uppercase tracking-[0.2em] font-poppins w-full  ${
                        backgroundType === "none" && "mb-10 lg:mb-[78px] "
                    }`}
                >
                    <span className="text-[#DDEC4C] font-semibold">
                        ¡ENVÍO GRATIS
                    </span>{" "}
                    A TODO LIMA METROPOLITANA!
                </div>
            )}

            <div
                className={`w-full max-w-full relative ${backgroundHeight} overflow-clip `}
            >
                {/* Fondo dinámico (imagen, video o nada) */}
                {backgroundType === "image" && (
                    <img
                        src={backgroundSrc}
                        className={`absolute -z-10 inset-0 w-screen h-full  object-cover ${backgroundPosition}`}
                        alt="Background"
                    />
                )}
                {backgroundType === "video" && (
                    <video
                        className={`absolute -z-10 inset-0  w-screen h-full  object-cover ${backgroundPosition}`}
                        autoPlay
                        loop
                        muted
                        playsInline // <- Atributo crucial para iOS
                        preload="auto"
                        disablePictureInPicture
                        disableRemotePlayback
                        webkit-playsinline="true" // <- Fallback para versiones antiguas
                    >
                        <source src={backgroundSrc} type="video/mp4" />
                    </video>
                )}

                {/* Capa de color si hay fondo */}
                {(backgroundType === "image" || backgroundType === "video") && (
                    <div
                        className="absolute inset-0 "
                        style={{
                            background:
                                "linear-gradient(180deg, rgba(95, 72, 183, 0.75) 6.08%, rgba(96, 72, 183, 0.525) 100%)",
                        }}
                    ></div>
                )}
                <header
                    className={`font-poppins fixed lg:w-full top-0 overflow-hidden z-40 transition-colors duration-300 ${
                        backgroundType === "none"
                            ? "bg-[#5339B1] mt-12 "
                            : isScrolled
                            ? "bg-[#5339B1]  pt-0 !mt-0 "
                            : "bg-transparent top-4 pt-8 md:pt-14 lg:pt-10"
                    } ${
                        isScrolled &&
                        "bg-[#5339B1]  pt-0 !mt-0 transition-all duration-150 "
                    }`}
                >
                    <div
                        className={`px-[5%] w-screen py-4 lg:py-0 lg:max-w-7xl 2xl:max-w-[92rem] mx-auto flex  justify-between items-center text-white shadow-lg lg:shadow-none `}
                    >
                        <div className="flex items-center w-full  lg:hidden">
                            <button
                                ref={btnToggleRef}
                                onClick={toggleMenu}
                                className="text-white pr-4 md:pr-6 menu-toggle "
                                aria-label="Toggle menu"
                            >
                                <i
                                    className={`fas ${
                                        isOpen ? "fa-times" : "fa-bars"
                                    } text-lg md:text-2xl`}
                                ></i>
                            </button>
                            <a href="/">
                                <img
                                    src="/assets/img/logo.png"
                                    alt="WeFem Logo"
                                    className="h-[20px] w-[120.55px] md:h-[36.8px] md:w-[210.55px] object-cover object-top"
                                />
                            </a>
                        </div>
                        <div className="hidden lg:flex py-6 mx-auto w-full justify-between items-center font-normal text-[16px] leading-[18.55px] tracking-widest">
                            <nav className="flex gap-6 ">
                                <a href="/catalog">Tienda</a>
                                <a href="/instructions">¿Cómo usar?</a>
                                <a href="/about">Nosotrxs</a>
                                <a href="/quiz">Quiz</a>
                            </nav>
                            <a href="/" className="flex justify-start">
                                <img
                                    src="/assets/img/logo.png"
                                    alt="Wefem"
                                    className="h-[38px] w-[230.55px] object-cover object-top"
                                    style={{
                                        textShadow:
                                            "0px 4px 7.5px 0px #00000040",
                                    }}
                                />
                            </a>
                            <div className="flex space-x-4 text-[21.93px] items-center">
                                <span className="text-[16px]">Escríbenos</span>
                                {WhatsApp && (
                                    <a
                                        href={WhatsApp.link}
                                        target="_blank"
                                        className="flex justify-center items-center cursor-pointer"
                                    >
                                        <i className="fa-brands fa-whatsapp"></i>
                                    </a>
                                )}
                                {Instagram && (
                                    <a
                                        href={Instagram.link}
                                        target="_blank"
                                        className="flex justify-center items-center"
                                    >
                                        <i className="fa-brands fa-instagram"></i>
                                    </a>
                                )}
                                {Facebook && (
                                    <a
                                        href={Facebook.link}
                                        target="_blank"
                                        className="flex justify-center items-center"
                                    >
                                        <i className="fa-brands fa-facebook"></i>
                                    </a>
                                )}

                                {TikTok && (
                                    <a href={TikTok.link} target="_blank">
                                        <i className="fa-brands fa-tiktok"></i>
                                    </a>
                                )}

                                <button
                                    onClick={() =>
                                        setMostrarCarrito(!mostrarCarrito)
                                    }
                                    className="relative"
                                >
                                    <i className="fas fa-shopping-cart"></i>
                                    <span
                                        className={`absolute -top-1 -right-1 bg-[#FF9900] text-white rounded-full w-3 h-3 flex items-center justify-center text-[10px] font-medium transition-transform ${
                                            animar ? "scale-150" : "scale-100"
                                        }`}
                                        style={{
                                            transition:
                                                "transform 0.3s ease-in-out",
                                        }}
                                    >
                                        {totalProductos}
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div className=" lg:hidden text-base">
                            <div className="flex items-center gap-4">
                                <a href="/quiz">Quiz</a>
                                {WhatsApp && (
                                    <a
                                        href={WhatsApp.link}
                                        target="_blank"
                                        className="flex justify-center items-center cursor-pointer"
                                    >
                                        <i className="fa-brands fa-whatsapp"></i>
                                    </a>
                                )}
                                <button
                                    onClick={() =>
                                        setMostrarCarrito(!mostrarCarrito)
                                    }
                                    className="relative"
                                >
                                    <i className="fas fa-shopping-cart"></i>
                                    <span
                                        className={`absolute -top-1 -right-1 bg-[#FF9900] text-white rounded-full w-3 h-3 flex items-center justify-center text-[7px] font-medium transition-transform ${
                                            animar ? "scale-150" : "scale-100"
                                        }`}
                                        style={{
                                            transition:
                                                "transform 0.3s ease-in-out",
                                        }}
                                    >
                                        {totalProductos}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {WhatsApp && (
                        <div className="flex justify-end w-full mx-auto z-[100] relative  ">
                            <div className="fixed bottom-3 right-2 md:bottom-[1rem] lg:bottom-[2rem] lg:right-3 z-20 cursor-pointer">
                                <a
                                    target="_blank"
                                    id="whatsapp-toggle"
                                    href={WhatsApp.link}
                                >
                                    <img
                                        src="/assets/img/whatsapp.svg"
                                        alt="whatsapp"
                                        className="mr-3 w-16 h-16 md:w-[80px] md:h-[80px]  animate-bounce duration-300"
                                    />
                                </a>
                            </div>
                        </div>
                    )}
                </header>
                <div
                    ref={menuRef}
                    className={`fixed   md:top-20 inset-0 text-white z-[999] transform ${
                        isOpen ? "opacity-1 block " : "hidden opacity-0 "
                    } ${
                        isScrolled
                            ? "top-[3.75rem] bg-[#5339B1]"
                            : "top-24 bg-[#5339B1]"
                    } transition-transform duration-300 ease-in-out p-[5%] h-max overflow-y-auto `}
                >
                    <ul className="flex flex-col gap-4 items-center justify-center">
                        <li>
                            <a href="/catalog">Tienda</a>
                        </li>
                        <li>
                            <a href="/instructions">¿Cómo usar?</a>
                        </li>
                        <li>
                            <a href="/about">Nosotrxs</a>
                        </li>
                        <li>
                            <a href="/quiz">Quiz</a>
                        </li>
                    </ul>
                </div>

                {/* Contenido dinámico */}
                {children && (
                    <div className="absolute inset-0 flex items-center justify-center text-center text-white p-6">
                        {children}
                    </div>
                )}
                {/*Modal Carrito*/}
                {mostrarCarrito && (
                    <>
                        <div className="fixed inset-0 bg-black/50 flex items-start justify-end px-[5%] lg:px-0 pt-12 pb-12 overflow-y-auto z-50 scrollbar-hide">
                            <div className="bg-[#EFE5FF] shadow-lg w-full sm:max-w-[380px] lg:max-w-[500px]  h-max    p-8 lg:p-14 rounded-[30px]  lg:rounded-[50px] ">
                                {/* Encabezado */}
                                <div className="flex justify-between items-center  ">
                                    <h2 className="text-2xl font-bold">
                                        Tu Carrito
                                    </h2>
                                    <button
                                        onClick={() => setMostrarCarrito(false)}
                                        className="text-lg font-bold text-[#5F48B7]"
                                    >
                                        ✖
                                    </button>
                                </div>
                                <div className="bg-[#9C79D4] py-2 text-lg mt-4 mb-8 text-center rounded-[14px]  lg:rounded-[20px]  text-white">
                                    ¡Tienes envío gratis en LIMA!{" "}
                                    <img
                                        src="/assets/img/emojis/motor-scooter.png"
                                        className="h-[16.88px] lg:h-[26.88px] inline-flex ml-2"
                                    />{" "}
                                </div>

                                {/* Lista de productos con Scroll */}
                                <div className="flex-1  gap-4">
                                    {carrito.length === 0 ? (
                                        <div className="w-full flex flex-col items-center justify-center gap-5 text-3xl h-max my-5">
                                            <img
                                                src="/assets/img/logo.png"
                                                alt="Wefem"
                                                className="h-[58px] w-[330.55px] object-cover object-top"
                                                style={{
                                                    textShadow:
                                                        "0px 4px 7.5px 0px #00000040",
                                                }}
                                            />
                                            <p className="text-center text-gray-500 ">
                                                Tu carrito está vacío
                                            </p>
                                        </div>
                                    ) : (
                                        carrito.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-4  mb-4 w-full"
                                            >
                                                <img
                                                    src={`/api/items/media/${item.image}`}
                                                    alt={item.name}
                                                    onError={(e) =>
                                                        (e.target.src =
                                                            "/api/cover/thumbnail/null")
                                                    }
                                                    className="w-20 h-20 md:w-28 md:h-28  object-cover"
                                                />
                                                <div className=" flex flex-col w-[calc(100%-5rem)] md:w-[calc(100%-7rem)] ">
                                                    <div className="w-full flex">
                                                        <div className="w-5/6 lg:w-8/12">
                                                            <h3 className="text-2xl  font-normal leading-3 md:leading-[20.78px] ">
                                                                {item.name}
                                                            </h3>
                                                            {item.summary && (
                                                                <p className="text-[10px] md:text-xs    font-light inline-flex truncate">
                                                                    (
                                                                    {
                                                                        item.summary
                                                                    }
                                                                    )
                                                                </p>
                                                            )}

                                                            {item.discount && (
                                                                <p className="w-11/12 md:w-full h-[18.55px]   md:h-[25.55px]    bg-[#212529]  text-white rounded-[5.44px] my-1 flex items-center justify-center text-[8.65px] md:text-[9.65px]  font-semibold   leading-[21.75px]">
                                                                    <span className="font-medium md:font-bold text-[7.65px] md:text-[9.65px]  mr-2 ">
                                                                        ESTAS
                                                                        AHORRANDO
                                                                    </span>{" "}
                                                                    S/{" "}
                                                                    {Number(
                                                                        item.price -
                                                                            item.discount
                                                                    ).toFixed(
                                                                        0
                                                                    )}{" "}
                                                                    <img
                                                                        src="/assets/img/emojis/fire.png"
                                                                        className="h-[9.88px]  inline-flex ml-2"
                                                                    />
                                                                </p>
                                                            )}
                                                        </div>

                                                        {/* 🗑️ Botón para eliminar */}
                                                        <div className="w-1/6 lg:w-4/12 flex items-start justify-end">
                                                            <button
                                                                className="group text-white px-2 py-1 rounded-md hover:fill-red-500 transition-all duration-300"
                                                                onClick={() =>
                                                                    eliminarProducto(
                                                                        item.id
                                                                    )
                                                                }
                                                            >
                                                                <div className="h-10 lg:h-12 scale-x-[-1] ">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 448 512"
                                                                        className="h-full w-4 lg:w-5 relative"
                                                                        fill="current"
                                                                    >
                                                                        <path
                                                                            className="group-hover:-rotate-12 group-hover:absolute group-hover:inset-0 "
                                                                            fill="current"
                                                                            d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3z"
                                                                        />

                                                                        <path
                                                                            fill="current"
                                                                            d="M32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="w-full flex">
                                                        <div className="w-1/2  md:w-4/6 lg:w-1/2  flex  ">
                                                            <p className="text-xl  items-center   font-bold text-[#5F48B7] ">
                                                                S/{" "}
                                                                {Number(
                                                                    item.final_price
                                                                ).toFixed(2)}
                                                            </p>
                                                        </div>
                                                        <div className="w-1/2  md:w-2/6 lg:w-1/2 h-8 ">
                                                            <div className=" flex h-full text-[#000000]  bg-transparent border border-black items-center justify-around  rounded-[8px]  md:rounded-[10px] ">
                                                                <button
                                                                    className="w-6 h-6 text-xs md:text-base  "
                                                                    onClick={() =>
                                                                        decrementarCantidad(
                                                                            item.id
                                                                        )
                                                                    }
                                                                >
                                                                    -
                                                                </button>
                                                                <span className="h-full flex items-center text-xs md:text-base  font-medium">
                                                                    {item.variations &&
                                                                    item
                                                                        .variations
                                                                        .length >
                                                                        0
                                                                        ? item.variations.reduce(
                                                                              (
                                                                                  sum,
                                                                                  v
                                                                              ) =>
                                                                                  sum +
                                                                                  v.quantity,
                                                                              0
                                                                          )
                                                                        : item.quantity}
                                                                </span>
                                                                <button
                                                                    className="w-6 h-6 text-xs md:text-base   "
                                                                    onClick={() =>
                                                                        incrementarCantidad(
                                                                            item.id
                                                                        )
                                                                    }
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                                {/* Total y botón de Checkout */}
                                {totalPrecio > 0 && (
                                    <div className="  w-full mt-8">
                                        <div className="w-full flex items-center justify-between my-6">
                                            <p className="text-2xl font-bold text-black ">
                                                Subtotal
                                            </p>
                                            <p className="text-2xl font-bold text-black ">
                                                S/ {totalPrecio.toFixed(2)}
                                            </p>
                                        </div>

                                        <a
                                            href="/checkout"
                                            className=" block text-center text-xl w-full  font-semibold rounded-[12.11px] lg:rounded-[15.11px] bg-[#FF9900] text-white py-3 hover:bg-opacity-90 hover:scale-105 transition-all duration-300"
                                        >
                                            IR A COMPRAR
                                        </a>

                                        <div className="mt-6 relative w-full">
                                            <img
                                                src="/assets/img/checkout/banner-pagos.png"
                                                className="w-full object-cover h-auto rounded-lg shadow-lg shadow-gray-500/20      "
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Header;
