module.exports = {
    mode: "jit",
    content: [
      "./src/**/*.{js,ts,jsx,tsx,html,mdx}",
      "./src/**/**/*.{js,ts,jsx,tsx,html,mdx}",
    ],
    darkMode: "class",
    theme: {
      screens: {
        lg: { max: "1440px" },
        md: { max: "1050px" },
        sm: { max: "550px" },
      },
      extend: {
        colors: {
          black: {
            900: "var(--black_900)",
            "900_19": "var(--black_900_19)",
            "900_3f": "var(--black_900_3f)",
          },
          blue_gray: {
            100: "var(--blue_gray_100)",
            900: "var(--blue_gray_900)",
            "900_01": "var(--blue_gray_900_01)",
            "900_02": "var(--blue_gray_900_02)",
            "900_b2": "var(--blue_gray_900_b2)",
          },
          deep_purple: {
            500: "var(--deep_purple_500)",
          },
          gray: {
            500: "var(--gray_500)",
            600: "var(--gray_600)",
            700: "var(--gray_700)",
            800: "var(--gray_800)",
            "600_01": "var(--gray_600_01)",
            "600_02": "var(--gray_600_02)",
            "600_03": "var(--gray_600_03)",
            "700_01": "var(--gray_700_01)",
            "800_01": "var(--gray_800_01)",
            "800_02": "var(--gray_800_02)",
            "800_03": "var(--gray_800_03)",
            "800_04": "var(--gray_800_04)",
            "800_05": "var(--gray_800_05)",
            "800_06": "var(--gray_800_06)",
            "800_07": "var(--gray_800_07)",
            "900_27": "var(--gray_900_27)",
            "900_91": "var(--gray_900_91)",
          },
          green: {
            900: "var(--green_900)",
          },
          light_green: {
            100: "var(--light_green_100)",
          },
          lime: {
            50: "var(--lime_50)",
            100: "var(--lime_100)",
          },
          pink: {
            900: "var(--pink_900)",
          },
          red: {
            300: "var(--red_300)",
            900: "var(--red_900)",
            "900_01": "var(--red_900_01)",
            a700: "var(--red_a700)",
          },
          white: {
            A700: "var(--white_a700)",
          },
          yellow: {
            700: "var(--yellow_700)",
            800: "var(--yellow_800)",
          },
        },
        boxShadow: {
          bs6: "inset 0 0 100px 100px #00000019",
        },
        fontFamily: {
          playfairdisplay6: "Playfair Display",
          inter6: "Inter",
        },
      },
    },
    plugins: [require("@tailwindcss/forms")],
  };
  