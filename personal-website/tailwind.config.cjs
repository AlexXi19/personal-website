/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			backgroundImage: {
				dark: "url('/src/lib/assets/bg-dark.jpg')"
			}
		}
	},
	plugins: []
};
