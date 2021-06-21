import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
      blue: {
        50: "#dbf8ff",
        100: "#b3e5fb",
        200: "#88d1f4",
        300: "#5cbfee",
        400: "#31ade8",
        500: "#1793ce",
        600: "#0873a1",
        700: "#005275",
        800: "#003249",
        900: "#00121e"
      },
      gray: {
        50: "#f2f2f2",
        100: "#d9d9d9",
        200: "#bfbfbf",
        300: "#a6a6a6",
        400: "#8c8c8c",
        500: "#737373",
        600: "#595959",
        700: "#404040",
        800: "#262626",
        900: "#0d0d0d"
      }
    },
    fonts: {
      heading: "Roboto",
      body: "Roboto",
    },
  });

  export default theme