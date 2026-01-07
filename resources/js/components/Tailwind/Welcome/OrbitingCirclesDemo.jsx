import React, { useState, useEffect } from "react";
import { OrbitingCircles } from "../Components/OrbitingCircles";

export function OrbitingCirclesDemo() {
  
  const [radius, setRadius] = useState({ outer: 200, inner: 100 });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        // Móvil
        setRadius({ outer: 140, inner: 70 });
      } else if (width < 1024) {
        // Tablet
        setRadius({ outer: 180, inner: 80 });
      } else {
        // Desktop
        setRadius({ outer: 200, inner: 100 });
      }
    };

    
    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative flex h-[350px] 2xs:h-[375px] md:h-[400px] lg:h-[425px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
      
      {/* Círculo Exterior */}
      <OrbitingCircles duration={20} radius={radius.outer}>
        <h2 className="text-center font-sora text-black text-xs 2xs:text-sm md:text-base 4xl:text-lg font-semibold">Fabricas</h2>
        <h2 className="text-center font-sora text-black text-xs 2xs:text-sm md:text-base 4xl:text-lg font-semibold">Minería</h2>
        <h2 className="text-center font-sora text-black text-xs 2xs:text-sm md:text-base 4xl:text-lg font-semibold">Colegios</h2>
        <h2 className="text-center font-sora text-black text-xs 2xs:text-sm md:text-base 4xl:text-lg font-semibold">Hoteles</h2>
        <h2 className="text-center font-sora text-black text-xs 2xs:text-sm md:text-base 4xl:text-lg font-semibold">Residencias</h2>
        <h2 className="text-center font-sora text-black text-xs 2xs:text-sm md:text-base 4xl:text-lg font-semibold">Edificios</h2>
      </OrbitingCircles>

      {/* Círculo Interior */}
      <OrbitingCircles radius={radius.inner} reverse speed={1}>
        <h2 className="text-center font-sora text-black text-xs 2xs:text-sm md:text-base 4xl:text-lg font-semibold">Gobierno</h2>
        <h2 className="text-center font-sora text-black text-xs 2xs:text-sm md:text-base 4xl:text-lg font-semibold">Empresas</h2>
        <h2 className="text-center font-sora text-black text-xs 2xs:text-sm md:text-base 4xl:text-lg font-semibold">Super</h2>
        <h2 className="text-center font-sora text-black text-xs 2xs:text-sm md:text-base 4xl:text-lg font-semibold">Oficinas</h2>
      </OrbitingCircles>
    </div>
  );
}