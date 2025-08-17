/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
    './layout/**/*.liquid',
    './sections/**/*.liquid',
    './snippets/**/*.liquid',
    './templates/**/*.{liquid,json}',
    './assets/**/*.js'
  ],
theme: {
    extend: {
      colors: {
        // minimal tokens used by the section
        background: '#ffffff',
        foreground: '#111111',
        primary:   '#111111',
        'primary-foreground': '#ffffff',
        card: '#ffffff',
        border: '#e5e7eb',
        accent: '#f3f4f6',
        'accent-foreground': '#111111'
      }
    }
  },
  plugins: [],
}

