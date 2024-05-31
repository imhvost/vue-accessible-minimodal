<script setup lang="ts">
import { useModal } from './lib';
import { onMounted } from 'vue';

const { openModal, closeModal, animated, modal } = useModal();

onMounted(() => {
  openModal('test');
  console.log(modal);
});

const beforeOpen = ($event: Event) => {
  // $event.preventDefault();
  console.log($event);
};
</script>

<template>
  {{ animated }}
  <button
    @click="console.log(modal)"
    data-modal-open="test"
  >
    test
  </button>
  <button
    @click="console.log(modal)"
    data-modal-open="asd"
  >
    asd
  </button>
  <AccessibleMinimodal
    @before-open="beforeOpen"
    valign="top"
    id="test"
  >
    test<br />
    <button @click="closeModal('test')">close</button>
    <button data-modal-close-all>close-all</button>
  </AccessibleMinimodal>
  <AccessibleMinimodal
    id="asd"
    z-index="1"
    :customStyle="true"
  >
    asd<br />
    <button @click="closeModal('asd')">close</button>
    <button data-modal-close-all>close-all</button>
    <button data-modal-open="test">open test</button>
  </AccessibleMinimodal>
</template>

<style>
body {
  min-height: 150vh;
}
</style>
