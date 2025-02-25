import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', () => {
  const mainLiga = ref('')

  function setMainLiga(liga) {
    mainLiga.value = liga
  }

  return { mainLiga, setMainLiga }
})
