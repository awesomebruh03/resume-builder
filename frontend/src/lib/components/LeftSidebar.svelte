<script>
  import Sidebar from './ui/Sidebar.svelte';
  import Card from './ui/Card.svelte';
  import RichTextEditor from './ui/RichTextEditor.svelte';
  import 'iconify-icon';

  import { resume } from '../stores/resumeStore';
  import { design } from '../stores/designStore';

  // 1. UI STATE
  let activeBlock = null;

  // 2. DEBOUNCE UTILITY (Fixes Performance)
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  // The Trigger: Only updates the store (and pagination) 500ms after typing stops
  const triggerUpdate = debounce(() => {
    $resume = $resume;
  }, 500);

  // --- UI HELPERS ---
  function closeAll() {
    activeBlock = null;
  }

  function openBlock(e, blockName) {
    e.stopPropagation();
    closeAll();
    activeBlock = blockName;
  }

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

  // --- ACTIONS ---

  function addLink() {
    $resume.basics.links = [...$resume.basics.links, ''];
    triggerUpdate();
  }

  // --- EXPERIENCE ---
  function addExperience() {
    const newItem = {
      id: Date.now(),
      title: 'New Position',
      company: '',
      location: '',
      date: '',
      description: '',
    };
    $resume.experience = [...$resume.experience, newItem];
    setTimeout(() => (activeBlock = newItem.id), 10);
    triggerUpdate();
  }

  function removeExperience(id) {
    $resume.experience = $resume.experience.filter((item) => item.id !== id);
    triggerUpdate();
  }

  // --- EDUCATION ---
  function addEducation() {
    const newItem = {
      id: Date.now(),
      degree: 'New Degree',
      major: '',
      school: '',
      date: '',
    };
    $resume.education = [...$resume.education, newItem];
    setTimeout(() => (activeBlock = newItem.id), 10);
    triggerUpdate();
  }

  function removeEducation(id) {
    $resume.education = $resume.education.filter((item) => item.id !== id);
    triggerUpdate();
  }

  // --- CUSTOM SECTIONS (CRITICAL FIXES) ---

  function addCustomSection() {
    // Generate a unique string ID to avoid type conflicts
    const newId = 'cust-' + Date.now();
    const newTitle = 'New Section';

    // 1. Add to Data Store
    $resume.custom = [
      ...$resume.custom,
      { id: newId, title: newTitle, items: [] },
    ];

    // 2. Add to Visual Order (So it appears in Right Sidebar & Paginator)
    $design.sectionOrder = [
      ...$design.sectionOrder,
      { id: newId, name: newTitle },
    ];

    triggerUpdate();
  }

  function removeCustomSection(id) {
    // 1. Remove from Data
    $resume.custom = $resume.custom.filter((s) => s.id !== id);
    // 2. Remove from Sort Order
    $design.sectionOrder = $design.sectionOrder.filter((s) => s.id !== id);

    triggerUpdate();
  }

  // Sync Title Change to Sort Order
  function updateSectionName(id, newName) {
    const index = $design.sectionOrder.findIndex((s) => s.id === id);
    if (index !== -1) {
      // Create a copy to trigger Svelte reactivity
      const newOrder = [...$design.sectionOrder];
      newOrder[index].name = newName;
      $design.sectionOrder = newOrder;
    }
    // No triggerUpdate needed here as the input calling this will handle it
  }

  function addCustomItem(sectionId) {
    const sectionIndex = $resume.custom.findIndex((s) => s.id === sectionId);
    if (sectionIndex === -1) return;
    const newItem = {
      id: Date.now(),
      title: 'New Item',
      subtitle: '',
      date: '',
      description: '',
    };
    $resume.custom[sectionIndex].items = [
      ...$resume.custom[sectionIndex].items,
      newItem,
    ];
    setTimeout(() => (activeBlock = newItem.id), 10);
    triggerUpdate();
  }

  function removeCustomItem(sectionId, itemId) {
    const sectionIndex = $resume.custom.findIndex((s) => s.id === sectionId);
    if (sectionIndex === -1) return;
    $resume.custom[sectionIndex].items = $resume.custom[
      sectionIndex
    ].items.filter((i) => i.id !== itemId);
    triggerUpdate();
  }

  // Helper for Character Count Color
  function getLenColor(len, max) {
    if (len > max) return 'text-red-500 font-bold';
    if (len > max * 0.8) return 'text-amber-500';
    return 'text-gray-500';
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
            <div class="font-bold text-sm text-gray-800">
              {$resume.basics.name || 'Your Name'}
            </div>
            <div class="text-xs text-gray-500 truncate">
              {$resume.basics.title || 'Job Title'}
            </div>
          </div>
          <div class="opacity-0 group-hover:opacity-100 transition-opacity">
            <button class="btn btn-xs btn-square btn-ghost"
              ><iconify-icon icon="mdi:pencil"></iconify-icon></button
            >
          </div>
        </div>
      {:else}
        <div
          class="p-4 bg-base-100 rounded-lg shadow-xl ring-1 ring-black/5 relative"
          on:click={keepOpen}
        >
          <div class="flex flex-col gap-3">
            <label class="form-control w-full">
              <div class="label py-1">
                <span
                  class="label-text text-xs text-gray-500 uppercase font-bold"
                  >Full Name</span
                >
              </div>
              <input
                type="text"
                placeholder="e.g. John Doe"
                class="input input-bordered input-sm w-full"
                bind:value={$resume.basics.name}
                on:input={triggerUpdate}
                on:keydown={handleEnterKey}
              />
            </label>

            <label class="form-control w-full">
              <div class="label py-1">
                <span
                  class="label-text text-xs text-gray-500 uppercase font-bold"
                  >Job Title</span
                >
              </div>
              <input
                type="text"
                placeholder="e.g. Product Designer"
                class="input input-bordered input-sm w-full"
                bind:value={$resume.basics.title}
                on:input={triggerUpdate}
                on:keydown={handleEnterKey}
              />
            </label>

            <div class="grid grid-cols-2 gap-2">
              <label class="form-control w-full">
                <div class="label py-1">
                  <span
                    class="label-text text-xs text-gray-500 uppercase font-bold"
                    >Phone</span
                  >
                </div>
                <input
                  type="tel"
                  placeholder="+1 234..."
                  class="input input-bordered input-sm w-full"
                  bind:value={$resume.basics.phone}
                  on:input={triggerUpdate}
                  on:keydown={handleEnterKey}
                />
              </label>
              <label class="form-control w-full">
                <div class="label py-1">
                  <span
                    class="label-text text-xs text-gray-500 uppercase font-bold"
                    >Location</span
                  >
                </div>
                <input
                  type="text"
                  placeholder="City"
                  class="input input-bordered input-sm w-full"
                  bind:value={$resume.basics.location}
                  on:input={triggerUpdate}
                  on:keydown={handleEnterKey}
                />
              </label>
            </div>

            <label class="form-control w-full">
              <div class="label py-1">
                <span
                  class="label-text text-xs text-gray-500 uppercase font-bold"
                  >Email</span
                >
              </div>
              <input
                type="email"
                placeholder="john@example.com"
                class="input input-bordered input-sm w-full"
                bind:value={$resume.basics.email}
                on:input={triggerUpdate}
                on:keydown={handleEnterKey}
              />
            </label>

            <label class="form-control w-full">
              <div class="label py-1">
                <span
                  class="label-text text-xs text-gray-500 uppercase font-bold"
                  >Links</span
                >
              </div>
              {#each $resume.basics.links as links, i}
                <div class="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="linkedin.com..."
                    class="input input-bordered input-sm w-full"
                    bind:value={$resume.basics.links[i]}
                    on:input={triggerUpdate}
                    on:keydown={handleEnterKey}
                  />
                  {#if i > 0}
                    <button
                      class="btn btn-sm btn-square btn-ghost text-error"
                      on:click={() => {
                        $resume.basics.links = $resume.basics.links.filter(
                          (_, idx) => idx !== i,
                        );
                        triggerUpdate();
                      }}>✕</button
                    >
                  {/if}
                </div>
              {/each}
              <button
                class="btn btn-xs btn-ghost w-full mt-1 text-gray-500"
                on:click={addLink}>+ Add Link</button
              >
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
            <div class="text-xs text-gray-600 line-clamp-3">
              {@html $resume.summary}
            </div>
          {:else}
            <div class="text-xs text-gray-400 italic">
              Click to add a professional summary...
            </div>
          {/if}
        </div>
      {:else}
        <div
          class="p-1 bg-base-100 rounded-lg shadow-xl ring-1 ring-black/5"
          on:click={keepOpen}
        >
          <div class="flex justify-end px-2 py-1">
            <span
              class="text-[10px] font-mono {getLenColor(
                $resume.summary.length,
                800,
              )}"
            >
              {$resume.summary.length} / 800
            </span>
          </div>
          <RichTextEditor
            bind:value={$resume.summary}
            on:input={triggerUpdate}
            placeholder="Write 2-4 sentences about your career..."
          />
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
                <div class="font-bold text-sm text-gray-800 truncate">
                  {job.title || 'New Position'}
                </div>
                <div class="text-xs text-gray-500 truncate">
                  {job.company || 'Company'}
                </div>
              </div>
              <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  class="btn btn-xs btn-square btn-ghost text-error"
                  on:click|stopPropagation={() => removeExperience(job.id)}
                >
                  <iconify-icon icon="mdi:trash-can-outline"></iconify-icon>
                </button>
              </div>
            </div>
          {:else}
            <div
              class="p-4 bg-base-100 rounded-lg shadow-xl ring-1 ring-black/5 relative"
              on:click={keepOpen}
            >
              <div class="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Job Title"
                  class="input input-bordered input-sm w-full font-bold"
                  bind:value={job.title}
                  on:input={triggerUpdate}
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  class="input input-bordered input-sm w-full"
                  bind:value={job.company}
                  on:input={triggerUpdate}
                />
                <div class="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Location"
                    class="input input-bordered input-sm w-full"
                    bind:value={job.location}
                    on:input={triggerUpdate}
                  />
                  <input
                    type="text"
                    placeholder="Dates"
                    class="input input-bordered input-sm w-full"
                    bind:value={job.date}
                    on:input={triggerUpdate}
                  />
                </div>
                <div class="mt-1">
                  <div class="flex justify-between items-center px-1">
                    <span
                      class="label-text text-xs text-gray-500 uppercase font-bold"
                      >Achievements</span
                    >
                    <span
                      class="text-[10px] font-mono {getLenColor(
                        job.description.length,
                        600,
                      )}"
                    >
                      {job.description.length} / 600
                    </span>
                  </div>
                  <RichTextEditor
                    bind:value={job.description}
                    on:input={triggerUpdate}
                    placeholder="• Led a team of..."
                  />
                </div>
              </div>
            </div>
          {/if}
        {/each}
        <button
          on:click|stopPropagation={addExperience}
          class="btn btn-outline btn-sm w-full border-dashed"
          >+ Add Position</button
        >
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
                <div class="font-bold text-sm text-gray-800 truncate">
                  {edu.school || 'University'}
                </div>
                <div class="text-xs text-gray-500 truncate">
                  {edu.degree || 'Degree'}
                </div>
              </div>
              <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  class="btn btn-xs btn-square btn-ghost text-error"
                  on:click|stopPropagation={() => removeEducation(edu.id)}
                >
                  <iconify-icon icon="mdi:trash-can-outline"></iconify-icon>
                </button>
              </div>
            </div>
          {:else}
            <div
              class="p-4 bg-base-100 rounded-lg shadow-xl ring-1 ring-black/5 relative"
              on:click={keepOpen}
            >
              <div class="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="School"
                  class="input input-bordered input-sm w-full font-bold"
                  bind:value={edu.school}
                  on:input={triggerUpdate}
                />
                <input
                  type="text"
                  placeholder="Degree"
                  class="input input-bordered input-sm w-full"
                  bind:value={edu.degree}
                  on:input={triggerUpdate}
                />
                <input
                  type="text"
                  placeholder="Major"
                  class="input input-bordered input-sm w-full"
                  bind:value={edu.major}
                  on:input={triggerUpdate}
                />
                <input
                  type="text"
                  placeholder="Date"
                  class="input input-bordered input-sm w-full"
                  bind:value={edu.date}
                  on:input={triggerUpdate}
                />
              </div>
            </div>
          {/if}
        {/each}
        <button
          on:click|stopPropagation={addEducation}
          class="btn btn-outline btn-sm w-full border-dashed"
          >+ Add Education</button
        >
      </div>
    </Card>

    <Card title="Skills">
      {#if activeBlock !== 'skills'}
        <div
          class="bg-base-100 border border-base-300 rounded-lg p-3 hover:border-gray-400 transition-colors cursor-pointer group shadow-sm min-h-[3rem]"
          on:click={(e) => openBlock(e, 'skills')}
        >
          {#if $resume.skills}
            <div class="text-xs text-gray-600 line-clamp-3">
              {@html $resume.skills}
            </div>
          {:else}
            <div class="text-xs text-gray-400 italic">
              Click to add skills...
            </div>
          {/if}
        </div>
      {:else}
        <div
          class="p-1 bg-base-100 rounded-lg shadow-xl ring-1 ring-black/5"
          on:click={keepOpen}
        >
          <RichTextEditor
            bind:value={$resume.skills}
            on:input={triggerUpdate}
            placeholder="Java, Python, Leadership..."
          />
          <div class="label px-2">
            <span class="label-text-alt text-gray-500"
              >Separate skills with commas</span
            >
          </div>
        </div>
      {/if}
    </Card>

    {#each $resume.custom as section (section.id)}
      <Card title="">
        <div slot="title" class="flex items-center gap-2 w-full pr-8">
          <input
            type="text"
            class="input input-ghost input-sm w-full font-bold text-gray-100 px-0 focus:bg-transparent placeholder:text-gray-500"
            bind:value={section.title}
            on:input={(e) => {
              updateSectionName(section.id, e.target.value);
              triggerUpdate();
            }}
            on:click={keepOpen}
            placeholder="Section Name (e.g. Publications)"
          />
        </div>

        <button
          class="btn btn-xs btn-circle btn-ghost absolute top-4 right-4 text-error"
          on:click={() => removeCustomSection(section.id)}>✕</button
        >

        <div class="flex flex-col gap-3 mt-2">
          {#each section.items as item (item.id)}
            {#if activeBlock !== item.id}
              <div
                class="bg-base-100 border border-base-300 rounded-lg p-3 hover:border-gray-400 transition-colors cursor-pointer group flex justify-between items-center shadow-sm"
                on:click={(e) => openItem(e, item.id)}
              >
                <div class="truncate pr-2">
                  <div class="font-bold text-sm text-gray-200 truncate">
                    {item.title || 'New Item'}
                  </div>
                  <div class="text-xs text-gray-500 truncate">
                    {item.subtitle || 'Subtitle'}
                  </div>
                </div>
                <div
                  class="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <button
                    class="btn btn-xs btn-square btn-ghost text-error"
                    on:click|stopPropagation={() =>
                      removeCustomItem(section.id, item.id)}
                  >
                    <iconify-icon icon="mdi:trash-can-outline"></iconify-icon>
                  </button>
                </div>
              </div>
            {:else}
              <div
                class="p-4 bg-base-100 rounded-lg shadow-xl ring-1 ring-black/5 relative"
                on:click={keepOpen}
              >
                <div class="flex flex-col gap-3">
                  <label class="form-control w-full">
                    <div class="label py-0 pb-1">
                      <span
                        class="label-text text-[10px] uppercase font-bold text-gray-500"
                        >Item Title</span
                      >
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. Project Name / Book Title"
                      class="input input-bordered input-sm w-full font-bold"
                      bind:value={item.title}
                      on:input={triggerUpdate}
                    />
                  </label>

                  <div class="grid grid-cols-3 gap-2">
                    <label class="form-control w-full col-span-2">
                      <div class="label py-0 pb-1">
                        <span
                          class="label-text text-[10px] uppercase font-bold text-gray-500"
                          >Subtitle / Role</span
                        >
                      </div>
                      <input
                        type="text"
                        placeholder="e.g. Publisher / Role"
                        class="input input-bordered input-sm w-full"
                        bind:value={item.subtitle}
                        on:input={triggerUpdate}
                      />
                    </label>

                    <label class="form-control w-full">
                      <div class="label py-0 pb-1">
                        <span
                          class="label-text text-[10px] uppercase font-bold text-gray-500"
                          >Date</span
                        >
                      </div>
                      <input
                        type="text"
                        placeholder="2023"
                        class="input input-bordered input-sm w-full"
                        bind:value={item.date}
                        on:input={triggerUpdate}
                      />
                    </label>
                  </div>

                  <div class="mt-1">
                    <div class="flex justify-between items-center px-1">
                      <div class="label py-0 pb-1">
                        <span
                          class="label-text text-[10px] uppercase font-bold text-gray-500"
                          >Description</span
                        >
                      </div>
                      <span
                        class="text-[10px] font-mono {getLenColor(
                          item.description.length,
                          600,
                        )}"
                      >
                        {item.description.length} / 600
                      </span>
                    </div>
                    <RichTextEditor
                      bind:value={item.description}
                      on:input={triggerUpdate}
                      placeholder="Description..."
                    />
                  </div>
                </div>
              </div>
            {/if}
          {/each}
          <button
            on:click|stopPropagation={() => addCustomItem(section.id)}
            class="btn btn-outline btn-xs border-dashed w-full text-gray-500"
            >+ Add Item</button
          >
        </div>
      </Card>
    {/each}

    <div class="pt-4 border-t border-base-200">
      <button
        on:click|stopPropagation={addCustomSection}
        class="btn btn-ghost btn-sm w-full text-gray-500 gap-2"
      >
        <span class="text-lg">+</span> Add Custom Section
      </button>
    </div>
  </div>
</Sidebar>
