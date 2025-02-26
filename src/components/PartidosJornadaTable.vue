<script setup>
import { onMounted, watch } from 'vue';
import { getAPIData } from '@/utils/utils';
import { ref } from 'vue';

const props = defineProps(['jornadaId'])
const emit = defineEmits(['detallePartido'])

const API_PORT = location.port ? `:3333` : ''
const partidos = ref([])

onMounted(() => {
    getPartidos()
})

watch(props, () => {
  getPartidos()
})

/**
 * Gets the partidos for the given jornadaId, or retries if jornadaId is falsy.
 * @return {Promise<void>}
 */
async function getPartidos() {
  setTimeout(async () => {
    if (props.jornadaId) partidos.value = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/read/partidos/table/${props.jornadaId}`)
    else getPartidos()
  }, 100)
}

</script>

<template>
  <table id="table-calendario">
    <thead>
      <tr>
        <th class="hidden">Fecha</th>
        <th>Equipo Local</th>
        <th>Resultado</th>
        <th>Equipo Visitante</th>
        <th class="hidden">Estadio</th>
        <th></th>
      </tr>
    </thead>
    <tbody id="tbody-calendario">
      <tr v-for="partido in partidos" :key="partido.id">
        <td class="hidden">{{ partido.fecha }}</td>
        <td>{{ partido.equipoLocal }}</td>
        <td>{{ partido.puntosLocal }} - {{ partido.puntosVisitante }}</td>
        <td>{{ partido.equipoVisitante }}</td>
        <td class="hidden">{{ partido.estadio }}</td>
        <td>
          <button class="btn-table" @click="emit('detallePartido', partido)">▶</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
