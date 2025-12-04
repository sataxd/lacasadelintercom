import React from 'react';

// Datos de ejemplo (reemplaza con tus rutas reales)
const logos = [
  { id: 1, src: '/assets/img/logo_1.jpg', alt: 'Logo 1' },
  { id: 2, src: '/assets/img/logo_2.png', alt: 'Logo 2' },
  { id: 3, src: '/assets/img/logo_3.png', alt: 'Logo 3' },
  { id: 4, src: '/assets/img/logo_4.png', alt: 'Logo 4' },
  { id: 5, src: '/assets/img/logo_5.png', alt: 'Logo 5' },
  { id: 6, src: '/assets/img/logo_6.png', alt: 'Logo 6' },
  { id: 7, src: '/assets/img/logo_7.jpg', alt: 'Logo 6' },
  { id: 8, src: '/assets/img/logo_8.jpg', alt: 'Logo 6' },
  { id: 9, src: '/assets/img/logo_9.png', alt: 'Logo 6' },
  { id: 9, src: '/assets/img/logo_11.png', alt: 'Logo 6' },
  { id: 9, src: '/assets/img/logo_12.png', alt: 'Logo 6' },
];

const Marquesina = () => {
  return (
    <div className="w-full py-5 bg-white flex justify-center overflow-hidden">
      
      <div 
        className="
          relative
          w-full px-[5%] 
          flex flex-nowrap [mask-image:linear-gradient(to_right,transparent,white_128px,white_calc(100%-128px),transparent)]
        "
      >
        <div className="flex items-center animate-infinite-scroll hover:[animation-play-state:paused]">
          
          <div className="flex items-center gap-16 px-8">
            {logos.map((logo) => (
              <img 
                key={logo.id}
                className="object-contain h-20 w-24 max-w-none grayscale hover:grayscale-0 transition-all duration-300" 
                src={logo.src} 
                alt={logo.alt} 
              />
            ))}
          </div>

          <div className="flex items-center gap-16 px-8" aria-hidden="true">
             {logos.map((logo) => (
              <img 
                key={`${logo.id}-clone`}
                className="object-contain h-20 w-24 max-w-none grayscale hover:grayscale-0 transition-all duration-300" 
                src={logo.src} 
                alt={logo.alt} 
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Marquesina;