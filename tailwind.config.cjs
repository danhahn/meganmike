/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				megan: {
					50: '#fffafb',
					100: '#ffe0e6',
					200: '#ffc6d1',
					300: '#ff9eb1',
					400: '#ff6685',
					500: '#fd365e',
					600: '#eb1741',
					700: '#c60f34',
					800: '#a3112e',
					900: '#87152c'
				}
			},
			gridTemplateColumns: {
				desktop: '100px 1fr 100px',
				mobile: '1fr 1fr'
			}
		}
	},
	plugins: []
};
