<script setup>
import { watch } from 'vue';
import { getAPIData } from '@/utils/utils';
import { ref } from 'vue';

const props = defineProps(['partido'])

const API_PORT = location.port ? `:3333` : ''
const acciones = ref([])

const pLocal = ref(0)
const pVisitante = ref(0)

watch(props, () => {
  getAcciones()
})

/**
 * Obtiene las acciones de un partido y las muestra en una tabla
 * con un retardo de 2 segundos entre cada accion
 * @async
 */
async function getAcciones() {
  setTimeout(async () => {
    if (props.partido._id != '') {
      const accPartido = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/read/acciones/table/${props.partido._id}`)
      acciones.value = []
      pLocal.value = 0
      pVisitante.value = 0
      let i = 0

      /**
       * Agrega las acciones de un partido en orden cronologico
       * con un retardo de 2 segundos entre cada accion
       */
      function addAccion() {
        switch (accPartido[i].accion) {
            case 'E':
                acciones.value.push(`⌚︎ ${accPartido[i].minuto}: ${accPartido[i].jugNombre} ${accPartido[i].jugApellidos} anota un ensayo 🏉 para ${accPartido[i].eqNombre}`)
                if (props.partido.equipoLocal === accPartido[i].eqNombre) {
                    pLocal.value += 5
                } else {
                    pVisitante.value += 5
                }
                break
            case 'ET':
                acciones.value.push(`⌚︎ ${accPartido[i].minuto}: ${accPartido[i].jugNombre} ${accPartido[i].jugApellidos} transforma el ensayo ┟┧ para ${accPartido[i].eqNombre}`)
                if (props.partido.equipoLocal === accPartido[i].eqNombre) {
                    pLocal.value += 2
                } else {
                    pVisitante.value += 2
                }
                break
            case 'EC':
                acciones.value.push(`⌚︎ ${accPartido[i].minuto}: Concedido ensayo de castigo 🏉 al jugador ${accPartido[i].jugNombre} ${accPartido[i].jugApellidos} para ${accPartido[i].eqNombre}`)
                if (props.partido.equipoLocal === accPartido[i].eqNombre) {
                    pLocal.value += 7
                } else {
                    pVisitante.value += 7
                }
                break
            case 'GC':
                acciones.value.push(`⌚︎ ${accPartido[i].minuto}: ${accPartido[i].jugNombre} ${accPartido[i].jugApellidos} anota un golpe de castigo ┟┧ para ${accPartido[i].eqNombre}`)
                if (props.partido.equipoLocal === accPartido[i].eqNombre) {
                    pLocal.value += 3
                } else {
                    pVisitante.value += 3
                }
                break
            case 'D':
                acciones.value.push(`⌚︎ ${accPartido[i].minuto}: ${accPartido[i].jugNombre} ${accPartido[i].jugApellidos} anota un drop ┟┧ para ${accPartido[i].eqNombre}`)
                if (props.partido.equipoLocal === accPartido[i].eqNombre) {
                    pLocal.value += 3
                } else {
                    pVisitante.value += 3
                }
                break
            case 'TA':
                acciones.value.push(`⌚︎ ${accPartido[i].minuto}: El jugador ${accPartido[i].jugNombre} ${accPartido[i].jugApellidos} de ${accPartido[i].eqNombre} recibe una tarjeta amarilla 🟨`)
                break
            case 'TR':
                acciones.value.push(`⌚︎ ${accPartido[i].minuto}: El jugador ${accPartido[i].jugNombre} ${accPartido[i].jugApellidos} de ${accPartido[i].eqNombre} recibe una tarjeta roja 🟥`)
                break
            default:
                console.log('accion no reconocida', accPartido[i].accion)
        }
        if (i++ < accPartido.length - 1) setTimeout(addAccion, 2000)
        else {
          acciones.value.push('Fin del partido')
        }
      }

      addAccion()
    }else getAcciones()
  }, 100)
}
</script>

<template>
  <h3 class="resumen-partido-title">
    <span id="eq-local">{{ props.partido.equipoLocal }}</span> <span><span id="p-local">{{ pLocal }}</span> - <span id="p-visitante">{{ pVisitante }}</span></span> <span id="eq-visitante">{{ props.partido.equipoVisitante }}</span>
  </h3>
  <div id="resumen-acciones" class="resumen-acciones">
    <p v-for="accion in acciones" :key="accion._id" :class="{ 'accion-p-element': true, 'accion-p-final': accion === 'Fin del partido' }">
      {{ accion }}
    </p>
  </div>
</template>
