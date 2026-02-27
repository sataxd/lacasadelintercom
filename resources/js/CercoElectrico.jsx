import React from "react";
import CreateReactScript from "./Utils/CreateReactScript";
import { createRoot } from "react-dom/client";
import Base from "./components/Tailwind/Base";
import Header from "./components/Tailwind/Header";
import { CarritoProvider } from "./context/CarritoContext";
import Footer from "./components/Tailwind/Footer";
import SectionElectrico from "./components/Tailwind/Services/SectionElectrico";
import Products from "./components/Tailwind/Services/Products";

const CercoElectrico = ({generals, brandsData, globalSubcategories, globalTags, showSlogan = true}) => {
  return <>

    <Header
        showSlogan={showSlogan}
    >
    </Header>

    <SectionElectrico />

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
                <CercoElectrico {...properties} />
            </Base>
        </CarritoProvider>
    );
});