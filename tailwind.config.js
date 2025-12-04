/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.jsx",
        "./resources/**/*.vue",
    ],
    theme: {
        extend: {
            animation: {
                // Ajusté a 35s para que no sea tan rápido, puedes bajarlo a 25s si prefieres velocidad
                'infinite-scroll': 'infinite-scroll 30s linear infinite',
            },
            keyframes: {
                'infinite-scroll': {
                from: { transform: 'translateX(0)' },
                to: { transform: 'translateX(-50%)' },
                }
            },
            screens: {
                '3xl': '1600px',  // Pantallas ultra anchas
                '4xl': '1920px',  // Pantallas 1080p full width
            },
            fontFamily: {
                bebas: ["Bebas Neue", "serif"],
                poppins: ["Poppins", "serif"],
                dmsans: ["DM Sans", "serif"],
                sora: ["Sora", "serif"],
            },
            // Puedes agregar personalizaciones aquí si es necesario
        },
    },
    plugins: [
        require("tailwindcss-animated"),
        function ({ addUtilities }) {
            const newUtilities = {
                ".scrollbar-hide": {
                    /* IE and Edge */
                    "-ms-overflow-style": "none",

                    /* Firefox */
                    "scrollbar-width": "none",

                    /* Safari and Chrome */
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                },
                '.paused': {
                'animation-play-state': 'paused',
                },
            };

            addUtilities(newUtilities);
        },
        // Otros plugins si los tienes
    ],
};
