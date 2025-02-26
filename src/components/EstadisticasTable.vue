<script setup>
import { onMounted, watch } from 'vue';
import { getAPIData } from '@/utils/utils';
import { ref } from 'vue';

const props = defineProps(['mainLiga'])

const API_PORT = location.port ? `:3333` : ''
const estadisticas = ref([])
const selectColumn = ref('puntos')

let pagina = 1

onMounted(async () => {
    getEstadisticas('puntos')
})

watch(props, () => {
  pagina = 1
  selectColumn.value = 'puntos'
  getEstadisticas('puntos')
})

watch(selectColumn, () => {
  pagina = 1
  getEstadisticas(selectColumn.value)
})

/**
 * Fetches the estadisticas data from the API and populates the estadisticas table,
 * also managing the pagination buttons.
 *
 * @param {string} sortBy - The field to sort the estadisticas by.
 */
async function getEstadisticas(sortBy) {
  setTimeout(async () => {
    if (props.mainLiga) {
      const respEstadisticas = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/read/estadisticas/table/${props.mainLiga}/${sortBy}/${pagina}`)
      estadisticas.value = respEstadisticas.data
      estadisticas.value.column = sortBy

      selectColumn.value = sortBy

      const btnEstPrev = document.getElementById('btn-est-prev')
      const btnEstNext = document.getElementById('btn-est-next')
      if (respEstadisticas.siguiente) {
        if (btnEstNext) btnEstNext.style.display = 'block'
    } else {
        if (btnEstNext) btnEstNext.style.display = 'none'
    }
    if (respEstadisticas.anterior) {
        if (btnEstPrev) btnEstPrev.style.display = 'block'
    } else {
        if (btnEstPrev) btnEstPrev.style.display = 'none'
    }
    }
    else getEstadisticas(sortBy)
  }, 100)
}

/**
 * Increases the page number and fetches the next page of estadisticas.
 */
function nextEstadisticas() {
    pagina += 1
    getEstadisticas(selectColumn.value)
}

/**
 * Decreases the current page number and fetches the previous page of estadisticas.
 */
function prevEstadisticas() {
  pagina -= 1
    getEstadisticas(selectColumn.value)
}
</script>

<template>
  <div class="select-column-box">
    <label for="select-column">Ordenar por:
      <select id="select-column" class="select-column" v-model="selectColumn" >
        <option value="jugador" :selected="estadisticas.column === 'jugador'">Jugador</option>
        <option value="equipo" :selected="estadisticas.column === 'equipo'">Equipo</option>
        <option value="puntos" :selected="estadisticas.column === 'puntos'">Puntos</option>
        <option value="ensayos" :selected="estadisticas.column === 'ensayos'">Ensayos</option>
        <option value="ppie" :selected="estadisticas.column === 'ppie'">Puntos Pie</option>
        <option value="TA" :selected="estadisticas.column === 'TA'">T.Amarillas</option>
        <option value="TR" :selected="estadisticas.column === 'TR'">T.Rojas</option>
      </select>
    </label>
  </div>
  <table>
    <thead>
      <tr>
        <th id="sta-sort-jugador" :class="{ 'th-cursor': true, 'th-selected': estadisticas.column === 'jugador' }" @click="getEstadisticas('jugador')" >Jugador</th>
        <th id="sta-sort-equipo" :class="{ 'th-cursor': true, 'th-selected': estadisticas.column === 'equipo' }" @click="getEstadisticas('equipo')" >Equipo</th>
        <th id="sta-sort-puntos"  :class="{ 'th-cursor': true, 'th-selected': estadisticas.column === 'puntos', 'hidden': estadisticas.column != 'jugador' && estadisticas.column != 'equipo' && estadisticas.column != 'puntos' }" @click="getEstadisticas('puntos')" >Puntos</th>
        <th id="sta-sort-ensayos" :class="{ 'th-cursor': true, 'th-selected': estadisticas.column === 'ensayos', 'hidden': estadisticas.column != 'ensayos' }" @click="getEstadisticas('ensayos')" >Ensayos</th>
        <th id="sta-sort-ppie" :class="{ 'th-cursor': true, 'th-selected': estadisticas.column === 'ppie', 'hidden': estadisticas.column != 'ppie' }" @click="getEstadisticas('ppie')" >Puntos Pie</th>
        <th id="sta-sort-ta" :class="{ 'th-cursor': true, 'th-selected': estadisticas.column === 'TA', 'hidden': estadisticas.column != 'TA' }" @click="getEstadisticas('TA')" >T.Amarillas</th>
        <th id="sta-sort-tr" :class="{ 'th-cursor': true, 'th-selected': estadisticas.column === 'TR', 'hidden': estadisticas.column != 'TR' }" @click="getEstadisticas('TR')" >T.Rojas</th>
      </tr>
    </thead>
    <tbody id="tbody-estadisticas">
      <tr v-for="(estadistica, index) in estadisticas" :key="index">
        <td>{{ estadistica.jugNombre }} {{ estadistica.jugApellidos }}</td>
        <td >{{ estadistica.eqNombre }}</td>
        <td :class="{ 'hidden': estadisticas.column != 'jugador' && estadisticas.column != 'equipo' && estadisticas.column != 'puntos' }">{{ estadistica.puntos }}</td>
        <td :class="{ 'hidden': estadisticas.column != 'ensayos' }">{{ estadistica.ensayos }}</td>
        <td :class="{ 'hidden': estadisticas.column != 'ppie' }">{{ estadistica.puntosPie }}</td>
        <td :class="{ 'hidden': estadisticas.column != 'TA' }">{{ estadistica.tAmarillas }}</td>
        <td :class="{ 'hidden': estadisticas.column != 'TR' }">{{ estadistica.tRojas }}</td>
      </tr>
    </tbody>
  </table>
  <div class="est-pagination">
      <div><button id="btn-est-prev" @click="prevEstadisticas">Anterior</button></div>
      <div><button id="btn-est-next" @click="nextEstadisticas">Siguiente</button></div>
    </div>
</template>
