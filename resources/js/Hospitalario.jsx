import React from "react";
import CreateReactScript from "./Utils/CreateReactScript";
import { createRoot } from "react-dom/client";
import Base from "./components/Tailwind/Base";
import Header from "./components/Tailwind/Header";
import { CarritoProvider } from "./context/CarritoContext";
import Footer from "./components/Tailwind/Footer";
import SectionHospitalario from "./components/Tailwind/Services/SectionHospitalario";
import Products from "./components/Tailwind/Services/Products";

const Hospitalario = ({generals, brandsData, globalSubcategories, globalTags, showSlogan = true}) => {
  return <>

    <Header
        showSlogan={showSlogan}
    >
    </Header>

    <SectionHospitalario />

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
                <Hospitalario {...properties} />
            </Base>
        </CarritoProvider>
    );
});