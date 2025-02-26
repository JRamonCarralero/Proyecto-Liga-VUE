<script setup>
import { onMounted, ref } from 'vue';
import { getAPIData } from '@/utils/utils';

const API_PORT = location.port ? `:3333` : ''
const noticias = ref([])

onMounted(async () => {
    const respNoticias = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/filter/noticias/search/1/3/_`)
    noticias.value = respNoticias.data
  })
</script>

<template>
  <div id="noticias-box-main" class="noticias-box-main">
    <div v-for="noticia in noticias" :key="noticia._id" class="box-noticia-main">
      <div class="img-box">
        <img src="@/assets/img/foto1-800x395.jpg" alt="{{ noticia.titulo }}" class="noticia-img" >
      </div>
      <div class="text-box">
        <h3 class="noticia-title"><RouterLink :to="{ name: 'noticias', params: { id: noticia._id } }" class="noticia-link">{{ noticia.titulo }}</RouterLink></h3>
        <p class="noticia-text">{{ noticia.cabecera }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.noticias-box-main{
    width: 100%;
    margin-top: -105px;
    padding-top: 125px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;

    .box-noticia-main {
        width: 80%;
        min-width: 400px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: flex-start;
        margin: 20px auto 0;
        padding: 20px;

        .img-box {
            width: 30%;
            border-radius: 100%;
            box-shadow: 0 0 0 7px #fff, 0 0 0 8px rgba(0 0 0 / 10%);

            .noticia-img {
                width: 100%;
                border-radius: 100%;
            }
        }

        .text-box {
            width: 65%;
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .noticia-title {
                font-size: 2.5em;
                margin-bottom: 20px;
                text-align: center;
            }

            .noticia-text {
                font-size: 1.5em;
                text-align: justify;
            }
        }

        &:nth-child(even) {
            flex-direction: row-reverse;
        }

        & + .box-noticia-main {
            border-top: 1px solid rgb(71 1 1);
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

@media screen and (width <= 1200px) {
    .noticias-box-main{
        .box-noticia-main {
            flex-direction: column;

            .img-box {
                width: 100%;
                max-width: 400px;
                margin: 0 auto;

                .noticia-img {
                    width: 100%;
                }
            }

            .text-box {
                width: 100%;

                .noticia-title {
                    font-size: 2.1em;
                }

                .noticia-text {
                    font-size: 1.3em;
                }
            }

            &:nth-child(even) {
                flex-direction: column;
            }
        }
    }
}

@media screen and (width <= 768px) {
    .noticias-box-main{
        .box-noticia-main {
            .text-box {
                .noticia-title {
                    font-size: 1.8em;
                }

                .noticia-text {
                    font-size: 1em;
                }
            }
        }
    }
}
</style>
