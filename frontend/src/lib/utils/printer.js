export function printResume(design) {
  // 1. Get the Resume Content
  const printContent = document.getElementById('print-container');
  if (!printContent) {
    console.error("Print container not found!");
    return;
  }

  // 2. Create a hidden IFrame
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0'; 
  iframe.style.height = '0';
  iframe.style.border = '0';
  document.body.appendChild(iframe);

  // 3. Get the Document inside the IFrame
  const doc = iframe.contentWindow.document;

  // 4. Gather all Styles
  let styles = '';
  document.querySelectorAll('style, link[rel="stylesheet"]').forEach(node => {
    styles += node.outerHTML;
  });

  // 5. Determine Page Size
  const isLetter = design?.pageSize === 'Letter';
  const width = isLetter ? '215.9mm' : '210mm';
  const height = isLetter ? '279.4mm' : '297mm';

  // 6. Write the Clean HTML
  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Resume Export</title>
        ${styles}
        <style>
            /* OVERRIDE GLOBAL PRINT HIDING */
            * { visibility: visible !important; }

            /* KILL BROWSER MARGINS */
            @page { margin: 0; size: auto; }
            
            body { 
                margin: 0; 
                padding: 0; 
                background: white; 
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            
            /* RESET WRAPPERS */
            /* This targets the 'relative group' divs from Svelte to stop them from messing up spacing */
            body > div {
                margin: 0 !important;
                padding: 0 !important;
                display: block !important;
            }

            /* ENSURE EXACT DIMENSIONS */
            .resume-paper {
                margin: 0 auto;
                box-shadow: none !important;
                margin-bottom: 0 !important;
                break-after: page; 
                page-break-after: always;
                position: relative !important;
                transform: none !important; 
                
                /* DYNAMIC SIZE */
                width: ${width} !important;
                min-height: ${height} !important;
                
                overflow: hidden;
                background: white;
            }

            /* HIDE UI ELEMENTS (Like Page Labels) */
            .resume-paper + div { display: none !important; }
            .resume-paper:last-child { break-after: auto; }
        </style>
      </head>
      <body>
        ${printContent.innerHTML}
      </body>
    </html>
  `);
  doc.close();

  // 7. SMART PRINT TRIGGER
  iframe.onload = () => {
    const win = iframe.contentWindow;
    
    // Wait for fonts to be ready
    win.document.fonts.ready.then(() => {
        // Extra buffer for images/icons
        setTimeout(() => {
            win.focus();
            win.print();
            
            // Cleanup (Optional)
            setTimeout(() => document.body.removeChild(iframe), 2000);
        }, 500);
    });
  };
}