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
				icon: '150px',
				'mobile-icon': '112px'
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
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: 'hsl(348, 63%, 53%)',
					secondary: '#eab308',
					accent: '#c084fc',
					neutral: '#050217',
					'base-100': '#fffbff',
					info: '#00a3f2',
					success: '#008a00',
					warning: '#fe6200',
					error: '#ff7e7e'
				}
			}
		]
	},
	plugins: [require('daisyui')]
};
