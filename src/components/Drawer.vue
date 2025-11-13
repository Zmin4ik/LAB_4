<template>
  <teleport to="body">
    <div v-if="visible" class="drawer-backdrop" @click.self="close">
      <div class="drawer" :class="side" @click.stop>
        <slot />
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch } from 'vue'

const props = defineProps<{ modelValue: boolean; side?: 'right' | 'left' }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()

const visible = props.modelValue
watch(() => props.modelValue, (v) => emit('update:modelValue', v))

function close() {
  emit('update:modelValue', false)
}
</script>

<style scoped>
.drawer-backdrop{
  position: fixed; inset:0; background: rgba(0,0,0,0.4); display:flex; align-items:flex-start; justify-content:flex-end; z-index: 1000;
  transition: opacity .2s;
}
.drawer { width: 360px; max-width: 100%; background: #fff; min-height: 100vh; box-shadow: -8px 0 24px rgba(0,0,0,0.2); padding:16px; overflow:auto; }
.drawer.left { margin-right:auto; margin-left:0; }
</style>