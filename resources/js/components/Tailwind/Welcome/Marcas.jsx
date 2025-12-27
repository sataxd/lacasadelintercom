import { useEffect, useState, useRef } from "react";
import GeneralRest from "../../../actions/GeneralRest";
import Marquesina from "./Marquesina";

const generalRest = new GeneralRest();

const Marcas = () => {
    const [Benefits, setBenefits] = useState(null);
    const [Toallas, setToallas] = useState(null);
    const [Soles, setSoles] = useState(null);
    
    const [activeImage, setActiveImage] = useState(1);
    const handleToggleImage = () => {
        setActiveImage(prev => prev === 1 ? 2 : 1);
    };

    useEffect(() => {
        // ... (Tu lógica de fetch se mantiene igual)
        const fetchBenefits = async () => {
            try {
                const data = await generalRest.getBenefits();
                setBenefits(data);
            } catch (error) {
                console.error("Error fetching benefits:", error);
            }
        };
        fetchBenefits();
    }, []);
    
    return (

        <div className="relative overflow-hidden">
            <div className="relative bg-[#0b0b0b] w-full px-[5%] 4xl:px-[8%] gap-10 xl:gap-16 flex flex-col items-center py-10">
                    <div className="w-full flex flex-col items-center justify-center gap-5 max-w-2xl 4xl:max-w-3xl text-center">
                        <h3 className="font-dmsans text-white text-lg 2xl:text-xl 4xl:text-2xl tracking-wide font-light">
                            Las mejores marcas comerciales y de alta gama
                        </h3>
                        <h2 className="font-sora text-white text-3xl sm:text-4xl 2xl:text-5xl 4xl:text-6xl font-semibold tracking-tight !leading-tight">
                            Marcas con las que trabajamos
                        </h2>
                    </div>
            </div>
            <Marquesina />
        </div>
    );
};

export default Marcas;
