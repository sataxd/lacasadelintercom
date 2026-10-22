import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import Base from "./components/Tailwind/Base";
import CreateReactScript from "./Utils/CreateReactScript";
import { CarritoProvider } from "./context/CarritoContext";
import AboutSection from "./components/Tailwind/Welcome/AboutSection";
import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";

import {
    FaGraduationCap,
    FaLightbulb,
    FaSeedling,
    FaVenus,
    FaShieldAlt,
} from "react-icons/fa";



const About = ({showSlogan = true, dataAbout}) => {
    
    return (
        <>
           
            <Header
                showSlogan={showSlogan}
            >
            </Header>    

              
            <AboutSection dataAbout={dataAbout} />
            
            
            <Footer />
          
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <About {...properties} />
            </Base>
        </CarritoProvider>
    );
});
