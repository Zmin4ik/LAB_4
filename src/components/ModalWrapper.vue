<template>
  <teleport to="body">
    <div v-if="show" class="modal-backdrop" @click.self="close">
      <div class="modal-box">
        <slot />
        <div class="modal-actions">
          <button @click="close">Закрити</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits<{ (e: 'update:show', value: boolean): void }>()

function close() {
  emit('update:show', false)
}
</script>

<style scoped>
.modal-backdrop{ position:fixed; inset:0; display:flex; align-items:center; justify-content:center; background: rgba(0,0,0,0.45); z-index:2000 }
.modal-box{ background:#fff; padding:16px; border-radius:8px; min-width:280px; max-width:90%; }
.modal-actions{ margin-top:12px; text-align:right; }
</style>