<script setup>
import { onMounted } from 'vue';
import { getAPIData } from '@/utils/utils';
import { ref } from 'vue';

const props = defineProps(['idnoticia'])
const API_PORT = location.port ? `:3333` : ''

const noticia = ref({
  id: '',
  titulo: '',
  cabecera: '',
  contenido: ''
})

onMounted(() => {
  getNoticia()
})

/**
 * Obtiene la noticia cuyo id se pasa por par metro,
 * si no se pasa par metro, se llama a si misma para intentar obtenerla de nuevo
 *
 * @param {string} idnoticia - id de la noticia a obtener
 */
async function getNoticia() {
  setTimeout(async () => {
    if (props.idnoticia) {
      noticia.value = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/findbyid/noticias/${props.idnoticia}`)
    } else getNoticia()
  })
}

defineExpose({
  getNoticia
})
</script>

<template>
      <h2>{{ noticia.titulo }}</h2>
      <p class="texto-noticia">{{ noticia.cabecera }}</p>
      <img class="img-detalle-noticia" src="@/assets/img/foto1-800x395.jpg" alt="imagen noticia">
      <p class="texto-noticia" v-for="(p, index) in noticia.contenido.split('\n')" :key="index" >{{ p }}</p>
</template>
