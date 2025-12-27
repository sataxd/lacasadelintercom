import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';

const Slider = ({ items }) => {

  return (
    <div className="relative">
      <Swiper
        className="slider"
        modules={[Pagination]}
        slidesPerView={1}
        loop={true}
        grabCursor={true}
        centeredSlides={false}
        initialSlide={0}
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
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 1,
          },
        }}
      >
        {
          items.map((slider, i) => {
            return <SwiperSlide key={`slider-${i}`} className='relative'>
              
                {/* <img className='absolute top-0 left-0 w-full h-full object-cover object-center z-0' src={`/storage/images/slider/${slider.bg_image || 'undefined'}`} alt={slider.name} onError={e => e.target.src = '/api/cover/thumbnail/null'} /> */}
                
                <video
                    className={`absolute -z-10 inset-0  w-screen h-full  object-cover`}
                    autoPlay
                    loop
                    muted
                    playsInline // <- Atributo crucial para iOS
                    preload="auto"
                    disablePictureInPicture
                    disableRemotePlayback
                    webkit-playsinline="true"
                >
                    <source src={`/api/sliders/media/${slider?.image}`} type="video/mp4" />
                </video>

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
      <div className="absolute bottom-5 left-0 right-0 z-50 py-4">
        <div className="swiper-pagination-slider flex justify-center items-center"></div>
      </div>
    </div>
  );
};



export default Slider;