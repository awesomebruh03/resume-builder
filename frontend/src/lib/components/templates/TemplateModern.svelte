<script>
  import { resume } from '../../stores/resumeStore';
</script>

<div class="w-[210mm] min-h-[297mm] bg-white text-gray-800 shadow-2xl mx-auto flex">
  
  <aside class="w-[32%] bg-slate-100 p-8 flex flex-col gap-8 border-r border-slate-200">
    
    <div class="text-sm flex flex-col gap-3 break-words">
      <div class="font-bold text-slate-500 uppercase tracking-widest text-xs border-b border-slate-300 pb-2 mb-1">Contact</div>
      
      {#if $resume.basics.email}
        <div>
          <span class="block text-xs font-bold text-slate-500">Email</span>
          {$resume.basics.email}
        </div>
      {/if}
      
      {#if $resume.basics.phone}
        <div>
          <span class="block text-xs font-bold text-slate-500">Phone</span>
          {$resume.basics.phone}
        </div>
      {/if}

      {#if $resume.basics.location}
        <div>
          <span class="block text-xs font-bold text-slate-500">Location</span>
          {$resume.basics.location}
        </div>
      {/if}

      {#each $resume.basics.links as link}
        {#if link}
          <div>
             <span class="block text-xs font-bold text-slate-500">Link</span>
             <a href={link} class="text-blue-600 underline decoration-blue-300 underline-offset-2">{link.replace('https://', '')}</a>
          </div>
        {/if}
      {/each}
    </div>

    {#if $resume.education.length > 0}
      <div>
        <div class="font-bold text-slate-500 uppercase tracking-widest text-xs border-b border-slate-300 pb-2 mb-4">Education</div>
        {#each $resume.education as edu}
          <div class="mb-4 text-sm">
            <div class="font-bold">{edu.school}</div>
            <div class="text-slate-600 text-xs mb-1">{edu.date}</div>
            <div>{edu.degree}</div>
            <div class="italic text-slate-500">{edu.major}</div>
          </div>
        {/each}
      </div>
    {/if}

    {#if $resume.skills}
      <div>
        <div class="font-bold text-slate-500 uppercase tracking-widest text-xs border-b border-slate-300 pb-2 mb-2">Skills</div>
        <div class="text-sm leading-relaxed rich-text-content">{@html $resume.skills}</div>
      </div>
    {/if}

  </aside>


  <main class="flex-1 p-8 pt-10">
    
    <header class="mb-10">
      <h1 class="text-4xl font-extrabold text-slate-900 uppercase tracking-tight leading-none mb-2">{$resume.basics.name}</h1>
      <h2 class="text-xl text-slate-500 font-medium">{$resume.basics.title}</h2>
    </header>

    {#if $resume.summary}
      <section class="mb-8">
        <h3 class="font-bold text-slate-900 uppercase tracking-wider text-sm border-b-2 border-slate-900 pb-2 mb-4">Profile</h3>
        <div class="text-slate-700 leading-relaxed rich-text-content">{@html $resume.summary}</div>
      </section>
    {/if}

    {#if $resume.experience.length > 0}
      <section>
        <h3 class="font-bold text-slate-900 uppercase tracking-wider text-sm border-b-2 border-slate-900 pb-2 mb-6">Experience</h3>
        
        <div class="flex flex-col gap-8">
          {#each $resume.experience as job}
            <div>
              <div class="flex justify-between items-baseline mb-1">
                <h4 class="font-bold text-lg text-slate-800">{job.title}</h4>
                <span class="text-sm font-bold bg-slate-100 px-2 py-1 rounded text-slate-600">{job.date}</span>
              </div>
              <div class="text-slate-500 font-medium mb-3">{job.company} — {job.location}</div>
              
              <div class="text-slate-700 text-sm leading-relaxed rich-text-content">{@html job.description}</div>
            </div>
          {/each}
        </div>
      </section>
    {/if}

  </main>
</div>

<style>
  :global(.rich-text-content ul) {
    list-style-type: disc;
    margin-left: 1rem;
  }
</style>