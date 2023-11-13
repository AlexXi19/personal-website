/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			backgroundImage: {
				dark: "url('/src/lib/assets/bg-dark.jpg')"
			},
            fontFamily: {
                geist: ['Geist', 'sans-serif', 'source-sans-pro'], // Use a fallback font
            },
            colors: {
                'secondary': '#96bfdd', // Your chosen color
                'dark-gray': '#d4d4d4',
            },
		}
	},
	plugins: []
};
