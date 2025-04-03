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
import Footer from "./components/Tailwind/Footer";
import { CarritoContext, CarritoProvider } from "./context/CarritoContext";
import ItemsRest from "./actions/ItemRest";

const Home = ({
    slider,
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
    const tipoSlider = "vua";
    console.log(products_featured);
    return (
        <div className=" ">
            <Header
                showSlogan={showSlogan}
                backgroundType="video"
                backgroundSrc={
                    slider
                        ? `/api/sliders/media/${slider?.image}`
                        : "/assets/img/backgrounds/home.mp4"
                }
                backgroundHeight="h-[320px] lg:h-[85vh] 2xl:h-[90vh]"
            >
                <div className="absolute inset-0 flex items-center justify-center text-center pt-12 lg:pt-24">
                    <div className="text-white p-6">
                        <h1 className="text-[29.66px] pt-0 md:pt-0  leading-[100%] tracking-[1.5%] md:text-[58.54px] xl:text-[58.54px]  2xl:text-[81.54px] md:leading-[60.81px] xl:leading-[60.81px] 2xl:leading-[90.81px] font-bold max-w-4xl ">
                            ¡Tener sexo con
                            <br /> tu disco es posible!
                        </h1>
                        <p className="text-[11.13px] mt-0 md:mt-4 lg:mt-0 leading-[100%]  md:text-[20.61px] 2xl:text-[26.61px] md:leading-[36.92px]  my-1 tracking-[1%]">
                            Copas y Discos menstruales weFem
                        </p>
                        <button className="mt-0 w-[150.19px] h-[30.67px] md:w-[258.19px] md:h-[55.67px] xl:w-[300px]  2xl:w-[371px] xl:h-[70px] 2xl:h-[80px] bg-[#DDEC4C] text-[11.15px]  md:text-[17.15px] xl:text-[20.64px] 2xl:text-[24.64px] hover:brightness-90 transition duration-300  font-semibold rounded-[5.91px]  md:rounded-[13.91px] text-[#5F48B7] tracking-[1%]">
                            ¡Realiza el cambio!
                        </button>
                    </div>
                </div>
            </Header>
            <div className="relative z-10">
                <FeaturesSection />
                <BenefitsSection />
                <div className="h-[30px] lg:h-0"></div>
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
                <Footer />
                {/*
               
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
