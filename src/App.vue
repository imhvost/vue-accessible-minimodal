<script setup lang="ts">
import { useModal } from './lib';

const { closeModal, animated, modal } = useModal();
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
