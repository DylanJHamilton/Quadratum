import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./layout/**/*.liquid",
    "./templates/**/*.liquid",
    "./sections/**/*.liquid",
    "./snippets/**/*.liquid",
    "./blocks/**/*.liquid",
    "./templates/**/*.json",
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
  plugins: [typography],
  safelist: [
    // Preserve existing free-text spacing choices when hosts resolve their tokens natively.
    'md:px-0','md:px-12','md:px-16','md:px-2','md:px-20','md:px-24',
    'md:px-3','md:px-32','md:px-4','md:px-5','md:py-0','md:py-10',
    'md:py-2','md:py-20','md:py-3','md:py-32','md:py-4','md:py-5',
    'md:py-6','md:py-8','px-0','px-10','px-12','px-16',
    'px-2','px-20','px-24','px-3','px-32','px-8',
    'py-0','py-2','py-24','py-3','py-32','py-4',
    'py-5','py-6',
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

