import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Base from "./Components/Tailwind/Base";
import CreateReactScript from "./Utils/CreateReactScript";

import Banner from "./Components/Home/Banner";
import Highlights from "./Components/Home/Highlights";
import HowItWorks from "./Components/Home/HowItWorks";
import Routine from "./Components/Home/Routine";
import Highlights2 from "./Components/Home/Highlights2";
import Supplies from "./Components/Home/Supplies";
import Testimonies from "./Components/Home/Testimonies";
import CallToAction from "./Components/Home/CallToAction";
import Popups from "./Components/Home/Popups";
import Header from "./components/Tailwind/Header";
import FeaturesSection from "./components/Tailwind/Welcome/FeaturesSection";
import BenefitsSection from "./components/Tailwind/Welcome/BenefitsSection";
import ProductCarousel from "./components/Tailwind/Products/ProductCarousel";
import QuizSection from "./components/Tailwind/Welcome/QuizSection";
import TopSaleSection from "./components/Tailwind/Welcome/TopSaleSection";
import GuaranteeSection from "./components/Tailwind/Welcome/GuaranteeSection";
import WeLoversSection from "./components/Tailwind/Welcome/WeLoversSections";
import NotSureSection from "./components/Tailwind/Welcome/NotSureSection";
import InstagramSection from "./components/Tailwind/Welcome/InstagramSection";
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
    items,
    supplies,
    testimonies,
    popups,
    top_sale,
    showSlogan = true,

    we_lovers,
    products_featured,
    new_product,
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

                <CategoriesSection />

                <ServiceTecnical />

                <Marcas />
                
                <ContactSection />

                <SectoresClientes />

                <Customer />

                <Footer />
                
                {/*
                --Wefem--
                <FeaturesSection />
                <BenefitsSection />
                <ProductCarousel products={products_featured}>
                    <h2 className="font-poppins text-lg md:text-3xl 2xl:text-4xl font-bold flex gap-2 md:gap-4 items-center justify-center">
                        <img
                            src="/assets/img/emojis/growing-heart.png"
                            className="h-4 md:h-8 lg:h-9"
                        />{" "}
                        Preferidos por nosotrxs{" "}
                        <img
                            src="/assets/img/emojis/growing-heart.png"
                            className="h-4 md:h-8 lg:h-9"
                        />
                    </h2>
                    <p className="font-poppins text-[13.3px] md:text-[19.3px] leading-[19.77px] lg:mt-4">
                        ¿Estás listx para el cambio?
                    </p>
                </ProductCarousel>
                <QuizSection />
                <TopSaleSection producto={top_sale} />
                <GuaranteeSection />
                <WeLoversSection we_lovers={we_lovers} />
                <NotSureSection producto={new_product} />   
                <InstagramSection posts={posts} />

                --Vua--
                <Banner sliders={sliders} />
                <hr className="h-4 bg-transparent border-none" />
                <Highlights />
                <HowItWorks />
                <Routine items={items} />
                <Highlights2 />
                <Supplies supplies={supplies} />
                <Testimonies testimonies={testimonies} />
                <CallToAction />
                <Popups popups={popups} />
               */}

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
