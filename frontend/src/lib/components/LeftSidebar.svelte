<script>
  import Sidebar from './ui/Sidebar.svelte';
  import Card from './ui/Card.svelte';
  import { each } from 'svelte/internal';

  // 1. DATA STATE
  let resume = {
    basics: {
      name: '',
      email: '',
      phone: '',
      location: '',
      links: [''],
    },
    summary: '',
    experience: [],
    education: [],
    skills: '',
    custom: [],
  };

   function addLink() {
    resume.basics.links = [...resume.basics.links, '']; 
  }

  // --- ACTIONS ---

  function addExperience() {
    resume.experience = [
      ...resume.experience,
      {
        id: Date.now(),
        title: '',
        company: '',
        location: '',
        date: '',
        description: '',
      },
    ];
  }
  function removeExperience(id) {
    resume.experience = resume.experience.filter((item) => item.id !== id);
  }

  function addEducation() {
    resume.education = [
      ...resume.education,
      { id: Date.now(), degree: '', major: '', school: '', date: '' },
    ];
  }
  function removeEducation(id) {
    resume.education = resume.education.filter((item) => item.id !== id);
  }

  function addCustomSection() {
    resume.custom = [
      ...resume.custom,
      { id: Date.now(), title: 'Untitled Section', items: [] },
    ];
  }
  function removeCustomSection(sectionId) {
    resume.custom = resume.custom.filter((s) => s.id !== sectionId);
  }

  function addCustomItem(sectionId) {
    const sectionIndex = resume.custom.findIndex((s) => s.id === sectionId);
    if (sectionIndex === -1) return;
    const newItem = {
      id: Date.now(),
      title: '',
      subtitle: '',
      date: '',
      description: '',
    };
    resume.custom[sectionIndex].items = [
      ...resume.custom[sectionIndex].items,
      newItem,
    ];
  }

  function removeCustomItem(sectionId, itemId) {
    const sectionIndex = resume.custom.findIndex((s) => s.id === sectionId);
    if (sectionIndex === -1) return;
    resume.custom[sectionIndex].items = resume.custom[
      sectionIndex
    ].items.filter((i) => i.id !== itemId);
  }
</script>

