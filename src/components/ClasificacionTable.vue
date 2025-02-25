<script setup>
import { onMounted } from 'vue';
import { getAPIData } from '@/utils/utils';
import { ref } from 'vue';

const props = defineProps(['mainLiga'])

const API_PORT = location.port ? `:3333` : ''
const clasificaciones = ref([])

onMounted(async () => {
    getClasificaciones()
})

async function getClasificaciones() {
  setTimeout(async () => {
    if (props.mainLiga) clasificaciones.value = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/read/clasificaciones/table/${props.mainLiga}`)
    else getClasificaciones()
  }, 100)
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>Equipo</th>
        <th>Puntos</th>
        <th class="hidden">PJ</th>
        <th class="hidden">PG</th>
        <th class="hidden">PE</th>
        <th class="hidden">PP</th>
        <th class="hidden">TF</th>
        <th class="hidden">TC</th>
      </tr>
    </thead>
    <tbody id="tbody-clasificacion">
      <tr v-for="(clasificacion, index) in clasificaciones" :key="clasificacion._id">
        <td>{{index + 1}}</td>
        <td>{{clasificacion.equipo}}</td>
        <td>{{clasificacion.puntos}}</td>
        <td class="hidden">{{clasificacion.partidosJugados}}</td>
        <td class="hidden">{{clasificacion.partidosGanados}}</td>
        <td class="hidden">{{clasificacion.partidosPerdidos}}</td>
        <td class="hidden">{{clasificacion.partidosEmpatados}}</td>
        <td class="hidden">{{clasificacion.puntosAnotados}}</td>
        <td class="hidden">{{clasificacion.puntosRecibidos}}</td>
      </tr>
    </tbody>
  </table>
</template>
