<script>
  import Sidebar from './ui/Sidebar.svelte';
  import Card from './ui/Card.svelte';
  import RichTextEditor from './ui/RichTextEditor.svelte';
  import 'iconify-icon';

  // 1. IMPORT THE STORE (Replaces local state)
  // Ensure this path matches where you created the store file
  import { resume } from '../stores/resumeStore';

  // 2. UI STATE (Local only, we don't need to save "what is open" to disk)
  let activeBlock = null; 

  // Global closer
  function closeAll() {
    activeBlock = null;
  }

  // Generic opener
  function openBlock(e, blockName) {
    e.stopPropagation();
    closeAll();
    activeBlock = blockName;
  }

  // Item opener
  function openItem(e, id) {
    e.stopPropagation();
    closeAll();
    activeBlock = id;
  }

  function keepOpen(e) {
    e.stopPropagation();
  }

  function handleEnterKey(e) {
    if (e.key === 'Enter') closeAll();
  }

  // --- ACTIONS (Updated to use $resume) ---
  
  function addLink() { 
    $resume.basics.links = [...$resume.basics.links, '']; 
  }

  function addExperience() {
    const newItem = { id: Date.now(), title: 'New Position', company: '', location: '', date: '', description: '' };
    $resume.experience = [...$resume.experience, newItem];
    setTimeout(() => activeBlock = newItem.id, 10);
  }
  
  function removeExperience(id) { 
    $resume.experience = $resume.experience.filter((item) => item.id !== id); 
  }

  function addEducation() {
    const newItem = { id: Date.now(), degree: 'New Degree', major: '', school: '', date: '' };
    $resume.education = [...$resume.education, newItem];
    setTimeout(() => activeBlock = newItem.id, 10);
  }
  
  function removeEducation(id) { 
    $resume.education = $resume.education.filter((item) => item.id !== id); 
  }

  function addCustomSection() { 
    $resume.custom = [...$resume.custom, { id: Date.now(), title: 'Untitled Section', items: [] }]; 
  }
  
  function removeCustomSection(id) { 
    $resume.custom = $resume.custom.filter((s) => s.id !== id); 
  }

  function addCustomItem(sectionId) {
    const sectionIndex = $resume.custom.findIndex((s) => s.id === sectionId);
    if (sectionIndex === -1) return;
    const newItem = { id: Date.now(), title: 'New Item', subtitle: '', date: '', description: '' };
    $resume.custom[sectionIndex].items = [...$resume.custom[sectionIndex].items, newItem];
    setTimeout(() => activeBlock = newItem.id, 10);
  }
  
  function removeCustomItem(sectionId, itemId) {
    const sectionIndex = $resume.custom.findIndex((s) => s.id === sectionId);
    if (sectionIndex === -1) return;
    $resume.custom[sectionIndex].items = $resume.custom[sectionIndex].items.filter((i) => i.id !== itemId);
  }
</script>

<svelte:window on:click={closeAll} />

