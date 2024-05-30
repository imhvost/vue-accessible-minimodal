<script setup lang="ts">
import { computed, inject } from 'vue';
import { configInject } from '../lib';

export interface Props {
  id: string;
  closeBtn?: boolean;
  valign?: 'top' | 'bottom' | 'center';
  zIndex?: number | string;
  customStyle?: boolean;
}

const config = inject(configInject, {});

const props = withDefaults(defineProps<Props>(), {
  closeBtn: () => true,
  zIndex: () => 600,
});

const emit = defineEmits([
  'before-open',
  'before-close',
  'after-open',
  'before-close',
]);

const isUseStyle = computed(() => {
  return config.style?.use ? false : !props.customStyle;
});

const width = computed(() => config.style?.width);

const duration = computed(() => config.animationDuration);

const margin = computed(() => {
  const valign = props.valign || config.style?.valign;
  switch (valign) {
    case 'top':
      return '0 auto auto';
    case 'bottom':
      return 'auto auto 0';
    default:
      return 'auto';
  }
});

const transform = computed(() => {
  switch (config.style?.animation) {
    case 'from-top':
      return `translateY( calc(var(--accessible-minimodal-translate) * -1) )`;
    case 'from-left':
      return `translateX( calc(var(--accessible-minimodal-translate) * -1) )`;
    case 'from-right':
      return `translateX(var(--accessible-minimodal-translate))`;
    case 'zoom-in':
      return 'scale(.8)';
    case 'zoom-out':
      return 'scale(1.2)';
    case 'fade':
      return 'none';
    default:
      return `translateY(var(--accessible-minimodal-translate))`;
  }
});
</script>

<template>
  <div
    :id="id"
    aria-hidden="true"
    :class="[id, config.classes?.modal, isUseStyle && 'modal-component']"
    :style="{
      'z-index': zIndex,
    }"
    ref="modalRef"
    @accessible-minimodal:before-open="emit('before-open', $event)"
    @accessible-minimodal:before-close="emit('before-close', $event)"
    @accessible-minimodal:after-open="emit('after-open', $event)"
    @accessible-minimodal:after-close="emit('before-open', $event)"
  >
    <div
      tabindex="-1"
      :class="[config.classes?.wrapp, isUseStyle && 'modal-component-wrapp']"
    >
      <div
        role="dialog"
        aria-modal="true"
        :class="[config.classes?.body, isUseStyle && 'modal-component-body']"
      >
        <button
          v-if="closeBtn"
          type="button"
          :class="[
            config.classes?.closeBtn,
            isUseStyle && 'modal-component-close-btn',
          ]"
          :data-modal-close="id"
          aria-label="🗙"
        >
          <slot name="closeBtn"></slot>
        </button>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-component {
  --accessible-minimodal-color: #333;
  --accessible-minimodal-bg: #fff;
  --accessible-minimodal-filter: rgba(0, 0, 0, 0.7);
  --accessible-minimodal-z-index: 666666;
  --accessible-minimodal-padding: 40px;
  --accessible-minimodal-border-radius: 4px;
  --accessible-minimodal-translate: 20px;
  --accessible-minimodal-scale-in: 0.8;
  --accessible-minimodal-scale-out: 1.2;
  position: fixed;
  inset: 0;
  z-index: calc(var(--accessible-minimodal-z-index) + v-bind(zIndex));
  transition-property: opacity, visibility;
  box-sizing: border-box;
  * {
    box-sizing: inherit;
  }
  &:not(.active) {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
  &.open,
  &.close {
    transition-duration: calc(v-bind(duration) * 1ms);
  }
  &.active {
    .modal-component-body {
      transform: none;
    }
  }
}

.modal-component-wrapp {
  height: 100%;
  display: flex;
  background-color: var(--accessible-minimodal-filter);
  padding: var(--accessible-minimodal-padding)
    calc(var(--accessible-minimodal-padding) / 2);
  overflow-y: scroll;
}

.modal-component-body {
  background-color: var(--accessible-minimodal-bg);
  color: var(--accessible-minimodal-color);
  flex: none;
  min-height: 0;
  border-radius: var(--accessible-minimodal-border-radius);
  width: calc(v-bind(width) * 1px);
  max-width: 100%;
  margin: v-bind(margin);
  padding: var(--accessible-minimodal-padding);
  transform: v-bind(transform);
  position: relative;
  transition-duration: calc(v-bind(duration) * 1ms);
  transition-property: transform;
}

.modal-component-close-btn {
  position: absolute;
  right: calc(var(--accessible-minimodal-padding) / 4);
  top: calc(var(--accessible-minimodal-padding) / 4);
  border: 0;
  background: none;
  cursor: pointer;
  &:empty {
    font-size: 0;
    width: calc(var(--accessible-minimodal-padding) / 2);
    height: calc(var(--accessible-minimodal-padding) / 2);
    &:before,
    &:after {
      content: '';
      position: absolute;
      width: 16px;
      inset: calc(50% - 1px) 0 auto calc(50% - 8px);
      background-color: currentColor;
      height: 2px;
    }
    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(-45deg);
    }
  }
}
</style>
