<script setup>
import SelectedLigaTitle from '@/components/SelectedLigaTitle.vue';
import ClasificacionTable from '@/components/ClasificacionTable.vue';
import EstadisticasTable from '@/components/EstadisticasTable.vue';
import EquiposTable from '@/components/EquiposTable.vue';
import EquipoDetalleJugadores from '@/components/EquipoDetalleJugadores.vue';
import PartidosJornadaTable from '@/components/PartidosJornadaTable.vue';
import PartidoDetalle from '@/components/PartidoDetalle.vue';

import { onMounted, ref, watch } from 'vue';
import { getAPIData } from '@/utils/utils';
import { useStore } from '@/stores/store.js'

const API_PORT = location.port ? `:3333` : ''
const store = useStore()

const ligaId = ref('')
const yearLiga = ref('')
const arrLigas = ref([])
const arrYears = ref([])
const arrJornadas = ref([])
const selectedJornada = ref({})

const selectedPartido = ref({
  _id: '',
  equipoLocal: '',
  equipoVisitante: '',
  puntosLocal: '',
  puntosVisitante: '',
  puntosCLocal: '',
  puntosCVisitante: '',
  fecha: '',
  jugado: false,
  estadio: ''
})

const equipoToShow = ref({
  _id: '',
  nombre: '',
  poblacion: '',
  direccion: '',
  estadio: ''
})

onMounted(async () => {
  const appConfig = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/read/appconfig`)
  store.setMainLiga(appConfig[0].ligaId)
  loadLigasInSelect()
})

watch(ligaId, () => {
  getClasificacion()
  uploadJornadas()
})

watch(equipoToShow, () => {
  showEquipo()
})

// Carga de ligas //

/**
 * Asynchronously loads the list of all ligas from the API and populates
 * the arrLigas and arrYears reactive variables with the fetched data.
 * Sets the current ligaId and yearLiga if the mainLiga from the store
 * matches any of the fetched ligas. Finally, triggers the getClasificacion
 * function to update the classification based on the loaded ligas.
 */
async function loadLigasInSelect() {
    const ligas = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/read/ligas`)
    arrLigas.value = []
    arrYears.value = []
    ligas.forEach(liga => {
      arrLigas.value.push({
        id: liga._id,
        nombre: `${liga.nombre}-${liga.year}`
      })

      if (arrYears.value.findIndex(year => year === liga.year) === -1) arrYears.value.push(liga.year)

      if (store.mainLiga === liga._id) {
        ligaId.value = liga._id
        yearLiga.value = liga.year
      }
    })

    getClasificacion()
}

/**
 * Asynchronously loads the list of all ligas from the API that match the
 * current yearLiga reactive variable and populates the arrLigas reactive
 * variable with the fetched data. Triggered when the yearLiga reactive
 * variable changes.
 */
async function loadLigasByYear(){
    const ligas = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/filter/ligas/${yearLiga.value}`)

    arrLigas.value = []
    ligas.forEach(liga => {
      arrLigas.value.push({
        id: liga._id,
        nombre: `${liga.nombre}-${liga.year}`
      })
    })
}

// Vista de Clasificacion //

/**
 * Displays the classification box and hides the calendar, teams, and statistics boxes.
 * This function manipulates the display property of HTML elements to ensure that
 * the classification section is visible while other sections are hidden.
 */
function getClasificacion() {
    const boxClasificacion = document.getElementById('box-clasificacion')
    const boxCalendario = document.getElementById('box-calendario')
    const boxEquipos = document.getElementById('box-equipos')
    const boxEstadisticas = document.getElementById('box-estadisticas')

    if (boxClasificacion) boxClasificacion.style.display = 'block'
    if (boxCalendario) boxCalendario.style.display = 'none'
    if (boxEquipos) boxEquipos.style.display = 'none'
    if (boxEstadisticas) boxEstadisticas.style.display = 'none'
}

/**
 * Hides the table of teams and shows the box of players.
 * Manipulates the display property of HTML elements to ensure that
 * the table of teams is hidden and the box of players is visible.
 */
function showEquipo() {
  const tableEquiposBox = document.getElementById('table-equipo-box')
  const jugadoresBox = document.getElementById('jugadores-box')

  if (tableEquiposBox) tableEquiposBox.style.display = 'none'
  if (jugadoresBox) jugadoresBox.style.display = 'block'
}

/**
 * Hides the box of players and shows the table of teams.
 * Manipulates the display property of HTML elements to ensure that
 * the box of players is hidden and the table of teams is visible.
 */
function volverEquipos() {
    const tableEquiposBox = document.getElementById('table-equipo-box')
    const jugadoresBox = document.getElementById('jugadores-box')
    if (tableEquiposBox) tableEquiposBox.style.display = 'block'
    if (jugadoresBox) jugadoresBox.style.display = 'none'
}

// Vista de Calendario //

/**
 * Hides the table of classification and shows the box of calendar.
 * Manipulates the display property of HTML elements to ensure that
 * the table of classification is hidden and the box of calendar is visible.
 */
function getCalendario() {
    const boxClasificacion = document.getElementById('box-clasificacion')
    const boxCalendario = document.getElementById('box-calendario')
    const boxEquipos = document.getElementById('box-equipos')
    const boxEstadisticas = document.getElementById('box-estadisticas')
    const resumenPartido = document.getElementById('resumen-partido')

    if (boxClasificacion) boxClasificacion.style.display = 'none'
    if (boxCalendario) boxCalendario.style.display = 'block'
    if (boxEquipos) boxEquipos.style.display = 'none'
    if (boxEstadisticas) boxEstadisticas.style.display = 'none'
    if (resumenPartido) resumenPartido.style.display = 'none'
}

/**
 * Loads the jornadas of a liga into the variable arrJornadas.
 * Requests the jornadas of a liga from the API and stores them in the variable arrJornadas.
 * @returns {Promise<void>}
 */
async function uploadJornadas() {
  arrJornadas.value = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/filter/jornadas/${ligaId.value}`)
}

