const colors = require('tailwindcss/colors');

const config = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'current',
			white: '#fff',
			primary: colors.cyan,
			secondary: colors.amber,
			gray: colors.trueGray
		},
		extend: {}
	},
	plugins: [require('@tailwindcss/aspect-ratio')]
};

module.exports = config;
