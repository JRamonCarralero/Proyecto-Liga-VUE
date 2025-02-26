<script setup>
import { watch } from 'vue';
import { getAPIData } from '@/utils/utils';
import { ref } from 'vue';

const props = defineProps(['equipo'])

const API_PORT = location.port ? `:3333` : ''
const jugadores = ref([])

watch(props, () => {
  getJugadores()
})

/**
 * Makes a GET request to the API to get all the players of the given team,
 * and assigns the result to the 'jugadores' variable.
 *
 * This function is called every time the 'equipo' variable changes, and
 * it will keep calling itself until the 'equipo' variable has a valid '_id'
 * property.
 */
async function getJugadores() {
  setTimeout(async () => {
    if (props.equipo._id != '') jugadores.value = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/filter/jugadores/${props.equipo._id}`)
    else getJugadores()
  }, 100)
}

</script>

<template>
  <h2>{{ props.equipo.nombre }}</h2>
  <p>Población: {{ props.equipo.poblacion }}</p>
  <p>Dirección: {{ props.equipo.direccion }}</p>
  <p>Estadio: {{ props.equipo.estadio }}</p>
  <h3 class="jugadores-title">Jugadores</h3>
  <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Apellidos</th>
        <th class="hidden">Nacionalidad</th>
        <th class="hidden">Altura</th>
        <th class="hidden">Peso</th>
      </tr>
    </thead>
    <tbody id="tbody-jugadores">
      <tr v-for="jugador in jugadores" :key="jugador._id">
        <td>{{jugador.nombre}}</td>
        <td>{{jugador.apellidos}}</td>
        <td class="hidden">{{jugador.nacionalidad}}</td>
        <td class="hidden">{{jugador.altura}}</td>
        <td class="hidden">{{jugador.peso}}</td>
      </tr>
    </tbody>
  </table>
</template>
