import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Base from "./components/Tailwind/Base";
import CreateReactScript from "./Utils/CreateReactScript";
import Popups from "./Components/Home/Popups";
import Header from "./components/Tailwind/Header";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';
import Footer from "./components/Tailwind/Footer";
import { CarritoContext, CarritoProvider } from "./context/CarritoContext";
import ItemsRest from "./actions/ItemRest";
import Slider from "./components/Home/Slider";
import AboutSection from "./components/Tailwind/Welcome/AboutSection";
import CategoriesSection from "./components/Tailwind/Welcome/CategoriesSection";
import ServiceTecnical from "./components/Tailwind/Welcome/ServiceTecnical";
import Marquesina from "./components/Tailwind/Welcome/Marquesina";
import Marcas from "./components/Tailwind/Welcome/Marcas";
import Customer from "./components/Tailwind/Welcome/Customer";
import ContactSection from "./components/Tailwind/Welcome/ContactSection";
import SectoresClientes from "./components/Tailwind/Welcome/SectoresClientes.jsx";


const Home = ({
    sliders,
    category,
    brands,
    strengthout,
    strengthin,
    clientes,
    indicadores,
    items,
    supplies,
    testimonies,
    popups,
    top_sale,
    showSlogan = true,
    posts,
}) => {
    
    return (
        <div className=" ">
            <Header
                showSlogan={showSlogan}
                backgroundType="video"
                backgroundHeight="h-[520px] lg:h-[95vh] 2xl:h-[90vh]"
            >
                <div className="absolute inset-0 items-center justify-center text-center h-full">
                    <Slider items={sliders} />
                </div>
            </Header>

            <div className="relative z-10">
                
                <AboutSection />

                <CategoriesSection category={category} />

                <ServiceTecnical />

                <Marcas brands={brands} apiFolder='core_value' />
                
                <ContactSection />

                <SectoresClientes strengthin={strengthin} strengthout={strengthout} indicadores={indicadores}/>

                <Customer brands={clientes} apiFolder='instagram_post'/>

                <Footer />

            </div>
        </div>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <Home {...properties} />
            </Base>
        </CarritoProvider>
    );
});