/**
 * Displays the detailed summary of a selected match.
 * This function retrieves the HTML element associated with the match summary,
 * makes it visible, and updates the selectedPartido reactive variable with the
 * given partidoId.
 *
 * @param {string} partidoId - The ID of the match whose details are to be displayed.
 */
function verDetallePartido(partidoId) {
  const resumenPartido = document.getElementById('resumen-partido')
  if (resumenPartido) resumenPartido.style.display = 'block'
  selectedPartido.value = partidoId
}

/**
 * Hides the match summary by setting its display style to 'none'.
 * This function targets the HTML element with the ID 'resumen-partido'
 * and ensures it is not visible in the UI.
 */
function ocultarResumen() {
    const resumenPartido = document.getElementById('resumen-partido')
    if (resumenPartido) resumenPartido.style.display = 'none'
}

// Vista de Equipos //

/**
 * Shows the box of teams and hides the boxes of classification, calendar, and statistics.
 * Manipulates the display property of HTML elements to ensure that
 * the box of teams is visible while other sections are hidden.
 */
function getEquipos() {
    const boxClasificacion = document.getElementById('box-clasificacion')
    const boxCalendario = document.getElementById('box-calendario')
    const boxEquipos = document.getElementById('box-equipos')
    const tableEquiposBoc = document.getElementById('table-equipo-box')
    const jugadoresBox = document.getElementById('jugadores-box')
    const boxEstadisticas = document.getElementById('box-estadisticas')

    if (boxClasificacion) boxClasificacion.style.display = 'none'
    if (boxCalendario) boxCalendario.style.display = 'none'
    if (boxEquipos) boxEquipos.style.display = 'block'
    if (tableEquiposBoc) tableEquiposBoc.style.display = 'block'
    if (jugadoresBox) jugadoresBox.style.display = 'none'
    if (boxEstadisticas) boxEstadisticas.style.display = 'none'
}

// Vista de Estadisticas //

/**
 * Shows the statistics box and hides the boxes of classification, calendar, and teams.
 * Manipulates the display property of HTML elements to ensure that
 * the statistics box is visible while other sections are hidden.
 */
function getEstadisticas() {
    const boxClasificacion = document.getElementById('box-clasificacion')
    const boxCalendario = document.getElementById('box-calendario')
    const boxEquipos = document.getElementById('box-equipos')
    const boxEstadisticas = document.getElementById('box-estadisticas')

    if (boxClasificacion) boxClasificacion.style.display = 'none'
    if (boxCalendario) boxCalendario.style.display = 'none'
    if (boxEquipos) boxEquipos.style.display = 'none'
    if (boxEstadisticas) boxEstadisticas.style.display = 'block'
}

</script>

<template>
  <div id="filter-box" class="filtro-competicion">
    <label for="select-liga">Ligas: <select id="select-liga" v-model="ligaId">
      <option v-for="liga in arrLigas" :key="liga.id" :value="liga.id" :selected="liga.id === store.mainLiga" >{{ liga.nombre }}</option>
    </select></label>
    <label for="year-liga">Año: <select id="year-liga" v-model="yearLiga" @change="loadLigasByYear">
      <option value="all">todos</option>
      <option v-for="year in arrYears" :key="year" :value="year" >{{ year }}</option>
    </select></label>
    <button id="clasificacion-btn" @click="getClasificacion">Clasificación</button>
    <button id="calendario-btn" @click="getCalendario">Calendario</button>
    <button id="equipos-btn" @click="getEquipos">Equipos</button>
    <button id="estadisticas-btn" @click="getEstadisticas">Estadisticas</button>
  </div>
    <SelectedLigaTitle :mainLiga="ligaId" />
  <div id="box-clasificacion">
    <h2>Clasificación</h2>
    <ClasificacionTable :mainLiga="ligaId" />
  </div>
  <div id="box-calendario">
    <div id="calendario-header" class="calendario-header">
      <h2 id="jornada-numero">Jornada nº {{ selectedJornada.numero }}</h2>
      <select id="jornadas-select" class="jornadas-select" v-model="selectedJornada">
        <option v-for="jornada in arrJornadas" :key="jornada.id" :value="jornada" :selected="jornada.numero === 1">Jornada {{ jornada.numero }}</option>
      </select>
    </div>
    <div id="table-calendario-container">
      <PartidosJornadaTable :jornadaId="selectedJornada._id" @detalle-partido="(partido) => verDetallePartido(partido)" />
      <div id="resumen-partido" class="resumen-partido">
        <PartidoDetalle :partido="selectedPartido" />
        <button id="salir-resumen-btn" @click="ocultarResumen">Volver</button>
      </div>
    </div>
  </div>
  <div id="box-equipos">
    <div id="table-equipo-box">
      <h2>Equipos</h2>
      <EquiposTable :mainLiga="ligaId" @detalle-equipo="(eq) => equipoToShow = eq"/>
    </div>
    <div id="jugadores-box">
      <EquipoDetalleJugadores :equipo="equipoToShow" />
      <button id="volver-equipos-btn" @click="volverEquipos">Volver</button>
    </div>
  </div>
  <div id="box-estadisticas" class="box-estadisticas">
    <h2>Estadísticas</h2>
    <EstadisticasTable :mainLiga="ligaId" />
  </div>
</template>
