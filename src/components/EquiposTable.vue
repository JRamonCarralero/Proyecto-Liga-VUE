<script setup>
import {  watch } from 'vue';
import { getAPIData } from '@/utils/utils';
import { ref } from 'vue';

const props = defineProps(['mainLiga'])
const emit = defineEmits(['detalleEquipo'])

const API_PORT = location.port ? `:3333` : ''
const equipos = ref([])

watch(props, () => {
  getEquipos()
})

/**
 * Loads the teams that belong to the current league.
 * If no league is selected, it will wait for 100ms and try again.
 * @returns {Promise<void>}
 */
async function getEquipos() {
  setTimeout(async () => {
    if (props.mainLiga) equipos.value = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/filter/equipos/${props.mainLiga}`)
    else getEquipos()
  }, 100)
}

/**
 * Emits the 'detalleEquipo' event with the equipo object as its detail.
 * This is used to show the details of the given equipo.
 * @param {Equipo} equipo - The equipo to show the details of.
 */
function showEquipo(equipo) {
  emit('detalleEquipo', equipo)
}

defineExpose({ showEquipo })
</script>

<template>
  <table id="table-equipos">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Poblacion</th>
        <th class="hidden">Dirección</th>
        <th>Estadio</th>
      </tr>
    </thead>
    <tbody id="tbody-equipos">
        <tr v-for="equipo in equipos" :key="equipo._id">
          <td class="cp" @click="showEquipo(equipo)">{{equipo.nombre}}</td>
          <td>{{equipo.poblacion}}</td>
          <td class="hidden">{{equipo.direccion}}</td>
          <td>{{equipo.estadio}}</td></tr>
    </tbody>
  </table>
</template>

