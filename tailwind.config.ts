import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					light: 'hsl(var(--primary-light))',
					dark: 'hsl(var(--primary-dark))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					teal: 'hsl(var(--accent-teal))',
					'teal-light': 'hsl(var(--accent-teal-light))',
					orange: 'hsl(var(--accent-orange))',
					'orange-light': 'hsl(var(--accent-orange-light))',
					'orange-dark': 'hsl(var(--accent-orange-dark))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					light: 'hsl(var(--success-light))',
					bg: 'hsl(var(--success-bg))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					light: 'hsl(var(--warning-light))',
					bg: 'hsl(var(--warning-bg))'
				},
				error: {
					DEFAULT: 'hsl(var(--error))',
					light: 'hsl(var(--error-light))',
					bg: 'hsl(var(--error-bg))'
				},
				pastel: {
					blue: {
						50: 'hsl(216 100% 97%)',
						100: 'hsl(216 100% 94%)',
						200: 'hsl(216 95% 87%)',
						300: 'hsl(216 90% 78%)',
						400: 'hsl(216 85% 68%)',
						500: 'hsl(216 80% 58%)',
						600: 'hsl(216 75% 48%)',
						700: 'hsl(216 70% 38%)',
						800: 'hsl(216 65% 28%)',
						900: 'hsl(216 60% 18%)',
					},
					green: {
						50: 'hsl(142 76% 96%)',
						100: 'hsl(142 76% 91%)',
						200: 'hsl(142 76% 86%)',
						300: 'hsl(142 76% 76%)',
						400: 'hsl(142 76% 66%)',
						500: 'hsl(142 76% 56%)',
						600: 'hsl(142 76% 46%)',
						700: 'hsl(142 76% 36%)',
						800: 'hsl(142 76% 26%)',
						900: 'hsl(142 76% 16%)',
					},
					purple: {
						50: 'hsl(270 65% 97%)',
						100: 'hsl(270 65% 92%)',
						200: 'hsl(270 65% 85%)',
						300: 'hsl(270 65% 75%)',
						400: 'hsl(270 65% 65%)',
						500: 'hsl(270 65% 55%)',
						600: 'hsl(270 65% 45%)',
						700: 'hsl(270 65% 35%)',
						800: 'hsl(270 65% 25%)',
						900: 'hsl(270 65% 15%)',
					},
					peach: {
						50: 'hsl(25 95% 97%)',
						100: 'hsl(25 95% 92%)',
						200: 'hsl(25 95% 88%)',
						300: 'hsl(25 95% 78%)',
						400: 'hsl(25 95% 68%)',
						500: 'hsl(25 95% 58%)',
						600: 'hsl(25 95% 48%)',
						700: 'hsl(25 95% 38%)',
						800: 'hsl(25 95% 28%)',
						900: 'hsl(25 95% 18%)',
					}
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				system: [
					'-apple-system',
					'BlinkMacSystemFont',
					'Segoe UI',
					'Roboto',
					'Helvetica Neue',
					'Arial',
					'sans-serif',
					'Apple Color Emoji',
					'Segoe UI Emoji',
					'Segoe UI Symbol'
				],
				mono: [
					'SF Mono',
					'Monaco',
					'Cascadia Code',
					'Fira Code',
					'Consolas',
					'Liberation Mono',
					'Menlo',
					'monospace'
				]
			},
			spacing: {
				'xs': 'var(--spacing-xs)',
				'sm': 'var(--spacing-sm)',
				'md': 'var(--spacing-md)',
				'lg': 'var(--spacing-lg)',
				'xl': 'var(--spacing-xl)',
				'2xl': 'var(--spacing-2xl)',
				'3xl': 'var(--spacing-3xl)',
			},
			boxShadow: {
				'modern': 'var(--shadow-md)',
				'modern-lg': 'var(--shadow-lg)',
				'modern-xl': 'var(--shadow-xl)',
				'modern-2xl': 'var(--shadow-2xl)',
				'pastel': '0 4px 6px -1px rgba(216, 180, 254, 0.1), 0 2px 4px -1px rgba(216, 180, 254, 0.06)',
				'pastel-lg': '0 10px 15px -3px rgba(216, 180, 254, 0.1), 0 4px 6px -2px rgba(216, 180, 254, 0.05)',
			},
			backgroundImage: {
				'gradient-pastel': 'linear-gradient(135deg, hsl(216 85% 88%) 0%, hsl(270 65% 85%) 25%, hsl(174 62% 87%) 50%, hsl(25 95% 88%) 75%, hsl(142 76% 86%) 100%)',
				'gradient-primary': 'linear-gradient(135deg, hsl(216 85% 78%) 0%, hsl(216 85% 68%) 100%)',
				'gradient-secondary': 'linear-gradient(135deg, hsl(142 76% 86%) 0%, hsl(142 76% 76%) 100%)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.9)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'pulse-modern': {
					'0%, 100%': {
						opacity: '1'
					},
					'50%': {
						opacity: '0.6'
					}
				},
				'shimmer': {
					'0%': {
						backgroundPosition: '-200% 0'
					},
					'100%': {
						backgroundPosition: '200% 0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'slide-up': 'slide-up 0.6s ease-out',
				'scale-in': 'scale-in 0.4s ease-out',
				'pulse-modern': 'pulse-modern 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'shimmer': 'shimmer 2s infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
