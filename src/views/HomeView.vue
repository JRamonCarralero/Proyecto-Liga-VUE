<script setup>
  import SelectedLigaTitle from '../components/SelectedLigaTitle.vue'
  import ClasificacionTable from '@/components/ClasificacionTable.vue'
  import NoticiasMain from '@/components/NoticiasMain.vue'

  import { useStore } from '@/stores/store.js'
  import { getAPIData } from '@/utils/utils'
  import { onMounted } from 'vue'

  const store = useStore()
  const API_PORT = location.port ? `:3333` : ''

  onMounted(async () => {
    const appConfig = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/read/appconfig`)
    console.log('appConfig', appConfig)
    store.setMainLiga(appConfig[0].ligaId)

    console.log('store Main', store.mainLiga)
  })

</script>

<template>
  <section class="portada">
      <h2 class="portada-h2">Todo sobre tus ligas de Rugby</h2>
      <p class="portada-p">Noticias, ligas, equipos, partidos y resultados</p>
      <a class="portada-a" href="#main-section-noticias">Ver más</a>
  </section>
  <section id="main-section-noticias">
      <NoticiasMain />
  </section>
  <div id="box-clasificacion" class="mrg">
      <SelectedLigaTitle :mainLiga="store.mainLiga" />
      <ClasificacionTable :mainLiga="store.mainLiga" />
  </div>
</template>
