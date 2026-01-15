import { writable } from 'svelte/store';

const defaultDesign = {
  template: 'ivy',
  themeColor: '#06b6d4',
  
  // --- NEW TYPOGRAPHY OPTIONS ---
  fontBody: 'font-sans', // The Font Family
  fontSize: 10.5,        // Base size in pt
  lineHeight: 1.4,       // Multiplier (e.g., 1.5)
  pageMargin: 20,        // Padding in mm
  textColor: '#1f2937',  // Body text color (Gray-800 default)
  // -----------------------------

  sectionOrder: [
    { id: 'summary', name: 'Summary', visible: true },
    { id: 'experience', name: 'Experience', visible: true },
    { id: 'education', name: 'Education', visible: true },
    { id: 'skills', name: 'Skills', visible: true },
    { id: 'custom', name: 'Custom', visible: true }
  ]
};

const storedDesign = typeof window !== 'undefined' ? localStorage.getItem('resume_design') : null;
const initialValue = storedDesign ? JSON.parse(storedDesign) : defaultDesign;

export const design = writable(initialValue);

design.subscribe((value) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('resume_design', JSON.stringify(value));
  }
});