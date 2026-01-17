import { writable } from 'svelte/store';

const defaultDesign = {
  template: 'ivy',
  themeColor: '#06b6d4',
  
  // TYPOGRAPHY
  fontBody: 'Inter, sans-serif', // Updated default to match your new list
  fontSize: 10.5,
  lineHeight: 1.4,
  pageMargin: 20,
  textColor: '#1f2937',

  // PAGE SETTINGS (NEW)
  pageSize: 'A4', // 'A4' or 'Letter'

  // LAYOUT
  sectionOrder: [
    { id: 'summary', name: 'Summary', visible: true },
    { id: 'experience', name: 'Experience', visible: true },
    { id: 'education', name: 'Education', visible: true },
    { id: 'skills', name: 'Skills', visible: true },
    { id: 'custom', name: 'Custom Sections', visible: true } // Handles all custom sections
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