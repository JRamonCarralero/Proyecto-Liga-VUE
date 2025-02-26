<script setup>
import NoticiaDetalle from '@/components/NoticiaDetalle.vue';
import NoticiasPage from '@/components/NoticiasPage.vue';

import { onMounted, ref, useTemplateRef, watch } from 'vue';
import { useRoute } from 'vue-router'

  const idNoticia = ref('')
  const search = ref('')
  const route = useRoute()

  const fSearch = useTemplateRef('funcSearch')
  const dNoticia = useTemplateRef('detNoticia')

  onMounted(() => {
    idNoticia.value = route.params.id
    if (idNoticia.value) verDetalleNoticia()
    else verListadoNoticias()
  })

  watch(idNoticia, () => {
    if (idNoticia.value) {
      dNoticia.value.getNoticia()
      verDetalleNoticia()
    }
  })

  /**
   * Shows the news detail page and hides the news list page.
   */
  function verDetalleNoticia() {
    const listado = document.getElementById('list-noticias')
    const detalle = document.getElementById('detalle-noticia')

    if (listado) listado.style.display = 'none'
    if (detalle) detalle.style.display = 'block'
  }

  /**
   * Shows the news list page and hides the news detail page.
   */
  function verListadoNoticias() {
    const listado = document.getElementById('list-noticias')
    const detalle = document.getElementById('detalle-noticia')

    if (listado) listado.style.display = 'block'
    if (detalle) detalle.style.display = 'none'
  }

  /**
   * Performs a search of news by title and displays the list of news in the news list page.
   * Hides the news detail page.
   */
  function searchNoticias() {
    fSearch.value.searchNoticiasFromMain(search.value)
    verListadoNoticias()
  }
</script>

<template>
    <div class="bg-dark">
      <div class="buscador-noticias">
        <input type="text" id="search-noticias" name="search-noticias" placeholder="Buscador" v-model="search">
        <button id="btn-search-noticias" @click="searchNoticias()">Buscar</button>
      </div>
    </div>
    <div id="list-noticias" class="margin-top">
      <NoticiasPage ref="funcSearch" @id-detalle-noticia="(id) => (idNoticia = id)" />
    </div>
    <div id="detalle-noticia" class="detalle-noticia">
      <NoticiaDetalle ref="detNoticia" :idnoticia="idNoticia" />
    </div>
</template>
