import React, { useContext, useEffect } from "react";
import CreateReactScript from "./Utils/CreateReactScript";
import { createRoot } from "react-dom/client";
import Base from "./Components/Tailwind/Base";
import { Local } from "sode-extend-react";
import { CarritoContext, CarritoProvider } from "./context/CarritoContext";
import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";
const Thanks = ({ session }) => {
    useEffect(() => {
        history.replaceState(null, "", "/thanks");
        //Local.delete('vua_cart');
        //Local.delete('vua_test');
        //localStorage.removeItem("carrito");
        localStorage.clear();
        localStorage.setItem("carrito", []);
    }, [null]);
    localStorage.clear();
    localStorage.setItem("carrito", []);

    const { vaciarCarrito } = useContext(CarritoContext);
    vaciarCarrito();
    return (
        <>
            <Header showSlogan={true} backgroundHeight="h-0" />
            <div>
                <section
                    className="min-h-screen px-[3%] lg:px-[10%] py-[10%] md:py-[7.5%] lg:py-[5%] bg-[#F9F3EF] text-center"
                    style={{
                        backgroundImage:
                            "url('/assets/img/about/bg-about.png')",
                        backgroundPosition: "top",
                        backgroundSize: "cover", // Cambiado a "cover" para llenar todo el espacio
                        backgroundRepeat: "no-repeat",
                        width: "100%", // Cambiado de 100vw a 100% para evitar scroll horizontal
                        height: "200vh", // Asegura que ocupe toda la altura de la pantalla
                        position: "relative", // Añadido para mejor manejo de elementos hijos
                    }}
                >
                    <div className="max-w-4xl mx-auto text-white">
                        <h1 className="text-3xl lg:text-[62.25px] tracking-[-0.25px] leading-[74.22px]">
                            <b>¡Ya eres parte de la revolución menstrual! </b>
                            <img
                                src="/assets/img/emojis/drop-of-blood.png"
                                alt="blood"
                                className="inline-flex h-6 w-6 align-middle"
                            />
                        </h1>
                        <p className="mt-4 text-[28.67px] font-light max-w-4xl mx-auto ">
                            Estamos segurxs que tu producto weFem se convertirá
                            en tu mejor aliada y será solo el inicio de tu
                            libertad menstrual. La tendrás en tus manos en un
                            rango de 2 a 4 días hábiles.
                        </p>
                    </div>
                    {/*session?.id && (
                        <button
                            href="/my-account"
                            className="mt-[15%] md:mt-[10%] lg:mt-[5%] bg-[#C5B8D4] text-white text-sm px-8 py-3 rounded border border-white w-max  text-nowrap"
                        >
                            MIS FÓRMULAS
                            <i className="ms-1 mdi mdi-arrow-top-right"></i>
                        </button>
                    )*/}
                </section>
            </div>
            <Footer />
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <Thanks {...properties} />
            </Base>
        </CarritoProvider>
    );
});
