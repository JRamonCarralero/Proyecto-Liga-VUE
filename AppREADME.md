# Proyecto Liga Vue

Esta es una versión del proyecto original [proyecto-liga](https://github.com/JRamonCarralero/proyecto-liga), en el que sólo está incluida la parte publica de la app, montada con el framework de Vue.

## Vistas

Tenemos 3 apartados:

* Página de inicio
* Página de noticias, con buscador, paginación y detalle de noticias
* Página de competición, con la información de las distintas ligas (equipos, jugadores, jornadas, partidos, clasificaciones, estadísticas)

## Metodología

* Front: HTML, CSS, JavaScript, Vue
* Back: Servidor nodeJS con ExpressJS
* BBDD: MongoDB
* Principios SOLID
* JSdocs para la documentación
* GitHub para gestión de repositorios

## Datos

AccionesPartido = {
    _id
    partidoId
    minuto
    jugadorId
    equipoId
    accion
}

Clasificacion = {
    _id
    ligaId
    equipoId
    puntos
    partidosJugados
    partidosGanados
    partidosEmpatados
    partidosPerdidos
    puntosAnotados
    puntosRecibidos
}

Equipo = {
    _id
    nombre
    poblacion
    direccion
    estadio
}

EstadisticaJugador = {
    _id
    ligaId
    equipoId
    jugadorId
    ensayos
    puntosPie
    puntos
    tAmarillas
    tRojas
}

Jornada = {
    _id
    fecha
    numero
    ligaId
}

Jugador = {
    _id
    nombre
    apellidos
    nacionalidad
    altura
    peso
    equipoId
}

Liga = {
    _id
    nombre
    year
    equipos
    main
}

Noticia = {
    _id
    fecha
    titulo
    cabecera
    imagen
    contenido
}

Partido = {
    _id
    jornadaId
    ligaId
    local
    visitante
    puntosLocal
    puntosVisitante
    puntosCLocal
    puntosCVisitante
    jugadoresLocal
    jugadoresVisitante
    fecha
    jugado
}
