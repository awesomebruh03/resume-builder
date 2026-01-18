// 1. Import the auto-generated Go binding
import { GeneratePDF } from '../../../wailsjs/go/main/App';

export async function printResume(design) {
  const printContent = document.getElementById('print-container');
  if (!printContent) {
    console.error("Print container not found!");
    return;
  }

  // 2. Gather Styles (Tailwind + Component CSS)
  // We need to pass the styles to the backend so the PDF looks right
  let styles = '';
  document.querySelectorAll('style, link[rel="stylesheet"]').forEach(node => {
    styles += node.outerHTML;
  });

  // 3. Check Page Size
  const isLetter = design?.pageSize === 'Letter';

  // 4. Construct the Full HTML String
  // This creates a standalone HTML page that the headless browser will load
  const fullHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Resume Export</title>
        ${styles}
        <style>
            /* FORCE RESET FOR PDF */
            body { 
                margin: 0; 
                padding: 0; 
                background: white; 
                -webkit-print-color-adjust: exact; 
                print-color-adjust: exact;
            }
            
            /* RESET WRAPPERS */
            /* Ensure the resume paper takes up the full PDF page */
            .resume-paper {
                margin: 0 !important;
                box-shadow: none !important;
                width: 100% !important;
                /* Remove fixed heights so content flows naturally */
                min-height: 100vh; 
            }

            /* Hide UI helpers like "Page 1" labels */
            .resume-paper + div { display: none !important; }
        </style>
      </head>
      <body>
        ${printContent.innerHTML}
      </body>
    </html>
  `;

  // 5. Send to Go Backend
  try {
    // This calls App.GeneratePDF(html, isLetter) in Go
    await GeneratePDF(fullHTML, isLetter);
    alert("PDF Saved Successfully!");
  } catch (e) {
    console.error(e);
    alert("PDF Generation Failed: " + e);
  }
}