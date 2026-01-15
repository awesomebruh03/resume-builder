<script>
  import { resume } from '../../stores/resumeStore';
  
  let themeColor = '#06b6d4'; // Cyan-500
</script>

<div class="w-[210mm] min-h-[297mm] bg-white text-gray-800 p-10 font-sans shadow-2xl mx-auto flex flex-col gap-8">
  
  <header>
    <h1 class="text-4xl font-thin tracking-tight uppercase text-gray-900 mb-1">{$resume.basics.name}</h1>
    <div class="text-xl font-medium mb-4" style="color: {themeColor}">{$resume.basics.title}</div>
    
    <div class="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
       {#if $resume.basics.phone}
         <div class="flex items-center gap-1">
           <iconify-icon icon="mdi:phone"></iconify-icon> {$resume.basics.phone}
         </div>
       {/if}
       {#if $resume.basics.email}
         <div class="flex items-center gap-1">
           <iconify-icon icon="mdi:email"></iconify-icon> {$resume.basics.email}
         </div>
       {/if}
       {#if $resume.basics.location}
         <div class="flex items-center gap-1">
            <iconify-icon icon="mdi:map-marker"></iconify-icon> {$resume.basics.location}
         </div>
       {/if}
       {#each $resume.basics.links as link}
         <div class="flex items-center gap-1">
            <iconify-icon icon="mdi:link"></iconify-icon> {link}
         </div>
       {/each}
    </div>
  </header>

  <div class="grid grid-cols-12 gap-8 flex-1">
    
    <div class="col-span-8 flex flex-col gap-8">
       
       <section>
          <h2 class="font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-2 mb-6 text-sm">Experience</h2>
          <div class="flex flex-col gap-6">
             {#each $resume.experience as job}
               <div>
                  <div class="flex justify-between items-baseline mb-1">
                     <h3 class="font-bold text-lg">{job.title}</h3>
                     <span class="text-sm font-medium" style="color: {themeColor}">{job.company}</span>
                  </div>
                  <div class="flex gap-4 text-xs text-gray-500 mb-3">
                     <span class="flex items-center gap-1"><iconify-icon icon="mdi:calendar"></iconify-icon> {job.date}</span>
                     <span class="flex items-center gap-1"><iconify-icon icon="mdi:map-marker"></iconify-icon> {job.location}</span>
                  </div>
                  <div class="text-sm leading-relaxed rich-text">{@html job.description}</div>
               </div>
             {/each}
          </div>
       </section>

       {#each $resume.custom as section}
          <section>
             <h2 class="font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-2 mb-6 text-sm">{section.title}</h2>
             {#each section.items as item}
                <div class="mb-4">
                   <div class="font-bold">{item.title}</div>
                   <div class="text-sm text-gray-500 mb-1">{item.date} {item.subtitle ? `| ${item.subtitle}` : ''}</div>
                   <div class="text-sm rich-text">{@html item.description}</div>
                </div>
             {/each}
          </section>
       {/each}

    </div>

    <div class="col-span-4 flex flex-col gap-8">
       
       {#if $resume.summary}
         <section>
            <h2 class="font-bold uppercase tracking-widest border-b border-gray-300 pb-2 mb-3 text-sm text-gray-500">Summary</h2>
            <div class="text-sm text-gray-600 leading-relaxed italic">{@html $resume.summary}</div>
         </section>
       {/if}

       {#if $resume.skills}
         <section>
            <h2 class="font-bold uppercase tracking-widest border-b border-gray-300 pb-2 mb-3 text-sm text-gray-500">Skills</h2>
            <div class="text-sm leading-relaxed rich-text">{@html $resume.skills}</div>
         </section>
       {/if}

       {#if $resume.education.length > 0}
         <section>
            <h2 class="font-bold uppercase tracking-widest border-b border-gray-300 pb-2 mb-3 text-sm text-gray-500">Education</h2>
            <div class="flex flex-col gap-4">
               {#each $resume.education as edu}
                 <div>
                    <div class="font-bold text-sm" style="color: {themeColor}">{edu.degree}</div>
                    <div class="text-sm font-bold">{edu.school}</div>
                    <div class="text-xs text-gray-500 mt-1 flex items-center gap-1">
                       <iconify-icon icon="mdi:calendar"></iconify-icon> {edu.date}
                    </div>
                 </div>
               {/each}
            </div>
         </section>
       {/if}

    </div>
  </div>
</div>

<style>
  :global(.rich-text ul) { list-style-type: disc; margin-left: 1rem; }
  :global(.rich-text li) { margin-bottom: 0.25rem; }
</style>