<Sidebar side="left">
  <div slot="sidebar" class="flex flex-col gap-4 pb-20 p-2">
    <Card title="Contact Information">
      <div class="flex flex-col gap-3">
        <label class="form-control w-full">
          <div class="label py-1">
            <span class="label-text text-xs">Full Name</span>
          </div>
          <input
            type="text"
            placeholder="e.g. John Doe"
            class="input input-bordered input-sm w-full"
            bind:value={resume.basics.name}
          />
        </label>

        <label class="form-control w-full">
          <div class="label py-1">
            <span class="label-text text-xs">Phone Number</span>
          </div>
          <input
            type="tel"
            placeholder="+1 234 567 890"
            class="input input-bordered input-sm w-full"
            bind:value={resume.basics.phone}
          />
        </label>

        <label class="form-control w-full">
          <div class="label py-1">
            <span class="label-text text-xs">Email Address</span>
          </div>
          <input
            type="email"
            placeholder="john@example.com"
            class="input input-bordered input-sm w-full"
            bind:value={resume.basics.email}
          />
        </label>

        <label class="form-control w-full">
          <div class="label py-1">
            <span class="label-text text-xs">Location</span>
          </div>
          <input
            type="text"
            placeholder="City, State/Country"
            class="input input-bordered input-sm w-full"
            bind:value={resume.basics.location}
          />
        </label>

        <label class="form-control w-full">
          <div class="label py-1">
            <span class="label-text text-xs">Link (LinkedIn / GitHub)</span>
          </div>
          {#each resume.basics.links as links, i}
            <input
              type="text"
              placeholder="linkedin.com..."
              class="input input-bordered input-sm w-full mb-2"
              bind:value={resume.basics.links[i]}
            />
          {/each}
          <button class="btn btn-wide btn-dash bg-[#0e0e0f] mt-6" on:click={addLink}
            >Add another link</button
          >
        </label>
      </div>
    </Card>

    <Card title="Professional Summary">
      <label class="form-control">
        <div class="label py-1">
          <span class="label-text text-xs">Summary</span>
        </div>
        <textarea
          class="textarea textarea-bordered h-24 text-sm leading-tight"
          placeholder="Briefly describe your experience..."
          bind:value={resume.summary}
        ></textarea>
      </label>
    </Card>

    <Card title="Work Experience">
      <div class="flex flex-col gap-4">
        {#each resume.experience as job (job.id)}
          <div
            class="p-3 bg-base-200 rounded-box border border-base-300 relative group"
          >
            <button
              class="btn btn-xs btn-circle btn-ghost absolute top-2 right-2 text-error"
              on:click={() => removeExperience(job.id)}>✕</button
            >

            <div class="flex flex-col gap-2 mt-1">
              <input
                type="text"
                placeholder="Job Title"
                class="input input-bordered input-sm w-full font-bold"
                bind:value={job.title}
              />
              <input
                type="text"
                placeholder="Company Name"
                class="input input-ghost input-sm w-full"
                bind:value={job.company}
              />

              <div class="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Location"
                  class="input input-ghost input-xs w-full text-gray-500"
                  bind:value={job.location}
                />
                <input
                  type="text"
                  placeholder="Dates"
                  class="input input-ghost input-xs w-full text-gray-500 text-right"
                  bind:value={job.date}
                />
              </div>

              <textarea
                class="textarea textarea-bordered textarea-sm w-full mt-2"
                placeholder="• Achieved X using Y&#10;• Led a team of..."
                bind:value={job.description}
              ></textarea>
            </div>
          </div>
        {/each}

        <button
          on:click={addExperience}
          class="btn btn-outline btn-sm w-full border-dashed">+ Add Job</button
        >
      </div>
    </Card>

    <Card title="Education">
      <div class="flex flex-col gap-4">
        {#each resume.education as edu (edu.id)}
          <div
            class="p-3 bg-base-200 rounded-box border border-base-300 relative group"
          >
            <button
              class="btn btn-xs btn-circle btn-ghost absolute top-2 right-2 text-error"
              on:click={() => removeEducation(edu.id)}>✕</button
            >

            <div class="flex flex-col gap-2 mt-1">
              <input
                type="text"
                placeholder="Degree Name (e.g. BSc)"
                class="input input-bordered input-sm w-full font-bold"
                bind:value={edu.degree}
              />
              <input
                type="text"
                placeholder="Major (e.g. Computer Science)"
                class="input input-ghost input-sm w-full"
                bind:value={edu.major}
              />
              <input
                type="text"
                placeholder="University / School"
                class="input input-ghost input-sm w-full"
                bind:value={edu.school}
              />
              <input
                type="text"
                placeholder="Graduation Date"
                class="input input-ghost input-xs w-full text-gray-500"
                bind:value={edu.date}
              />
            </div>
          </div>
        {/each}

        <button
          on:click={addEducation}
          class="btn btn-outline btn-sm w-full border-dashed"
          >+ Add Education</button
        >
      </div>
    </Card>

    <Card title="Skills">
      <label class="form-control">
        <div class="label py-1">
          <span class="label-text text-xs">Hard & Soft Skills</span>
        </div>
        <textarea
          class="textarea textarea-bordered h-20"
          placeholder="Java, Python, Communication, Leadership..."
          bind:value={resume.skills}
        ></textarea>
        <div class="label">
          <span class="label-text-alt text-gray-500">Separate with commas</span>
        </div>
      </label>
    </Card>

    {#each resume.custom as section (section.id)}
      <Card title="">
        <div slot="title" class="flex items-center gap-2 w-full pr-8">
          <input
            type="text"
            class="input input-ghost input-sm w-full font-bold text-gray-700 px-0 focus:bg-transparent"
            bind:value={section.title}
          />
        </div>

        <button
          class="btn btn-xs btn-circle btn-ghost absolute top-4 right-4 text-error"
          on:click={() => removeCustomSection(section.id)}
          title="Delete Section">✕</button
        >

        <div class="flex flex-col gap-4 mt-2">
          {#each section.items as item (item.id)}
            <div
              class="p-3 bg-base-200 rounded-box border border-base-300 relative"
            >
              <button
                class="btn btn-xs btn-circle btn-ghost absolute top-1 right-1 text-gray-400 hover:text-error"
                on:click={() => removeCustomItem(section.id, item.id)}>✕</button
              >

              <div class="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Title (e.g. Project Name)"
                  class="input input-bordered input-xs w-full font-bold"
                  bind:value={item.title}
                />
                <input
                  type="text"
                  placeholder="Subtitle (e.g. Role)"
                  class="input input-ghost input-xs w-full"
                  bind:value={item.subtitle}
                />
                <input
                  type="text"
                  placeholder="Date / Location"
                  class="input input-ghost input-xs w-full text-gray-500"
                  bind:value={item.date}
                />
                <textarea
                  class="textarea textarea-bordered textarea-xs w-full"
                  placeholder="Description..."
                  bind:value={item.description}
                ></textarea>
              </div>
            </div>
          {/each}
          <button
            on:click={() => addCustomItem(section.id)}
            class="btn btn-outline btn-xs border-dashed w-full text-gray-500"
            >+ Add Item</button
          >
        </div>
      </Card>
    {/each}

    <div class="pt-4 border-t border-base-200">
      <button
        on:click={addCustomSection}
        class="btn btn-ghost btn-sm w-full text-gray-500 gap-2"
      >
        <span class="text-lg">+</span> Add Custom Section
      </button>
    </div>
  </div>
</Sidebar>
