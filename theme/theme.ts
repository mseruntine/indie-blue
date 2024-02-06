import { defineStyleConfig, extendTheme } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import { menuTheme } from "./menuTheme";

export const inter = Inter({ subsets: ["latin"]});


const appTheme = extendTheme({
    fonts: {
        body: "var(--font-inter)",
        heading: "var(--font-inter)",
    },
    colors: {
        primary: {
            50: "#f0f4fd",
            100: "#e4eafb",
            200: "#cfd9f6",
            300: "#b1c0f0",
            400: "#929fe7",
            500: "#777fdd",
            600: "#5c5ccf",
            700: "#4f4db5",
            800: "#3c3c89",
            DEFAULT: "#3c3c89",
            900: "#3a3c75",
            950: "#222244",
        },
        secondary: {
            50: "#f5f3ff",
            100: "#ede8ff",
            200: "#dcd5ff",
            300: "#cec2ff",
            400: "#a488fd",
            500: "#8758fa",
            600: "#7935f2",
            DEFAULT: "#7935f2",
            700: "#6a23de",
            800: "#581dba",
            900: "#4a1a98",
            950: "#2c0e67",
        },
        tertiary: {
            50: "#fef2f3",
            100: "#fde6e9",
            200: "#f9d2d7",
            300: "#f5acb7",
            400: "#ee7e91",
            500: "#e3506d",
            600: "#ca2e55",
            DEFAULT: "#ca2e55",
            700: "#ae2248",
            800: "#921f43",
            900: "#7d1e3e",
            950: "#450c1e",
        },
    },
    semanticTokens: {
        colors: {
            "chakra-body-text": { _light: "gray.100", _dark: "gray.100" },
			"chakra-body-bg": { _light: "primary.950", _dark: "primary.950" },
			"chakra-border-color": { _light: "whiteAlpha.300", _dark: "whiteAlpha.300" },
			"chakra-inverse-text": { _light: "gray.800", _dark: "gray.800" },
			"chakra-subtle-bg": { _light: "gray.900", _dark: "gray.900" },
			"chakra-subtle-text": { _light: "gray.300", _dark: "gray.300" },
			"chakra-placeholder-color": {
				_light: "whiteAlpha.400",
				_dark: "whiteAlpha.400",
			},
			"background": {
				100: { _light: "gray.900", _dark: "gray.900" },
				200: { _light: "gray.850", _dark: "gray.850" },
				300: { _light: "gray.800", _dark: "gray.800" },
			},
			"border": {
				200: { _light: "gray.800", _dark: "gray.800" },
				300: { _light: "gray.700", _dark: "gray.700" },
			},
			"text": {
				900: { _light: "gray.100", _dark: "gray.100" },
				800: { _light: "gray.200", _dark: "gray.200" },
				700: { _light: "gray.300", _dark: "gray.300" },
			},
			"actionBorder": {
				300: { _light: "#A4642E", _dark: "#A4642E" },
			},
        }
    },
    breakpoints: {
        base: '0em',
        sm: '30em',
        md: '48em',
        lg: '62em',
        xl: '80em',
        '2xl': '96em',
    },
    components: {
        Button: defineStyleConfig({
            baseStyle: {
                fontWeight: "bold",
                borderRadius: "10px",
                _focus: {
                    boxShadow: "none",
                },
            },
            variants: {
                red: {
                    bg: "tertiary.DEFAULT",
                    color: "white",
                    _hover: {
                        bg: "tertiary.500",
                    },
                },
                purple: {
                    bg: "secondary.600",
                    color: "white",
                    _hover: {
                        bg: "secondary.500",
                    },
                }
            },
            defaultProps: {
                variant: "red",
            }
        }),
        Link: defineStyleConfig({
            baseStyle: {
                borderColor: "transparent",
                display: "inline-block",
                color: "secondary.400",
                _hover: {
                    textDecoration: "underline",
                },
            },
            variants: {
                "side-settings": {
                    color: "rgba(255, 255, 255, 0.6)",
                    fontWeight: "500",
                    _hover: {
                        color: "rgba(255, 255, 255, 1)",
                        textDecoration: "none",
                    },
                },
                "side-settings-clicked": {
                    color: "rgba(255, 255, 255, 1)",
                    fontWeight: "700",
                    _hover: {
                        color: "rgba(255, 255, 255, 1)",
                        textDecoration: "none",
                    },
                }
            },
        }),
        Divider: defineStyleConfig({
            baseStyle: {
                borderWidth: '2px',
                borderColor: 'rgba(255, 255, 255, 0.5)',
            },
        }),
        Image: defineStyleConfig({
            baseStyle: {
                borderRadius: "10px",
            },
        }), 
        Menu: menuTheme,
    }
});

export default appTheme;
