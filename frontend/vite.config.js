import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import webfontDl from 'vite-plugin-webfont-dl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(), // <--- Comma added here
    webfontDl([ // <--- This function is now INSIDE the brackets []
      // Sans Serif
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap',
      'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
      'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;700&display=swap',
      
      // Serif
      'https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap',
      'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap',
      'https://fonts.googleapis.com/css2?family=Lora:wght@400;700&display=swap',

      // Mono
      'https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500&display=swap',
      'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;500&display=swap',
    ]),
  ] // <--- Array closes here
})