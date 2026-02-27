import { useEffect, useState, useRef, useContext } from "react";
import GeneralRest from "../../../actions/GeneralRest";
import Marquesina from "./Marquesina";
import { LoadingContext } from "../Base";

const generalRest = new GeneralRest();

const Marcas = ({ brands, apiFolder }) => {

    const [aboutuses, setAboutuses] = useState(null);
    const { registerTask, completeTask } = useContext(LoadingContext);  

    useEffect(() => {
        registerTask("BrandSection");
        const fetchAboutuses = async () => {
            try {
                const data = await generalRest.getAboutuses();
                setAboutuses(data);
            } catch (error) {
                console.error("Error fetching about:", error);
            } finally {
                completeTask("BrandSection");
            }
        };

        fetchAboutuses();
    }, [registerTask, completeTask]);

    const aboutusData = aboutuses?.aboutus || [];

    const nineSection = aboutusData.find(
        (item) => item.correlative === "home-brands-section"
    );
    
    return (

        <div className="relative overflow-hidden">
            {!!nineSection?.visible && (
                <div className="relative bg-[#0b0b0b] w-full px-[5%] 4xl:px-[8%] gap-10 xl:gap-16 flex flex-col items-center py-10">
                        <div className="w-full flex flex-col items-center justify-center gap-5 max-w-2xl 4xl:max-w-3xl text-center">
                            <h3 className="font-dmsans text-white text-lg 2xl:text-xl 4xl:text-2xl tracking-normal font-light">
                                {nineSection?.subtitle}
                            </h3>
                            <h2 className="font-sora text-white text-3xl sm:text-4xl 2xl:text-5xl 4xl:text-6xl font-semibold tracking-tight !leading-tight">
                                {nineSection?.name}
                            </h2>
                        </div>
                </div>
            )} 

            <Marquesina brands={brands} apiFolder={apiFolder} />

        </div>
    );
};

export default Marcas;
