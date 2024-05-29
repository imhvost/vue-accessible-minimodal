import type { App, InjectionKey } from 'vue';
import { AccessibleMinimodal as Modal } from 'accessible-minimodal';
import type {
  AccessibleMinimodalSettings,
  AccessibleMinimodal as AccessibleMinimodalType,
} from 'accessible-minimodal';
import TheModal from '../components/AccessibleMinimodal.vue';
import { inject, ref, watch, reactive } from 'vue';

export const configInject: InjectionKey<AccessibleMinimodalSettings> = Symbol();
export const modalInject: InjectionKey<AccessibleMinimodalType> = Symbol();

export const AccessibleMinimodal = {
  install: (app: App, options?: AccessibleMinimodalSettings) => {
    options = options || {};
    const useTriggers = options.triggers?.use;

    options.triggers = { ...options.triggers, ...{ use: false } };

    const modal = reactive(new Modal(options));
    if (useTriggers !== false) {
      modal.addTriggers();
    }

    app.provide(configInject, modal.config);
    app.provide(modalInject, modal);
    app.component('AccessibleMinimodal', TheModal);
  },
};

export const useModal = () => {
  const modal = inject(modalInject, {} as AccessibleMinimodalType);

  const openModal = modal.openModal.bind(modal);
  const closeModal = modal.closeModal.bind(modal);
  const closeAllModals = modal.closeAllModals.bind(modal);
  const getScrollbarWidth = modal.getScrollbarWidth.bind(modal);
  const addTriggers = modal.addTriggers.bind(modal);

  const animated = ref(false);
  watch(
    () => modal.animated,
    newValue => {
      animated.value = newValue || false;
    }
  );

  return {
    openModal,
    closeModal,
    closeAllModals,
    getScrollbarWidth,
    addTriggers,
    animated,
    modal,
  };
};

export interface Props {
  id: string;
  hideCloseBtn?: boolean;
  resetStyles?: boolean;
  valign?: 'top' | 'bottom' | 'center';
}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    AccessibleMinimodal: Partial<typeof TheModal> & { id: string };
  }
}
