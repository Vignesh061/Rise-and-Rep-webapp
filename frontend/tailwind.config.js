/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#fef2f2',
                    100: '#fee2e2',
                    200: '#fecaca',
                    300: '#fca5a5',
                    400: '#f87171',
                    500: '#E50914',
                    600: '#B20710',
                    700: '#8B0000',
                    800: '#6B0000',
                    900: '#450a0a',
                    950: '#2D0000',
                },
                accent: {
                    400: '#f87171',
                    500: '#E50914',
                    600: '#B20710',
                },
                gym: {
                    dark: '#141414',
                    card: '#1a1a1a',
                    border: '#2a2a2a',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
