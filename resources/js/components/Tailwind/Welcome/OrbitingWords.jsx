import React from 'react';
import { motion } from 'framer-motion';

const OrbitingSystem = () => {
  // Configuración de las palabras por órbita
  const orbits = [
    {
      id: "outer",
      radius: 220, // Distancia del centro
      duration: 25, // Velocidad de giro
      words: ["React", "Tailwind", "Framer", "Motion", "Logic", "Design"],
    },
    {
      id: "middle",
      radius: 140,
      duration: 20,
      words: ["Speed", "Power", "Style", "Flow"],
    },
    {
      id: "inner",
      radius: 70,
      duration: 15,
      words: ["Clean", "Core"],
    },
  ];

  return (
    <div className="relative flex items-center justify-center w-full h-[600px] bg-black overflow-hidden">
      
      {orbits.map((orbit) => (
        <React.Fragment key={orbit.id}>
          {/* Círculo visual de la órbita (Línea tenue) */}
          <div
            className="absolute border border-white/10 rounded-full"
            style={{
              width: orbit.radius * 2,
              height: orbit.radius * 2,
            }}
          />

          {/* Contenedor de rotación para las palabras */}
          {orbit.words.map((word, index) => {
            const angleStep = 360 / orbit.words.length;
            const currentAngle = index * angleStep;

            return (
              <motion.div
                key={word}
                className="absolute flex items-center justify-center"
                style={{
                  width: 150, // Espacio para el texto
                  height: 50,
                  left: `calc(50% - 75px)`, // Centrado horizontal
                  top: `calc(50% - 25px)`,  // Centrado vertical
                  // Desplazamos el origen para que rote en el radio de la órbita
                  transform: `rotate(${currentAngle}deg) translateY(-${orbit.radius}px)`,
                }}
                animate={{
                  rotate: [currentAngle, currentAngle + 360],
                }}
                transition={{
                  duration: orbit.duration,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {/* CONTRA-ROTACIÓN: 
                   Este div rota en sentido opuesto al padre para mantener el texto vertical 
                */}
                <motion.div
                  className="bg-zinc-900 border border-blue-500/40 text-blue-400 px-5 py-2 
                             rounded-lg text-xl font-bold whitespace-nowrap shadow-lg shadow-blue-500/10"
                  animate={{
                    rotate: [-currentAngle, -(currentAngle + 360)],
                  }}
                  transition={{
                    duration: orbit.duration,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {word}
                </motion.div>
              </motion.div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default OrbitingSystem;