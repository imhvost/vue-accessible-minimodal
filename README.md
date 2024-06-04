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
  id?: string;
  closeBtn?: boolean;
  valign?: 'top' | 'bottom' | 'center';
  zIndex?: number | string;
  customStyle?: boolean;
}
```

- **`id`** - Modal ID;
- **`closeBtn`** - Whether to show the close button (default: `true`);
- **`closeBtnAriaLabel`** - Close button `aria-label` attribute (default: `🗙`);
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
  Modal content
</AccessibleMinimodal>
```

Behave the same as [accessible-minimodel events](https://github.com/imhvost/accessible-minimodal?tab=readme-ov-file#events).

## Composables

```typescript
<script setup lang="ts">
import { useModal } from 'vue-accessible-minimodal';
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
    @before-close="myBeforeCloseFunction"
  >
    Modal content
  </AccessibleMinimodal>
</template>
```

- **`openModal('modal-id' | HTMLElement)`** - Open modal by `id`, or by `HTMLElement`;
- **`closeModal('modal-id' | HTMLElement)`** - Close modal by `id` (optional), or by `HTMLElement` (optional), or _the currently open one_;
- **`closeAllModals()`** - Close all modals;
- **`animated`** - A reactive property that shows whether modal is in process of opening or closing;
- **`modal`** - Exactly modal exemplar;
- **`getScrollbarWidth()`** - A helper function that returns width of scrollbar;
- **`addTriggers({
  open?: string;
  close?: string;
  closeAll?: string;
})`** - Adds additional modal control triggers.

## Slots

In addition to the default `slot`, you can make a modal component into individual blocks using:

```typescript
<AccessibleMinimodal id="my-modal">
  <template #header>Modal header</template>
  <template #content>Modal content</template>
  <template #footer>Modal footer</template>
</AccessibleMinimodal>
```

The component also has a `slot` for close button:

```typescript
<AccessibleMinimodal id="my-modal">
  <template #close>Click to close modal!</template>
</AccessibleMinimodal>
```

## Component `ref`

You can get the html element **`modalEl`** of a modal using `ref`:

```typescript
<script setup lang="ts">
import { ref, onMounted } from 'vue';

const myModal = ref<HTMLElement>();

onMounted(() => {
  openModal(myModal.value.modalEl); // open modal by HTMLElement"
});
</script>

<template>
  <AccessibleMinimodal ref="myModal">
    Modal content
  </AccessibleMinimodal>
</template>
```

## Triggers

By default, these are **`data-modal-open`**, **`data-modal-close`**, **`data-modal-close-all`** attributes.
So you can do something like this:

```typescript
<button data-modal-open="my-modal">Open my-modal!</button>

<AccessibleMinimodal id="my-modal">
  <template #content>Modal content</template>
  <template #footer>
    <button data-modal-close>Close my-modal!</button>
  </template>
</AccessibleMinimodal>
```
