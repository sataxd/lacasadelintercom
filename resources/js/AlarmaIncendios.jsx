import React from "react";
import CreateReactScript from "./Utils/CreateReactScript";
import { createRoot } from "react-dom/client";
import Base from "./components/Tailwind/Base";
import Header from "./components/Tailwind/Header";
import { CarritoProvider } from "./context/CarritoContext";
import Footer from "./components/Tailwind/Footer";
import SectionAlarmasIndencios from "./components/Tailwind/Services/SectionAlarmasIndencios";
import Products from "./components/Tailwind/Services/Products";




const AlarmaIncendios = ({generals, brandsData, globalSubcategories, globalTags, showSlogan = true}) => {
  return <>

    <Header
        showSlogan={showSlogan}
    >
    </Header>

    <SectionAlarmasIndencios />

    <div className="flex flex-col gap-10">
      {brandsData && brandsData.map((brandInfo, index) => (
        <Products 
           key={index} 
           brandData={brandInfo} 
           globalSubcategories={globalSubcategories} 
           globalTags={globalTags} 
        />
      ))}
    </div>
  
    <Footer />
   
  </>
}

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <AlarmaIncendios {...properties} />
            </Base>
        </CarritoProvider>
    );
});