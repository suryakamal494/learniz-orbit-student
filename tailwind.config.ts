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
				/* Pastel Color Extensions */
				'pastel-blue': {
					50: 'hsl(210, 100%, 97%)',
					100: 'hsl(210, 100%, 95%)',
					200: 'hsl(210, 85%, 90%)',
					300: 'hsl(210, 75%, 85%)',
					400: 'hsl(210, 70%, 80%)',
					500: 'hsl(210, 65%, 75%)',
					600: 'hsl(210, 60%, 70%)',
					700: 'hsl(210, 55%, 65%)',
					800: 'hsl(210, 50%, 60%)',
					900: 'hsl(210, 45%, 55%)',
				},
				'pastel-green': {
					50: 'hsl(150, 60%, 97%)',
					100: 'hsl(150, 55%, 95%)',
					200: 'hsl(150, 50%, 90%)',
					300: 'hsl(150, 45%, 85%)',
					400: 'hsl(150, 40%, 80%)',
					500: 'hsl(150, 60%, 70%)',
					600: 'hsl(150, 55%, 65%)',
					700: 'hsl(150, 50%, 60%)',
					800: 'hsl(150, 45%, 55%)',
					900: 'hsl(150, 40%, 50%)',
				},
				'pastel-purple': {
					50: 'hsl(270, 70%, 97%)',
					100: 'hsl(270, 65%, 95%)',
					200: 'hsl(270, 60%, 90%)',
					300: 'hsl(270, 55%, 85%)',
					400: 'hsl(270, 50%, 80%)',
					500: 'hsl(270, 50%, 85%)',
					600: 'hsl(270, 45%, 70%)',
					700: 'hsl(270, 40%, 65%)',
					800: 'hsl(270, 35%, 60%)',
					900: 'hsl(270, 30%, 55%)',
				},
				'pastel-peach': {
					50: 'hsl(25, 85%, 97%)',
					100: 'hsl(25, 80%, 95%)',
					200: 'hsl(25, 75%, 90%)',
					300: 'hsl(25, 70%, 85%)',
					400: 'hsl(25, 65%, 80%)',
					500: 'hsl(25, 70%, 80%)',
					600: 'hsl(25, 60%, 75%)',
					700: 'hsl(25, 55%, 70%)',
					800: 'hsl(25, 50%, 65%)',
					900: 'hsl(25, 45%, 60%)',
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
			backgroundImage: {
				'gradient-pastel-primary': 'linear-gradient(135deg, hsl(var(--primary-light)), hsl(var(--primary)))',
				'gradient-pastel-secondary': 'linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--accent-teal-light)))',
				'gradient-pastel-accent': 'linear-gradient(135deg, hsl(var(--accent)), hsl(var(--accent-orange-light)))',
			},
			boxShadow: {
				'modern': 'var(--shadow-md)',
				'modern-lg': 'var(--shadow-lg)',
				'modern-xl': 'var(--shadow-xl)',
				'modern-2xl': 'var(--shadow-2xl)',
				'pastel-sm': '0 1px 2px 0 rgba(210, 180, 220, 0.05)',
				'pastel-md': '0 4px 6px -1px rgba(210, 180, 220, 0.1), 0 2px 4px -1px rgba(210, 180, 220, 0.06)',
				'pastel-lg': '0 10px 15px -3px rgba(210, 180, 220, 0.1), 0 4px 6px -2px rgba(210, 180, 220, 0.05)',
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
