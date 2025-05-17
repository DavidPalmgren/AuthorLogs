<template>
  <span v-if="justSaved" class="save-indicator">✓ Saved</span>

  <div :style="{ '--bg-color': bgColor }">
    <EditorToolbar
      :bgColor="bgColor"
      :textColor="textColor"
      @update:bgColor="bgColor = $event"
      @update:textColor="textColor = $event"
      @bold="toggleBold"
      @italic="toggleItalic"
      @heading="toggleHeading"
    />
    <EditorContent :editor="editor" class="editor" />
  </div>
</template>

<script lang='ts' setup>
import { onBeforeUnmount, ref, watch } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import EditorToolbar from './EditorToolbar.vue'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'

const bgColor = ref('#000000')
const textColor = ref('#cccccc')
const savedContent = localStorage.getItem('novel-content') || '<p>Start your novel...</p>'

watch(textColor, (color) => {
  editor.chain().focus().setColor(color).run()
})

const justSaved = ref(false)

const saveProgress = () => {
  const content = editor.getHTML()
  localStorage.setItem('novel-content', content)
  justSaved.value = true
  setTimeout(() => (justSaved.value = false), 1000)
}

const interval = setInterval(saveProgress, 60000)


const editor = new Editor({
  extensions: [
    StarterKit,
    Color.configure({
      types: ['textStyle'],
    }),
    TextStyle,
  ],
  content: savedContent,
})

const handleBeforeUnload = () => {
  localStorage.setItem('novel-content', editor.getHTML())
}

window.addEventListener('beforeunload', handleBeforeUnload)

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
  clearInterval(interval)
  editor.destroy()
})

const toggleBold = () => editor.chain().focus().toggleBold().run()
const toggleItalic = () => editor.chain().focus().toggleItalic().run()
const toggleHeading = (level: number) =>
  editor.chain().focus().toggleHeading({ level }).run()
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

.save-indicator {
  margin-left: 1rem;
  color: green;
  font-weight: bold;
  transition: opacity 0.5s ease;
}


</style>
