<script>
  import { resume } from '../../stores/resumeStore';
</script>

<div
  class="w-[210mm] min-h-[297mm] bg-white text-black p-[25mm] font-serif shadow-2xl mx-auto text-sm leading-relaxed"
>
  <header class="text-center border-b-2 border-black pb-4 mb-6">
    <h1 class="text-3xl font-bold uppercase tracking-wider mb-2">
      {$resume.basics.name}
    </h1>
    <div class="text-gray-700 flex flex-wrap justify-center gap-3 text-sm">
      <span>{$resume.basics.location}</span>
      <span>|</span>
      <span>{$resume.basics.email}</span>
      <span>|</span>
      <span>{$resume.basics.phone}</span>
      {#each $resume.basics.links as link}
        {#if link}
          <span>|</span>
          <span class="text-blue-800 underline">{link}</span>
        {/if}
      {/each}
    </div>
  </header>

  {#if $resume.summary}
    <section class="mb-6">
      <h2 class="font-bold uppercase border-b border-gray-400 mb-3 pb-1">
        Professional Summary
      </h2>
      <div class="text-justify">{@html $resume.summary}</div>
    </section>
  {/if}

  {#if $resume.experience.length > 0}
    <section class="mb-6">
      <h2 class="font-bold uppercase border-b border-gray-400 mb-4 pb-1">
        Experience
      </h2>
      <div class="flex flex-col gap-5">
        {#each $resume.experience as job}
          <div>
            <div class="flex justify-between items-baseline mb-1">
              <h3 class="font-bold text-lg">{job.company}</h3>
              <span class="italic text-gray-700">{job.location}</span>
            </div>
            <div class="flex justify-between items-baseline mb-2">
              <span class="font-bold italic text-gray-800">{job.title}</span>
              <span class="text-gray-700">{job.date}</span>
            </div>
            <div class="pl-0 rich-text-content">{@html job.description}</div>
          </div>
        {/each}
      </div>
    </section>
  {/if}

  {#if $resume.education.length > 0}
    <section class="mb-6">
      <h2 class="font-bold uppercase border-b border-gray-400 mb-4 pb-1">
        Education
      </h2>
      {#each $resume.education as edu}
        <div class="mb-3">
          <div class="flex justify-between">
            <span class="font-bold">{edu.school}</span>
            <span>{edu.date}</span>
          </div>
          <div>{edu.degree} in {edu.major}</div>
        </div>
      {/each}
    </section>
  {/if}

  {#if $resume.skills}
    <section class="mb-6">
      <h2 class="font-bold uppercase border-b border-gray-400 mb-3 pb-1">
        Skills
      </h2>
      <div class="rich-text-content">{@html $resume.skills}</div>
    </section>
  {/if}
</div>

<style>
  /* Ensure bullets render correctly in the preview */
  :global(.rich-text-content ul) {
    list-style-type: disc;
    margin-left: 1.5rem;
  }
  :global(.rich-text-content li) {
    margin-bottom: 0.25rem;
  }
</style>