<Sidebar side="left">
  <div slot="sidebar" class="flex flex-col gap-4 pb-20 p-2">
    
    <Card title="Contact Information">
      {#if activeBlock !== 'contact'}
        <div 
          class="bg-base-100 border border-base-300 rounded-lg p-3 hover:border-gray-400 transition-colors cursor-pointer group flex justify-between items-center shadow-sm" 
          on:click={(e) => openBlock(e, 'contact')}
        >
           <div class="truncate pr-2">
              <div class="font-bold text-sm text-gray-800">{$resume.basics.name || 'Your Name'}</div>
              <div class="text-xs text-gray-500 truncate">{$resume.basics.title || 'Job Title'}</div>
           </div>
           <div class="opacity-0 group-hover:opacity-100 transition-opacity">
              <button class="btn btn-xs btn-square btn-ghost"><iconify-icon icon="mdi:pencil"></iconify-icon></button>
           </div>
        </div>
      {:else}
        <div class="p-4 bg-base-100 rounded-lg shadow-xl ring-1 ring-black/5 relative" on:click={keepOpen}>
           <div class="flex flex-col gap-3">
             <label class="form-control w-full">
               <div class="label py-1"><span class="label-text text-xs text-gray-500 uppercase font-bold">Full Name</span></div>
               <input type="text" placeholder="e.g. John Doe" class="input input-bordered input-sm w-full" bind:value={$resume.basics.name} on:keydown={handleEnterKey} />
             </label>

             <label class="form-control w-full">
               <div class="label py-1"><span class="label-text text-xs text-gray-500 uppercase font-bold">Job Title</span></div>
               <input type="text" placeholder="e.g. Product Designer" class="input input-bordered input-sm w-full" bind:value={$resume.basics.title} on:keydown={handleEnterKey} />
             </label>

             <div class="grid grid-cols-2 gap-2">
                <label class="form-control w-full">
                  <div class="label py-1"><span class="label-text text-xs text-gray-500 uppercase font-bold">Phone</span></div>
                  <input type="tel" placeholder="+1 234..." class="input input-bordered input-sm w-full" bind:value={$resume.basics.phone} on:keydown={handleEnterKey}/>
                </label>
                <label class="form-control w-full">
                  <div class="label py-1"><span class="label-text text-xs text-gray-500 uppercase font-bold">Location</span></div>
                  <input type="text" placeholder="City" class="input input-bordered input-sm w-full" bind:value={$resume.basics.location} on:keydown={handleEnterKey}/>
                </label>
             </div>

             <label class="form-control w-full">
               <div class="label py-1"><span class="label-text text-xs text-gray-500 uppercase font-bold">Email</span></div>
               <input type="email" placeholder="john@example.com" class="input input-bordered input-sm w-full" bind:value={$resume.basics.email} on:keydown={handleEnterKey}/>
             </label>

             <label class="form-control w-full">
               <div class="label py-1"><span class="label-text text-xs text-gray-500 uppercase font-bold">Links</span></div>
               {#each $resume.basics.links as links, i}
                 <div class="flex gap-2 mb-2">
                    <input type="text" placeholder="linkedin.com..." class="input input-bordered input-sm w-full" bind:value={$resume.basics.links[i]} on:keydown={handleEnterKey}/>
                    {#if i > 0}
                      <button class="btn btn-sm btn-square btn-ghost text-error" on:click={() => $resume.basics.links = $resume.basics.links.filter((_, idx) => idx !== i)}>✕</button>
                    {/if}
                 </div>
               {/each}
               <button class="btn btn-xs btn-ghost w-full mt-1 text-gray-500" on:click={addLink}>+ Add Link</button>
             </label>
           </div>
        </div>
      {/if}
    </Card>

    <Card title="Professional Summary">
      {#if activeBlock !== 'summary'}
        <div 
          class="bg-base-100 border border-base-300 rounded-lg p-3 hover:border-gray-400 transition-colors cursor-pointer group shadow-sm min-h-[3rem]" 
          on:click={(e) => openBlock(e, 'summary')}
        >
           {#if $resume.summary}
             <div class="text-xs text-gray-600 line-clamp-3">{@html $resume.summary}</div>
           {:else}
             <div class="text-xs text-gray-400 italic">Click to add a professional summary...</div>
           {/if}
        </div>
      {:else}
        <div class="p-1 bg-base-100 rounded-lg shadow-xl ring-1 ring-black/5" on:click={keepOpen}>
          <RichTextEditor bind:value={$resume.summary} placeholder="Write 2-4 sentences about your career..." />
        </div>
      {/if}
    </Card>

    <Card title="Work Experience">
      <div class="flex flex-col gap-3">
        {#each $resume.experience as job (job.id)}
          {#if activeBlock !== job.id}
            <div 
              class="bg-base-100 border border-base-300 rounded-lg p-3 hover:border-gray-400 transition-colors cursor-pointer group flex justify-between items-center shadow-sm" 
              on:click={(e) => openItem(e, job.id)}
            >
               <div class="truncate pr-2">
                  <div class="font-bold text-sm text-gray-800 truncate">{job.title || 'New Position'}</div>
                  <div class="text-xs text-gray-500 truncate">{job.company || 'Company'}</div>
               </div>
               <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                  <button class="btn btn-xs btn-square btn-ghost text-error" on:click|stopPropagation={() => removeExperience(job.id)}>
                     <iconify-icon icon="mdi:trash-can-outline"></iconify-icon>
                  </button>
               </div>
            </div>
          {:else}
            <div class="p-4 bg-base-100 rounded-lg shadow-xl ring-1 ring-black/5 relative" on:click={keepOpen}>
               <div class="flex flex-col gap-3">
                  <input type="text" placeholder="Job Title" class="input input-bordered input-sm w-full font-bold" bind:value={job.title} />
                  <input type="text" placeholder="Company Name" class="input input-bordered input-sm w-full" bind:value={job.company} />
                  <div class="grid grid-cols-2 gap-2">
                    <input type="text" placeholder="Location" class="input input-bordered input-sm w-full" bind:value={job.location} />
                    <input type="text" placeholder="Dates" class="input input-bordered input-sm w-full" bind:value={job.date} />
                  </div>
                  <div class="mt-1">
                     <span class="label-text text-xs text-gray-500 ml-1 uppercase font-bold">Achievements</span>
                     <RichTextEditor bind:value={job.description} placeholder="• Led a team of..." />
                  </div>
               </div>
            </div>
          {/if}
        {/each}
        <button on:click|stopPropagation={addExperience} class="btn btn-outline btn-sm w-full border-dashed">+ Add Position</button>
      </div>
    </Card>

    <Card title="Education">
      <div class="flex flex-col gap-3">
        {#each $resume.education as edu (edu.id)}
          {#if activeBlock !== edu.id}
            <div 
              class="bg-base-100 border border-base-300 rounded-lg p-3 hover:border-gray-400 transition-colors cursor-pointer group flex justify-between items-center shadow-sm" 
              on:click={(e) => openItem(e, edu.id)}
            >
               <div class="truncate pr-2">
                  <div class="font-bold text-sm text-gray-800 truncate">{edu.school || 'University'}</div>
                  <div class="text-xs text-gray-500 truncate">{edu.degree || 'Degree'}</div>
               </div>
               <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                  <button class="btn btn-xs btn-square btn-ghost text-error" on:click|stopPropagation={() => removeEducation(edu.id)}>
                    <iconify-icon icon="mdi:trash-can-outline"></iconify-icon>
                  </button>
               </div>
            </div>
          {:else}
            <div class="p-4 bg-base-100 rounded-lg shadow-xl ring-1 ring-black/5 relative" on:click={keepOpen}>
               <div class="flex flex-col gap-3">
                  <input type="text" placeholder="School" class="input input-bordered input-sm w-full font-bold" bind:value={edu.school} />
                  <input type="text" placeholder="Degree" class="input input-bordered input-sm w-full" bind:value={edu.degree} />
                  <input type="text" placeholder="Major" class="input input-bordered input-sm w-full" bind:value={edu.major} />
                  <input type="text" placeholder="Date" class="input input-bordered input-sm w-full" bind:value={edu.date} />
               </div>
            </div>
          {/if}
        {/each}
        <button on:click|stopPropagation={addEducation} class="btn btn-outline btn-sm w-full border-dashed">+ Add Education</button>
      </div>
    </Card>

    <Card title="Skills">
      {#if activeBlock !== 'skills'}
        <div 
          class="bg-base-100 border border-base-300 rounded-lg p-3 hover:border-gray-400 transition-colors cursor-pointer group shadow-sm min-h-[3rem]" 
          on:click={(e) => openBlock(e, 'skills')}
        >
           {#if $resume.skills}
             <div class="text-xs text-gray-600 line-clamp-3">{@html $resume.skills}</div>
           {:else}
             <div class="text-xs text-gray-400 italic">Click to add skills...</div>
           {/if}
        </div>
      {:else}
        <div class="p-1 bg-base-100 rounded-lg shadow-xl ring-1 ring-black/5" on:click={keepOpen}>
           <RichTextEditor bind:value={$resume.skills} placeholder="Java, Python, Leadership..." />
           <div class="label px-2"><span class="label-text-alt text-gray-500">Separate skills with commas</span></div>
        </div>
      {/if}
    </Card>

    {#each $resume.custom as section (section.id)}
      <Card title="">
        <div slot="title" class="flex items-center gap-2 w-full pr-8">
          <input type="text" class="input input-ghost input-sm w-full font-bold text-gray-700 px-0 focus:bg-transparent" bind:value={section.title} on:click={keepOpen} />
        </div>
        <button class="btn btn-xs btn-circle btn-ghost absolute top-4 right-4 text-error" on:click={() => removeCustomSection(section.id)}>✕</button>

        <div class="flex flex-col gap-3 mt-2">
          {#each section.items as item (item.id)}
            {#if activeBlock !== item.id}
               <div 
                 class="bg-base-100 border border-base-300 rounded-lg p-3 hover:border-gray-400 transition-colors cursor-pointer group flex justify-between items-center shadow-sm" 
                 on:click={(e) => openItem(e, item.id)}
               >
                  <div class="truncate pr-2">
                     <div class="font-bold text-sm text-gray-800 truncate">{item.title || 'New Item'}</div>
                     <div class="text-xs text-gray-500 truncate">{item.subtitle || 'Subtitle'}</div>
                  </div>
                  <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                     <button class="btn btn-xs btn-square btn-ghost text-error" on:click|stopPropagation={() => removeCustomItem(section.id, item.id)}>
                        <iconify-icon icon="mdi:trash-can-outline"></iconify-icon>
                     </button>
                  </div>
               </div>
            {:else}
               <div class="p-4 bg-base-100 rounded-lg shadow-xl ring-1 ring-black/5 relative" on:click={keepOpen}>
                  <div class="flex flex-col gap-3">
                     <input type="text" placeholder="Title" class="input input-bordered input-sm w-full font-bold" bind:value={item.title} />
                     <input type="text" placeholder="Subtitle" class="input input-bordered input-sm w-full" bind:value={item.subtitle} />
                     <input type="text" placeholder="Date" class="input input-bordered input-sm w-full" bind:value={item.date} />
                     <div class="mt-1">
                        <RichTextEditor bind:value={item.description} placeholder="Description..." />
                     </div>
                  </div>
               </div>
            {/if}
          {/each}
          <button on:click|stopPropagation={() => addCustomItem(section.id)} class="btn btn-outline btn-xs border-dashed w-full text-gray-500">+ Add Item</button>
        </div>
      </Card>
    {/each}

    <div class="pt-4 border-t border-base-200">
      <button on:click|stopPropagation={addCustomSection} class="btn btn-ghost btn-sm w-full text-gray-500 gap-2">
        <span class="text-lg">+</span> Add Custom Section
      </button>
    </div>

  </div>
</Sidebar>