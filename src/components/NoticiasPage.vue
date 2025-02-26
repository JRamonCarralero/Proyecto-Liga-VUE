<script setup>
import { onMounted, ref } from 'vue';
import { getAPIData } from '@/utils/utils';

const API_PORT = location.port ? `:3333` : ''
const noticias = ref([])
const sNoticia = ref('')
const emit = defineEmits(['idDetalleNoticia'])

let pagina = 1

onMounted(() => {
    searchNoticias('')
  })

/**
 * Llama a searchNoticias con pagina = 1 y actualiza el valor de sNoticia
 * @param {string} search - El t rmino de b squeda
 */
function searchNoticiasFromMain(search) {
  pagina = 1
  sNoticia.value = search
  searchNoticias(search)
}

/**
 * Busca noticias en la api con el t rmino de b squeda pasado por par metro
 * y actualiza el valor de noticias con el resultado
 * Si el t rmino de b squeda es vac o, busca todas las noticias
 * Tambi n actualiza el estilo de los botones de paginaci n
 * @param {string} search - El t rmino de b squeda
 */
async function searchNoticias(search) {
  let respNoticias
  if (search === '') respNoticias = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/filter/noticias/search/${pagina}/6/_`)
  else respNoticias = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/filter/noticias/search/${pagina}/6/${search}`)
  noticias.value = respNoticias.data
  const btnNext = document.getElementById('btn-next-noticias')
  const btnPrev = document.getElementById('btn-prev-noticias')
  if (respNoticias.siguiente) {
      if (btnNext) btnNext.style.display = 'block'
  } else {
      if (btnNext) btnNext.style.display = 'none'
  }
  if (respNoticias.anterior) {
      if (btnPrev) btnPrev.style.display = 'block'
  } else {
      if (btnPrev) btnPrev.style.display = 'none'
  }
}

/**
 * Advances to the next page of news by incrementing the page number
 * and performs a search based on the current search term.
 */
function nextNoticias() {
    pagina += 1
    searchNoticias(sNoticia.value)
}

/**
 * Retrocede a la página anterior de noticias, decrementando el número de página
 * actual y realiza una búsqueda basada en el término de búsqueda actual.
 */
function prevNoticias() {
    pagina -= 1
    searchNoticias(sNoticia.value)
}

/**
 * Emits the id of a news item to the parent component so it can show the news detail page.
 * @param {string} id - The id of the news item to show its detail page.
 */
function detalleNoticia(id) {
  emit('idDetalleNoticia', id)
}

defineExpose({
  searchNoticiasFromMain
})
</script>

<template>
  <div id="section-noticias" class="bg-grey">
    <div id="noticias-box-list" class="noticias-box-list">
    <div v-for="noticia in noticias" :key="noticia._id" class="box-noticia-list">
      <div class="img-box">
        <img src="@/assets/img/foto1-800x395.jpg" alt="{{ noticia.titulo }}" class="noticia-img" >
        <h3 class="noticia-title noticia-link" @click="detalleNoticia(noticia._id)">{{ noticia.titulo }}</h3>
      </div>
      <div class="text-box">
        <p class="noticia-text">{{ noticia.cabecera }}</p>
      </div>
    </div>
  </div>
  </div>
  <div class="pagination">
    <div><button id="btn-prev-noticias" @click="prevNoticias">Anterior</button></div>
    <div><button id="btn-next-noticias" @click="nextNoticias">Siguiente</button></div>
  </div>
</template>

<style scoped>
.noticias-box-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    border-top: 2px solid rgb(71 1 1);
    margin-top: -5px;
    padding: 20px 20px 30px;

    .box-noticia-list {
        width: 500px;
        height: 300px;
        overflow: hidden;
        margin: 30px auto 0;
        border: 2px solid rgb(71 1 1);
        border-radius: 10px;
        box-shadow: 3px 3px 3px rgb(51 51 51);
        padding: 20px;
        background-color: #f3f3f3;

        .img-box {
            width: 100%;
            height: 130px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;

            .noticia-img {
                width: 150px;
                height: auto;
            }

            .noticia-title {
                width: 320px;
                text-align: center;
                font-size: 28px;
            }
        }

        .text-box {
            width: 100%;

            .noticia-text {
                text-align: justify;
                margin-top: 15px;
            }
        }
    }
}

.noticia-link {
    text-decoration: none;
    color: rgb(71 1 1);

    &:hover {
        cursor: pointer;
        color: rgb(122 11 11);
    }
}
</style>
