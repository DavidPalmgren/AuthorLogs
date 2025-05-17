<template>
  <div class="toolbar" :style="{ backgroundColor: bgColor }">
    <button @click="$emit('bold')">Bold</button>
    <button @click="$emit('italic')">Italic</button>
    <button @click="$emit('heading', 1)">H1</button>
    <button @click="$emit('heading', 2)">H2</button>
    <button @click="$emit('heading', 3)">H3</button>
    <button @click="$emit('heading', 4)">H4</button>
    <button @click="$emit('heading', 5)">H5</button>
    <button @click="$emit('heading', 6)">H6</button>

    <label class="color-picker">
      <span>BG</span>
      <input
        type="color"
        :value="bgColor"
        @input="$emit('update:bgColor', $event.target.value)"
      />
    </label>
    <label class="color-picker">
      <span>Text</span>
      <input
        type="color"
        :value="textColor"
        @input="$emit('update:textColor', $event.target.value)"
      />
    </label>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ bgColor: string; textColor: string }>()
defineEmits(['update:bgColor', 'update:textColor', 'bold', 'italic', 'heading'])
</script>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
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

.color-picker {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 5px;
  height: 45px;
  width: 100px;
  background-color: #1a1a1a;
  border-radius: 8px;
  color: white;
  padding: 0 10px;
  font-weight: bold;
  cursor: pointer;
}

.color-picker input[type="color"] {
  appearance: none;
  -webkit-appearance: none;
  border: none;
  padding: 0;
  background: none;
  width: 30px;
  height: 30px;
  cursor: pointer;
}
</style>
