/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'amiri': ['Amiri-Regular'],
        'amiri-bold': ['Amiri-Bold'],
        'amiri-italic': ['Amiri-Italic'],
        'amiri-bolditalic': ['Amiri-BoldItalic']
      }
    },
  },
  plugins: [],
}