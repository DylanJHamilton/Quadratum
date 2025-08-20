/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layout/**/*.liquid",
    "./templates/**/*.liquid",
    "./sections/**/*.liquid",
    "./snippets/**/*.liquid",
    "./assets/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))"
      }
    }
  },
  plugins: [require("@tailwindcss/typography")],
  safelist: [
    // alignment we toggle from schema
    'text-left','text-center','text-right',
    'items-start','items-center','items-end',
    'justify-start','justify-center','justify-end',
    'md:items-start','md:items-center','md:items-end',
    'md:justify-start','md:justify-center','md:justify-end',
    // spacings we reference in schema
    'py-8','py-10','py-12','py-14','py-16','py-20',
    'p-6','p-8','p-10','p-12',
    'max-w-2xl','max-w-3xl','max-w-4xl',
    // heights we use in heroes
    'min-h-[60vh]','min-h-[75vh]','min-h-screen'
  ]
}

