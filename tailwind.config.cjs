/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				megan: {
					50: 'hsl(355, 86%, 97%)',
					100: 'hsl(355, 85%, 95%)',
					200: 'hsl(354, 80%, 90%)',
					300: 'hsl(354, 78%, 82%)',
					400: 'hsl(353, 77%, 71%)',
					500: 'hsl(351, 73%, 60%)',
					600: 'hsl(348, 63%, 53%)',
					700: 'hsl(347, 67%, 41%)',
					800: 'hsl(344, 65%, 35%)',
					900: 'hsl(343, 61%, 30%)',
					950: 'hsl(344, 73%, 16%)'
				}
			},
			width: {
				icon: '180px'
			},
			gridTemplateColumns: {
				desktop: '1fr',
				mobile: '1fr 1fr'
			},
			fontFamily: {
				display: ['Parisienne', 'cursive'],
				link: ['Lustria', 'serif']
			}
		}
	},
	plugins: []
};
