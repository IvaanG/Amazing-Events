var checkboxElegida = [] // creo una array para despues ubicar los filtrados
var textSearch = ""
let dataApi;
let apiEventos = []

async function cargarEventos(){
    await fetch ('https://amazing-events.herokuapp.com/api/events')
        .then(respuesta => respuesta.json())// aca informa el formato en q deseo q se ponga la info
        .then(json => dataApi = json )
        console.log(dataApi);
            apiEventos = dataApi.events

function checkboxCreada(){
    var checkboxes = document.getElementById("checkboxes")
    var todaslasCategorias = apiEventos.map(eventos => eventos.category) //Recorro el array de paises y separo de este la propiedad continent
    const arrayData = new Set(todaslasCategorias) //Dado al recorrer el array anterios me va a dar todas las propiedades, con el metodo set elimino los repetidos y dejo solo el primer elemento encontrado, el resto lo descarta
    var categorys = [...arrayData]  //guardo el dato obtenido como anterior el metodo en la variable categorys
    
    var inputCheckbox = ""
    categorys.forEach(category =>{ //Recorro el array categorys recibido como parametro y los crea abajo
        inputCheckbox += `<div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" value="${category}">
            <label class="labeel form-check-label" for="flexSwitchCheckDefault">${category}</label>
            </div>`
    })
    checkboxes.innerHTML = inputCheckbox //Imprimo el resultado en html
}
checkboxCreada()

// empiezo a capturar y escuchar los eventos de los checkbox
var checkbox = document.querySelectorAll('input[type=checkbox]')  //Guardo los checkbos en creados dinamicamente en una variable
checkbox.forEach(check => check.addEventListener("click", (event)=>{
    var verificado = event.target.checked
    if(verificado){  //Establezcon un condicional que verifica si la propiedad/atributo checked del elemento html, es true o false, es decir si esta tildado o no el checkbox
        checkboxElegida.push(event.target.value) //Si esta tildado lo empujo lo guardo dentro de la variable local declarada anteriormente CUANDO ES TRUE LO GUARDA EN CHECKBOX ELEGIDAS
        filtrarArray() //LLamo y les paso el parametro a la funcion que se ocupara del filtrado dl array
    }else{ 
        checkboxElegida = checkboxElegida.filter(uncheck => uncheck !== event.target.value)//Este metodo lo utilizo para quitar del array en checkbox deschequeado
        filtrarArray()//LLamo y les paso el parametro a la funcion que se ocupara del filtrado dl array
    } //En el caso que el checkbox sea destildado es decir pase de true a false, le  aplico a la varible checkboxSelected un filtros en el cual 
}))
// // //busco el elemetno en el html y lo fija en una varible
var inputBuscador = document.getElementById("buscador")

// // // //llamo a mi envento
inputBuscador.addEventListener("keyup",(buscar) => {
    textSearch = buscar.target.value
    filtrarArray()
})
function filtrarArray(){
    let datas = []
    if (checkboxElegida.length > 0 && textSearch !== ""){ // crea la 1ra condicion, el check y el buscador estan con contenido
        checkboxElegida.map(category => { //recorre el array y category 
            datas.push(...apiEventos.filter(carta => carta.name.toLowerCase().includes(textSearch.trim().toLowerCase()) && // la carta que coincida con el buscador, lo guarda en mi array datas 
            carta.category == category)) // y la categoria de la carta es igual a la categoria elegida
        })
    }
    else if (checkboxElegida.length > 0 && textSearch === ""){ //el check este seleccionado pero no el buscador
                // agarra ese array y se fija si en ese array hay un elemento
        checkboxElegida.map(category => datas.push(...apiEventos.filter(carta => carta.category == category))) //esta buscando las categorias que coincidan
    }
    else if (checkboxElegida.length == 0 && textSearch !== ""){ // solo esta usando el buscador
        datas.push(...apiEventos.filter(cartas => cartas.name.toLowerCase().includes(textSearch.trim().toLowerCase()))) //esta buscando que coincida el buscador con el nombre de la carta           
    }
    else {datas.push(...apiEventos)} // no este seleccionado el check ni el buscador, entonces muestra todo los eventos
    
    // console.log(datas);
    // if (datas.length == 0 ){
    //     var newTemplate = "<p>No hay coincidencias</p>"
    //     document.querySelector('#cartas').innerHTML = newTemplate
    // }
    // else{displayCardEventsPast(datas)//llama a imprimir las cartas
    // }
displayCardEventsPast(datas)
}
filtrarArray()

function displayCardEventsPast(datas){ //imprime las cartas 
    var templateHtml = ""
    for (var i = 0; i < datas.length; i++){
        if (datas[i].date <  dataApi.currentDate){
    templateHtml += `
    <div class="card col-12 col-md-5">
            <div class="face front mb-4 col-lg-6 col-md-12 col-sm-12">
                <img src="${datas[i].image}">
                <h3>${datas[i].name}</h3>
            </div>
            <div class="face back">
                <h3>${datas[i].name}</h3>
                <p>${datas[i].description}</p>
                <p>${datas[i].date}</p>
                <p>${datas[i].price} USD</p>
                <div class="link">
                    <a href="./details.html?id=${datas[i]._id}">See More</a>
                </div>
            </div>
        </div>
    `
    }
}
if(templateHtml.length > 0){
    document.querySelector('#cartaspast').innerHTML = templateHtml
}
else { 
    var newTemplate = "<p>Has not been found</p>"
    document.querySelector('#cartaspast').innerHTML = newTemplate}
}
}
cargarEventos()

