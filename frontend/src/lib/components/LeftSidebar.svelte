<script>
  import Sidebar from './ui/Sidebar.svelte';
  import Card from './ui/Card.svelte';
  import TextInput from './ui/TextInput.svelte'; // Assuming this exports 'value' prop

  // 1. THE DATA STATE
  // This object holds all the resume data. 
  // Later, you will pass this to the Preview component.
  let resume = {
    basics: {
      name: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      url: ''
    },
    summary: '',
    experience: [], // Array of objects
    education: [],
    skills: '' 
  };

  // 2. HELPER FUNCTIONS
  function addExperience() {
    resume.experience = [...resume.experience, { id: Date.now(), role: '', company: '', date: '', description: '' }];
  }

  function removeExperience(id) {
    resume.experience = resume.experience.filter(job => job.id !== id);
  }
</script>

<Sidebar>
  <div slot="sidebar" class="flex flex-col gap-4 pb-20"> <Card title="Personal Details">
      <div class="flex flex-col gap-3">
        <TextInput label="Full Name" placeholder="e.g. John Doe" bind:value={resume.basics.name} />
        <TextInput label="Job Title" placeholder="e.g. Software Engineer" bind:value={resume.basics.title} />
        <TextInput label="Email" type="email" bind:value={resume.basics.email} />
        <TextInput label="Phone" type="tel" bind:value={resume.basics.phone} />
        <TextInput label="Location" placeholder="City, Country" bind:value={resume.basics.location} />
        <TextInput label="LinkedIn / Website" bind:value={resume.basics.url} />
      </div>
    </Card>

    <Card title="Professional Summary">
      <div class="flex flex-col gap-2">
        <label class="text-xs font-bold text-gray-500 uppercase">Bio</label>
        <textarea 
          bind:value={resume.summary}
          class="w-full p-2 border border-gray-300 rounded text-sm min-h-[100px] focus:outline-none focus:border-amber-500"
          placeholder="Write 2-4 sentences about your experience..."
        ></textarea>
      </div>
    </Card>

    <Card title="Work Experience">
      <div class="flex flex-col gap-4">
        
        {#each resume.experience as job (job.id)}
          <div class="p-3 bg-gray-50 border border-gray-200 rounded relative">
            <button 
              class="absolute top-2 right-2 text-red-500 text-xs hover:underline" 
              on:click={() => removeExperience(job.id)}
            >
              Remove
            </button>

            <div class="flex flex-col gap-2 mt-2">
              <TextInput placeholder="Job Title" bind:value={job.role} />
              <TextInput placeholder="Company" bind:value={job.company} />
              <TextInput placeholder="Date (e.g. 2020 - Present)" bind:value={job.date} />
              <textarea 
                bind:value={job.description} 
                class="w-full p-2 border border-gray-300 rounded text-xs min-h-[60px]"
                placeholder="Key achievements..."
              ></textarea>
            </div>
          </div>
        {/each}

        <button 
          on:click={addExperience}
          class="w-full py-2 border-2 border-dashed border-gray-300 text-gray-500 text-sm font-bold rounded hover:border-amber-500 hover:text-amber-600 transition-colors"
        >
          + Add Position
        </button>
      </div>
    </Card>

    <Card title="Skills">
      <div class="flex flex-col gap-2">
        <label class="text-xs font-bold text-gray-500 uppercase">List of Skills</label>
        <textarea 
          bind:value={resume.skills}
          class="w-full p-2 border border-gray-300 rounded text-sm min-h-[80px]"
          placeholder="Java, Python, Leadership, Communication..."
        ></textarea>
        <p class="text-[10px] text-gray-400">Separate skills with a comma.</p>
      </div>
    </Card>

  </div>
</Sidebar>