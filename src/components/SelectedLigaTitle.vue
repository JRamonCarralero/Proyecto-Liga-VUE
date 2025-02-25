<script setup>
import { onMounted } from 'vue';
import { getAPIData } from '@/utils/utils';
import { ref } from 'vue';

const props = defineProps(['mainLiga'])

const API_PORT = location.port ? `:3333` : ''
const tituloLiga = ref('')

onMounted(async () => {
  getTitle()
})

async function getTitle() {
  setTimeout(async () => {
    if (props.mainLiga) {
      const liga = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/findbyid/ligas/${props.mainLiga}`)
      tituloLiga.value = `${liga.nombre}, Temporada ${liga.year}`
    } else getTitle()
  }, 100)
}
</script>

<template>
  <div id="title-competicion" class="bg-grey">
    <h2 class="titulo-liga" id="titulo-liga">{{ tituloLiga }}</h2>
  </div>
</template>

<style scoped>
  .titulo-liga {
    font-size: 2.5em;
    padding: 5px;
    border-bottom: 2px solid rgb(71 1 1);
  }

  .bg-grey {
    background-color: rgb(222 222 222 / 100%);
  }
</style>
