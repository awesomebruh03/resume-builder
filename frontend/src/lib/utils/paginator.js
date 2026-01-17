// src/lib/utils/paginator.js

/**
 * 1. FLATTENER (Unchanged)
 */
// src/lib/utils/paginator.js

export function flattenResume(resume, sectionOrder) {
  const blocks = [];

  // 1. Header is always first
  blocks.push({ type: 'header', id: 'header', data: resume.basics });

  // 2. Iterate through the user's SORT ORDER
  sectionOrder.forEach(section => {
    
    // STANDARD SECTIONS
    if (section.id === 'summary' && resume.summary) {
      blocks.push({ type: 'section-title', id: 'title-summary', content: 'Summary' });
      blocks.push({ type: 'summary', id: 'summary-content', content: resume.summary });
    }
    else if (section.id === 'experience' && resume.experience.length > 0) {
      blocks.push({ type: 'section-title', id: 'title-experience', content: 'Experience' });
      resume.experience.forEach((job, index) => {
        blocks.push({ type: 'experience', id: `exp-${index}`, data: job });
      });
    }
    else if (section.id === 'education' && resume.education.length > 0) {
      blocks.push({ type: 'section-title', id: 'title-education', content: 'Education' });
      resume.education.forEach((edu, index) => {
        blocks.push({ type: 'education', id: `edu-${index}`, data: edu });
      });
    }
    else if (section.id === 'skills' && resume.skills) {
      blocks.push({ type: 'section-title', id: 'title-skills', content: 'Skills' });
      blocks.push({ type: 'skills', id: 'skills-content', content: resume.skills });
    }

    // --- CUSTOM SECTIONS (THE FIX) ---
    else {
      // Check if this ID matches a specific Custom Section
      const customSection = resume.custom.find(c => c.id === section.id);

      // If found, render ONLY this specific section
      if (customSection && customSection.items.length > 0) {
         blocks.push({ 
             type: 'section-title', 
             id: `title-${customSection.id}`, 
             content: customSection.title 
         });
         
         customSection.items.forEach((item, index) => {
            blocks.push({ 
                type: 'custom', 
                id: `cust-${customSection.id}-${index}`, 
                data: item 
            });
         });
      }
    }
  });

  return blocks;
}

/**
 * 2. ALLOCATOR (Updated)
 * Now accepts 'maxContentHeight' to support different paper sizes.
 */
export function paginateBlocks(blocks, heightMap, maxContentHeight) {
  const pages = [];
  let currentPage = [];
  let currentHeight = 0;

  // Safety fallback if maxContentHeight is missing
  const LIMIT = maxContentHeight || 1050; 

  blocks.forEach(block => {
    const blockHeight = heightMap[block.id] || 0;
    
    if (blockHeight === 0) {
        currentPage.push(block);
        return;
    }

    if (currentHeight + blockHeight > LIMIT) {
      // PAGE BREAK
      pages.push(currentPage);
      currentPage = [];
      currentHeight = 0;
      
      // Pull orphan titles to the next page
      const lastItem = pages[pages.length - 1].pop();
      if (lastItem && lastItem.type === 'section-title') {
         currentPage.push(lastItem);
         currentHeight += (heightMap[lastItem.id] || 0);
      } else if (lastItem) {
         pages[pages.length - 1].push(lastItem);
      }
    }

    currentPage.push(block);
    currentHeight += blockHeight;
  });

  if (currentPage.length > 0) pages.push(currentPage);

  return pages;
}