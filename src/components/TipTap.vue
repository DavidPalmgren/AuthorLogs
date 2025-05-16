<template>
  <div :style="{ '--bg-color': bgColor }">
    <div class="toolbar mb-2" :style="{ backgroundColor: bgColor }" style="display: flex; align-items: center; justify-content: center;" >

      <button @click="toggleBold">Bold</button>
      <button @click="toggleItalic">Italic</button>
      <button @click="toggleHeading(1)">H1</button>
      <button @click="toggleHeading(2)">H2</button>
      <input type="color" v-model="bgColor"></input>
    </div>

    <EditorContent :editor="editor" class="editor" />
  </div>
</template>


<script lang='ts' setup>
import { onBeforeUnmount, ref } from 'vue';
import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';

const bgColor = ref('#cccccc')

const editor = new Editor({
  extensions: [StarterKit],
  content: '<p>Start your novel...</p>',
});

onBeforeUnmount(() => {
  editor.destroy();
});

const toggleBold = () => editor.chain().focus().toggleBold().run();
const toggleItalic = () => editor.chain().focus().toggleItalic().run();
const toggleHeading = (level) =>
  editor.chain().focus().toggleHeading({ level }).run();

</script>

<style scoped>
.editor {
  margin-top: 50px;
  margin-bottom: 50px;
}

::v-deep(.ProseMirror) {
  min-height: 300px;
  min-width: 1080px;
  padding: 1rem;
  border: 1px solid #ddd;
  line-height: 1.75;
  font-family: 'Georgia', serif;
  background-color: var(--bg-color, #cccccc);
  transition: background-color 0.3s ease;
}

button {
  margin: 5px;
  color: white;
  background-color: #1a1a1a;
  cursor: pointer;
  height: 45px;
  width: 80px;
  border: 1px solid transparent;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.toolbar input[type="color"] {
  margin: 5px;
  height: 45px;
  width: 80px;
  padding: 0;
  border: 1px solid transparent;
  background-color: #1a1a1a;
  border-radius: 5px;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
}

</style>