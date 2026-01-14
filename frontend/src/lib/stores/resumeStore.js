// src/lib/stores/resumeStore.js
import { writable } from 'svelte/store';

// 1. Define the default empty state (what new users see)
const defaultResume = {
  basics: { name: '', title: '', email: '', phone: '', location: '', links: [''] },
  summary: '',
  experience: [],
  education: [],
  skills: '',
  custom: []
};

// 2. Load existing data from LocalStorage (if any)
// We check if 'window' exists to avoid errors during build time (standard practice)
const storedData = typeof window !== 'undefined' ? localStorage.getItem('resume_data') : null;

const initialValue = storedData ? JSON.parse(storedData) : defaultResume;

// 3. Create the writable store
export const resume = writable(initialValue);

// 4. Subscribe to changes
// Anytime the store changes, we save the new value to LocalStorage immediately.
resume.subscribe((value) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('resume_data', JSON.stringify(value));
  }
});