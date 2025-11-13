import type { Directive, DirectiveBinding } from 'vue'

interface ClickOutsideEl extends HTMLElement {
    __clickOutsideHandler?: (e: MouseEvent) => void
}

const ClickOutside: Directive = {
    mounted(el: ClickOutsideEl, binding: DirectiveBinding) {
        const handler = (e: MouseEvent) => {
            if (!el.contains(e.target as Node)) {
                binding.value(e)
            }
        }
        el.__clickOutsideHandler = handler
        document.addEventListener('click', handler)
    },
    unmounted(el: ClickOutsideEl) {
        const h = el.__clickOutsideHandler
        if (h) document.removeEventListener('click', h)
    }
}

export default ClickOutside