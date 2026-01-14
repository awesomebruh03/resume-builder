<script>
  import { onMount, onDestroy } from 'svelte';
  import { Editor } from '@tiptap/core';

  import Document from '@tiptap/extension-document';
  import Paragraph from '@tiptap/extension-paragraph';
  import Text from '@tiptap/extension-text';
  import Bold from '@tiptap/extension-bold';
  import Italic from '@tiptap/extension-italic';
  import BulletList from '@tiptap/extension-bullet-list';
  import ListItem from '@tiptap/extension-list-item';
  import Placeholder from '@tiptap/extension-placeholder';

  // FIX 1: Import only the side-effect to register the web component
  import 'iconify-icon';

  export let value = '';
  export let placeholder = '';

  let element;
  let editor;

  onMount(() => {
    editor = new Editor({
      element: element,
      extensions: [
        Document,
        Paragraph,
        Text,
        Bold,
        Italic,
        BulletList,
        ListItem,
        Placeholder.configure({
          placeholder: placeholder,
        }),
      ],
      content: value,
      editorProps: {
        attributes: {
          class:
            'textarea textarea-bordered w-full h-full min-h-[8rem] focus:outline-none focus:border-white p-2 text-sm leading-relaxed overflow-y-auto max-w-none',
        },
      },
      onUpdate: ({ editor }) => {
        value = editor.getHTML();
      },
    });
  });

  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });

  $: if (editor && value !== editor.getHTML()) {
    editor.commands.setContent(value);
  }
</script>

<div
  class="flex flex-col border border-[#27272a] rounded-lg overflow-hidden bg-[#18181b] focus-within:border-white transition-colors"
>
  <div
    class="flex items-center gap-1 p-1 border-b border-[#27272a] bg-[#0e0e0e]"
  >
    <button
      on:click={() => editor.chain().focus().toggleBold().run()}
      class="btn btn-xs btn-ghost btn-square text-gray-500 hover:text-white"
      class:text-amber-500={editor?.isActive('bold')}
      class:bg-white-10={editor?.isActive('bold')}
      title="Bold"
      type="button"
    >
      <strong class="font-bold serif">B</strong>
    </button>

    <button
      on:click={() => editor.chain().focus().toggleItalic().run()}
      class="btn btn-xs btn-ghost btn-square text-gray-500 hover:text-white"
      class:text-amber-500={editor?.isActive('italic')}
      title="Italic"
      type="button"
    >
      <em class="italic font-serif">I</em>
    </button>

    <div class="w-px h-3 bg-gray-700 mx-1"></div>

    <button
      on:click={() => editor.chain().focus().toggleBulletList().run()}
      class="btn btn-xs btn-ghost btn-square text-gray-500 hover:text-white"
      class:text-amber-500={editor?.isActive('bulletList')}
      title="Bullet List"
      type="button"
    >
      <iconify-icon icon="mdi:format-list-bulleted" width="16"></iconify-icon>
    </button>
  </div>

  <div bind:this={element} class="w-full min-h-25 cursor-text"></div>
</div>

<style>
  :global(.ProseMirror) {
    outline: none;
    min-height: 100px;
    color: #e4e4e7;
  }

  /* --- Force List Styles --- */
  :global(.ProseMirror ul) {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  :global(.ProseMirror li) {
    margin-bottom: 0.25rem;
  }

  /* Placeholder Styling */
  :global(.ProseMirror p.is-editor-empty:first-child::before) {
    color: #52525b;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }
</style>