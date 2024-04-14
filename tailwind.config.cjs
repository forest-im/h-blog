module.exports = {
	darkMode: "class",
	content: [
		"./src/**/*.{html,js,svelte,ts}",
		"./src/**/**/*.{html,js,svelte,ts}",
		"./src/**/**/**/**/*.{html,js,svelte,ts}"
	],
	daisyui: {
		themes: ["lofi", "black"]
	},
	theme: {
		extend: {
			colors: {
				pointColor: {
					900: "#3e86f6",
					800: "#2e455c",
					850: "#43bfa4",
					700: "#e0f3ff",
					500: "#f7fbff",
					400: "#001629"
				},
				pastelColor: {
					bluePastel: "#edf7ff"
				},
				pointInvertColor: "#ffe16b",
				darkPointColor: {
					900: "#3e86f6",
					800: "#2e455c",
					850: "#43bfa4",
					700: "#323845",
					500: "#171717"
				},
				darkPointInvertColor: "#3e86f6",
				defaultColor: {
					900: "#202021",
					800: "#474747",
					700: "#7d7d7d",
					600: "#ababab",
					500: "#d1d1d1"
				},
				darkDefaultColor: {
					900: "#fafafa",
					800: "#d4d4d4",
					700: "#a1a1a1",
					600: "#757575",
					500: "#4f4f4f"
				},
				darkPastelColor: {
					bluePastel: "#303030"
				}
			},
			boxShadow: {
				customSm: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
				customDarkSm: "rgba(171, 171, 171, 0.05) 0px 0px 0px 1px"
			},
			backgroundImage: {
				me: "url(/src/lib/images/me.jpg)",
				sky: "url(/src/lib/images/sky.jpg)"
			}
		}
	},
	plugins: [require("@tailwindcss/typography"), require("daisyui")]
};
