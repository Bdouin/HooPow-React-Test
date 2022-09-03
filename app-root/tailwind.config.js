/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./pages/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./components/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            aspectRatio: {
                '4/3': '4 / 3',
                '3/2': '3 / 2',
                '2/3': '2 / 3',
                '16/9': '16 / 9',
            },
            width: {
                '2/9': '22%',
                '7/9': '88%'
            }
        },
        fontFamily: {
            'primary': ['"Karla"','"system-ui"','"sans-serif"'],
            'BD': ['"FredokaOne"','"system-ui"','"sans-serif"']
        }
    },
    plugins: [],
}
