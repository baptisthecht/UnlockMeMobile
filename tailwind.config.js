/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        colors: {
            ciel: "#F4F7FE",
            blue: "#4318FF",
            marine: "#2B3674",
            gray: "#8F9BBA",
            glass: "#DAE3F7",
            white: "#FFFFFF",
            nuage: "#A3AED0",
            emeraude: "#05CD99",
            moutarde: "#FFCE20",
            sang: "#E31A1A",
        },
        fontFamily: {
            Gb: ["Gilroy_Bold"],
            Gr: ["Gilroy_Regular"],
            Gm: ["Gilroy_Medium"],
            Gl: ["Gilroy_Light"],
            Gt: ["Gilroy_Thin"],
            Gel: ["Gilroy_ExtraLight"],
            Gbl: ["Gilroy_Black"],
            Gh: ["Gilroy_Heavy"],
            Geb: ["Gilroy_ExtraBold"],
            Gsb: ["Gilroy_SemiBold"],
            Gul: ["Gilroy_UltraLight"],
            DM: "DM Sans",
        },
        extend: {},
    },
    plugins: [],
};
