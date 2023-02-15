/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				megan: {
					50: '#fefdfb',
					100: '#fcfbf8',
					200: '#eae4cd',
					300: '#d3caa7',
					400: '#beb48e',
					500: '#aba382',
					600: '#9f966f',
					700: '#837e67',
					800: '#686764',
					900: '#595959'
				}
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
