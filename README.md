# vue-accessible-minimodal

Accessible, lightweight, stylish Vue.js modal library.

## Installation

```
npm i vue-accessible-minimodal
```

## Usage

```typescript
import { AccessibleMinimodal } from 'vue-accessible-minimodal';
// is you need default styles:
import 'vue-accessible-minimodal/style.css';

const app = createApp(App);

app.use(AccessibleMinimodal, {
  /* options */
});

app.mount('#app');
```

Options - this is a [accessible-minimodal](https://github.com/imhvost/accessible-minimodal?tab=readme-ov-file#options) setting.

## Component

```typescript
<AccessibleMinimodal id="my-modal">Modal content</AccessibleMinimodal>
```

#### Component Props

```typescript
interface Props {
  id: string;
  closeBtn?: boolean;
  valign?: 'top' | 'bottom' | 'center';
  zIndex?: number | string;
  customStyle?: boolean;
}
```

- **`id`** - Modal ID (required);
- **`closeBtn`** - Whether to show the close button (default: `true`);
- **`valign`** - How to vertical align a modal window (`'top' | 'bottom' | 'center'`, default: `center`);
- **`zIndex`** - Modal `z-index` (default: `600`);
- **`customStyle`** - Whether to reset all default styles (default: `false`).

#### Component Events

```
<AccessibleMinimodal
  id="my-modal"
  @before-open="myBeforeOpenFunction"
  @after-open="myAfterOpenFunction"
  @before-close="myBeforeCloseFunction"
  @after-close="myAfterCloseFunction"
>
</AccessibleMinimodal>
```

Behave the same as [accessible-minimodel events](https://github.com/imhvost/accessible-minimodal?tab=readme-ov-file#events).

## Composables

```typescript
<script setup lang="ts">
import { useModal } from './lib';
import { onMounted } from 'vue';

const {
  openModal,
  closeModal,
  closeAllModals,
  animated,
  modal,
  getScrollbarWidth,
  addTriggers
} = useModal();

onMounted(() => {
  openModal('my-modal'); // open modal with id="my-modal"
});

const myBeforeCloseFunction = ($event: Event) => {
  // $event.preventDefault(); - prevent modal close
};
</script>

<template>
  <AccessibleMinimodal
    id="my-modal"
    @before-open="myBeforeCloseFunction"
  >
  </AccessibleMinimodal>
</template>
```

- **`openModal('modal-id')`** - Open modal by `id`;
- **`closeModal('modal-id')`** - Close modal by `id`, or the currently open one;
- **`closeAllModals()`** - Close all modals;
- **`animated`** - A reactive property that shows whether modal is in process of opening or closing;
- **`modal`** - Exactly modal exemplar;
- **`getScrollbarWidth()`** - A helper function that returns width of scrollbar;
- **`addTriggers(triggers)`** - Adds additional modal control triggers;
