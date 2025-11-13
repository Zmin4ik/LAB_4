import type { Directive, DirectiveBinding } from 'vue'

function createTooltipEl(text: string): HTMLElement {
    const el = document.createElement('div')
    el.className = 'simple-tooltip'
    el.textContent = text
    Object.assign(el.style, {
        position: 'fixed',
        padding: '6px 8px',
        background: 'rgba(0,0,0,0.8)',
        color: '#fff',
        borderRadius: '4px',
        zIndex: '9999',
        pointerEvents: 'none',
        fontSize: '12px',
        maxWidth: '320px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    })
    return el
}

interface TooltipEl extends HTMLElement {
    __tooltipHandlers?: {
        show: (e: MouseEvent) => void
        move: (e: MouseEvent) => void
        hide: () => void
    }
}

const TooltipDirective: Directive = {
    mounted(el: TooltipEl, binding: DirectiveBinding) {
        const min = binding.arg ? Number(binding.arg) : 20
        const text = binding.value ?? el.textContent ?? ''
        let tooltipEl: HTMLElement | null = null

        function show(e: MouseEvent) {
            if (String(text).length < min) return
            tooltipEl = createTooltipEl(String(text))
            document.body.appendChild(tooltipEl)
            tooltipEl.style.left = `${e.clientX + 10}px`
            tooltipEl.style.top = `${e.clientY + 12}px`
        }

        function move(e: MouseEvent) {
            if (!tooltipEl) return
            tooltipEl.style.left = `${e.clientX + 10}px`
            tooltipEl.style.top = `${e.clientY + 12}px`
        }

        function hide() {
            if (tooltipEl && tooltipEl.parentElement)
                tooltipEl.parentElement.removeChild(tooltipEl)
            tooltipEl = null
        }

        el.__tooltipHandlers = { show, move, hide }

        el.addEventListener('mouseenter', show)
        el.addEventListener('mousemove', move)
        el.addEventListener('mouseleave', hide)
    },
    unmounted(el: TooltipEl) {
        const h = el.__tooltipHandlers
        if (h) {
            el.removeEventListener('mouseenter', h.show)
            el.removeEventListener('mousemove', h.move)
            el.removeEventListener('mouseleave', h.hide)
        }
    }
}

export default TooltipDirective