import { writable } from "svelte/store";
import { DEFAULT_COUNT } from "$lib/constants/postDefaultValue";

export const theme = (() => {
  const { subscribe, set, update } = writable("light");

  return {
    subscribe,
    changeTheme: (theme) => update(() => theme),
    reset: () => set(DEFAULT_COUNT)
  };
})();

export const count = (() => {
  const { subscribe, set, update } = writable(DEFAULT_COUNT);

  return {
    subscribe,
    increment: () => update((postsCount) => postsCount + DEFAULT_COUNT),
    reset: () => set(DEFAULT_COUNT)
  };
})();

export const isOpenMenu = (() => {
  const { subscribe, update } = writable(true);

  return {
    subscribe,
    toggle: () =>
      update((val) => {
        console.log("menu");
        return !val;
      })
  };
})();

export const isOpenModal = (() => {
  const { subscribe, update } = writable(false);

  return {
    subscribe,
    toggle: () =>
      update((val) => {
        console.log("modal", val);
        return !val;
      }),
    closeModal: () => update(() => false)
  };
})();
