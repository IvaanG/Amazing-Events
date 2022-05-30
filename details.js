let dataApi;
let apiEventos = []



async function cargarEventos(){
    await fetch ('https://amazing-events.herokuapp.com/api/events')
        .then(respuesta => respuesta.json())// aca informa el formato en q deseo q se ponga la info
        .then(json => dataApi = json )
        apiEventos = dataApi.events

function obtenerDatos(){
    var id = location.search.split("?id=").filter(String) // creo var id, La interface Location representa la ubicación (URL) del objeto al que esta vinculado, search busca y slit separa y el filter me filtra el id q es un string en este caso
    var detalle = apiEventos.find((eventos)=>{ //creo var, en mi array apiEventos.find() devuelve el valor del primer elemento del array que cumple la función de prueba proporcionada
        return eventos._id == id // aca le doy mi condicion, que compare con el 1er elemento que coincida 
    })
    var templateHtml = `<div class="row g-0" style="display: flex;justify-content: center;align-items: center;">
    <div class="col-md-6 "  >
        <img src="${detalle.image}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-6">
        <div class="detailcard">
        <h2 class="card-title">${detalle.name}</h2>
        <h3>Category : ${detalle.category}</h3>
        <h5>Date : ${detalle.date}</h5>
        <p class="card-text">Description : ${detalle.description}</p>
        <p class="card-text">Place : ${detalle.place}</p>
        <p class="card-text">Price : ${detalle.price} USD</p>
        
        </div>
    </div>
    </div>`


document.querySelector('#cardDetail').innerHTML = templateHtml
}
obtenerDatos()
}
cargarEventos()
