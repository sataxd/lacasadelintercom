import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { EffectCreative } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';
import 'swiper/css/effect-creative';

import SwiperGL from '../../lib/swiper-gl.esm.js';
import '../../lib/swiper-gl.css';


const ArrowLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);


const Slider = ({ items }) => {

  if (!items || items.length === 0) {
    return (
      <div className="w-full h-[520px] lg:h-[95vh] bg-neutral-900 animate-pulse flex items-center justify-center">
        {/* Un placeholder mientras cargan los datos de Laravel */}
      </div>
    );
  }

  const validItems = items.filter(item => item && (item.image || item.video));

  if (validItems.length === 0) return null;
  
  return (
    <div className="relative group">
      <Swiper
        className="slider relative"
        modules={[Pagination, SwiperGL, Autoplay, Navigation]}
        effect={'gl'}
        gl={{ shader: 'wind'}}
        onBeforeInit={(swiper) => {
            if (!swiper.params.gl) swiper.params.gl = {};
            swiper.params.gl.shader = 'squares';
        }}
        speed={2000}
        slidesPerView={1}
        loop={validItems.length > 1}
        grabCursor={true}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          el: ".swiper-pagination-slider",
          clickable: true,
          type: 'bullets',
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
      >
        {
          validItems.map((slider) => {

            const uniqueKey = slider.id || `slide-${slider.name}-${Math.random()}`;

            return <SwiperSlide key={uniqueKey} className='relative overflow-hidden'>
                
                {slider.esimagen == 1 ? (
                    /* CASO 1: Es Imagen */
                    <img
                        className='swiper-gl-image absolute top-0 left-0 w-full h-full object-cover object-center z-0'
                        src={`/api/sliders/media/${slider.image || 'undefined'}`}
                        alt={slider.name}
                        onError={(e) => (e.target.src = '/api/cover/thumbnail/null')}
                    />
                ) : (
                    /* CASO 2: Es Video (esimagen es 0) */
                    <video
                        className={`absolute top-0 left-0 w-full h-full object-cover object-center z-0`} // He ajustado las clases para que coincidan con la posición de la imagen
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        disablePictureInPicture
                        disableRemotePlayback
                    >
                        <source src={`/api/sliders/media/${slider?.video}`} type="video/mp4" />
                    </video>
                )}

                <div
                    className="absolute inset-0"
                    style={{
                            background:
                                "linear-gradient(180deg, rgba(20,20,20,1) 0%, rgba(0,0,0,0.1) 100%)",
                        }}
                ></div>

                <div className="relative grid grid-cols-1 lg:grid-cols-2  w-full px-[5%] p-4 h-[520px] lg:h-[95vh] 2xl:h-[90vh]">
                    <div className="flex flex-col col-span-1 lg:col-span-1  gap-5 2xl:gap-7 4xl:gap-10 items-start justify-center text-start">
                        <h2 className='font-sora text-white text-3xl sm:text-5xl 2xl:text-[52px] 4xl:text-6xl tracking-normal font-semibold !leading-[1.15]'>
                            {slider?.name}
                        </h2>
                        
                        <p className="font-dmsans text-white text-lg xl:text-xl 4xl:text-2xl tracking-wide font-light">
                            {slider?.description}
                        </p>
                        
                        <div className="flex flex-row mt-2">
                            <a href={slider?.button_link}
                                className="bg-accent font-dmsans border-[2px] border-accent customtext-neutral-light flex flex-row items-center px-3 md:px-6 py-2 text-base xl:text-lg 4xl:text-xl rounded-xl font-medium">
                                {slider?.button_text}
                            </a>
                        </div>
                    </div>
                </div>

            </SwiperSlide>
          })
        }
      </Swiper>

      {/* Flecha Izquierda */}
        <div className="custom-prev-button absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 cursor-pointer text-white hover:text-accent transition-colors duration-300">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/30 bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <ArrowLeft />
            </div>
        </div>

        {/* Flecha Derecha */}
        <div className="custom-next-button absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 cursor-pointer text-white hover:text-accent transition-colors duration-300">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/30 bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <ArrowRight />
            </div>
        </div>

      {/* <div className="absolute bottom-5 left-0 right-0 z-50 py-4">
        <div className="swiper-pagination-slider flex justify-center items-center"></div>
      </div> */}
    </div>
  );
};

export default Slider;