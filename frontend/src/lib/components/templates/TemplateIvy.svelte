<script>
  import { resume } from '../../stores/resumeStore';
</script>

<div class="w-[210mm] min-h-[297mm] bg-white text-black p-[25mm] font-serif leading-relaxed shadow-2xl mx-auto">
  
  <div class="text-center mb-6">
    <h1 class="text-3xl font-bold uppercase tracking-widest mb-2">{$resume.basics.name}</h1>
    {#if $resume.basics.title}
      <div class="text-lg italic text-gray-700 mb-2">{$resume.basics.title}</div>
    {/if}
    
    <div class="text-sm flex flex-wrap justify-center gap-2 text-gray-800">
      {#if $resume.basics.email}<span>{$resume.basics.email}</span>{/if}
      {#if $resume.basics.phone}<span>• {$resume.basics.phone}</span>{/if}
      {#if $resume.basics.location}<span>• {$resume.basics.location}</span>{/if}
      {#each $resume.basics.links as link}
        <span>• {link}</span>
      {/each}
    </div>
  </div>

  {#if $resume.summary}
    <div class="mb-6">
      <h2 class="text-center font-bold uppercase text-sm tracking-widest border-b-2 border-black pb-1 mb-3">Summary</h2>
      <div class="text-sm text-justify rich-text">{@html $resume.summary}</div>
    </div>
  {/if}

  {#if $resume.experience.length > 0}
    <div class="mb-6">
      <h2 class="text-center font-bold uppercase text-sm tracking-widest border-b-2 border-black pb-1 mb-4">Experience</h2>
      <div class="flex flex-col gap-5">
        {#each $resume.experience as job}
          <div>
            <div class="flex justify-between items-baseline font-bold">
              <span class="text-lg">{job.company}</span>
              <span class="text-sm text-gray-800">{job.location}</span>
            </div>
            <div class="flex justify-between items-baseline mb-2">
              <span class="italic text-gray-800">{job.title}</span>
              <span class="text-sm text-gray-800">{job.date}</span>
            </div>
            <div class="text-sm rich-text">{@html job.description}</div>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  {#if $resume.education.length > 0}
    <div class="mb-6">
      <h2 class="text-center font-bold uppercase text-sm tracking-widest border-b-2 border-black pb-1 mb-4">Education</h2>
      {#each $resume.education as edu}
        <div class="mb-4">
          <div class="flex justify-between font-bold">
            <span>{edu.school}</span>
            <span class="text-sm font-normal">{edu.date}</span>
          </div>
          <div class="italic text-sm">{edu.degree} in {edu.major}</div>
        </div>
      {/each}
    </div>
  {/if}

  {#if $resume.skills}
    <div class="mb-6">
      <h2 class="text-center font-bold uppercase text-sm tracking-widest border-b-2 border-black pb-1 mb-3">Skills</h2>
      <div class="text-sm text-center">{@html $resume.skills}</div>
    </div>
  {/if}

  {#each $resume.custom as section}
    <div class="mb-6">
      <h2 class="text-center font-bold uppercase text-sm tracking-widest border-b-2 border-black pb-1 mb-4">{section.title}</h2>
      {#each section.items as item}
         <div class="mb-3">
            <div class="flex justify-between font-bold text-sm">
               <span>{item.title}</span>
               <span>{item.date}</span>
            </div>
            <div class="italic text-sm mb-1">{item.subtitle}</div>
            <div class="text-sm rich-text">{@html item.description}</div>
         </div>
      {/each}
    </div>
  {/each}

</div>

<style>
  :global(.rich-text ul) { list-style-type: disc; margin-left: 1.5em; }
  :global(.rich-text p) { margin-bottom: 0.25em; }
</style>