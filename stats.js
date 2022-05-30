let dataApi;
let apiEventos = []

async function cargarEventos(){
    await fetch ('https://amazing-events.herokuapp.com/api/events')
        .then(respuesta => respuesta.json())// aca informa el formato en q deseo q se ponga la info
        .then(json => dataApi = json )
        apiEventos = dataApi.events
        
        let currentDate = dataApi.currentDate
        let arrayPasado = apiEventos.filter(e => currentDate > e.date)
        let arrayFuturo = apiEventos.filter(e => currentDate < e.date)

            let ordenPorcentaje = []
            arrayPasado.map(eventos => {
                ordenPorcentaje.push({
                eventos: eventos.name,
                  porAssistance: (eventos.assistance * 100 / eventos.capacity).toFixed(2)
                })
            })
            let porcentajeMax = ordenPorcentaje.sort((a, b) => b.porAssistance - a.porAssistance)[0]
            let porcentajeMin = ordenPorcentaje.sort((a, b) => a.porAssistance - b.porAssistance)[0]
            let capacity = arrayPasado.filter(e => e.capacity).sort((a, b) => b.capacity - a.capacity)[0]
            
            const categoriaFuturo = arrayFuturo.map(eventos => eventos.category)
            const categoriaSetFuturo = new Set(categoriaFuturo)
            const categoriasFuture = [...categoriaSetFuturo]

            const categoriaValueFuturo = [] //Creamos un Array que contiene 1 objeto con 2 propiedades
            categoriasFuture.map(category =>
            categoriaValueFuturo.push({
                                        category: category,
                                        evento: arrayFuturo.filter(evento => evento.category === category), //Ahora tenemos las categorias que tienen adentro todos los eventos pasados
        }))

            let estimadoYCapacidadFuturo = [] // De la varible anterior mapeamos en un nuevo array,
            categoriaValueFuturo.map(datos => {
            estimadoYCapacidadFuturo.push({
                                            category: datos.category,
                                            estimate: datos.evento.map(item => item.estimate),
                                            capacity: datos.evento.map(item => item.capacity),
                                            estimateRevenue: datos.evento.map(item => item.estimate * item.price)
        })
    })
            

            estimadoYCapacidadFuturo.forEach(category => {
            let totalEstimado = 0
            category.estimate.forEach(estimate => totalEstimado += Number(estimate)) //suma de assistencia
            category.estimate = totalEstimado

            let totalCapacidadFuturo = 0
            category.capacity.forEach(capacity => totalCapacidadFuturo += Number(capacity)) //suma de capacity
            category.capacity = totalCapacidadFuturo

            let totalEstimadoRevenue = 0
            category.estimateRevenue.forEach(estimateRevenue => totalEstimadoRevenue += Number(estimateRevenue)) //suma de revenue
            category.estimateRevenue = totalEstimadoRevenue

            category.porcentajeAttendace = ((totalEstimado * 100) / totalCapacidadFuturo).toFixed(2) //le agregamos una nueva propiedad, el calculo de % assistencia total por categoria.
        })

            const categoryAssit = arrayPasado.map(eventos => eventos.category) // Extrajimos las categorias del array del evento pasado
            const categoriaSet = new Set(categoryAssit) //Aplicamos el sett para eliminar las categorias duplicadas
            const categorias = [...categoriaSet] //Ahora en categorys tenemos un array de 7 categorias


            const categoriaValue = [] //Creamos un Array que contiene 1 objeto con 2 propiedades
            categorias.map(category =>
            categoriaValue.push({
                                    category: category,
                                    evento: arrayPasado.filter(evento => evento.category === category), //Ahora tenemos las categorias que tienen adentro todos los eventos pasados
        })
    )

            let asistenciaYCapacidadPasado = [] // De la varible anterior mapeamos en un nuevo array,
            categoriaValue.map(datos => {
            asistenciaYCapacidadPasado.push({
                                                category: datos.category,
                                                assistance: datos.evento.map(item => item.assistance),
                                                capacity: datos.evento.map(item => item.capacity),
                                                revenue: datos.evento.map(item => item.assistance * item.price)
        })
    })
  //Ahora sumamos todos los elementos de cada propiedad entre si (assistance, capacity, revenue)

            asistenciaYCapacidadPasado.forEach(category => {
            let totalAsistencia = 0
            category.assistance.forEach(assistance => totalAsistencia += Number(assistance)) //suma de assistencia
            category.assistance = totalAsistencia

            let totalCapacidad = 0 
            category.capacity.forEach(capacity => totalCapacidad += Number(capacity)) //suma de capacity
            category.capacity = totalCapacidad

            let totalRevenue = 0
            category.revenue.forEach(revenue => totalRevenue += Number(revenue)) //suma de revenue
            category.revenue = totalRevenue

            category.porcentaje = ((totalAsistencia * 100) / totalCapacidad).toFixed(2) //le agregamos una nueva propiedad, el calculo de % assistencia total por categoria.
        })

        function primeraTabla() {
            let contenedorUno = `
            <td scope="row">${porcentajeMax.eventos}: ${porcentajeMax.porAssistance}%</td>
            <td>${porcentajeMin.eventos}: ${porcentajeMin.porAssistance}%</td>
            <td>${capacity.name}: ${capacity.capacity}</td>
            `
                                    
                                    
        document.getElementById("tablaDinamica").innerHTML = contenedorUno
        }
        primeraTabla()

        function segundaTabla() {
            let contenedorDos = ""
            estimadoYCapacidadFuturo.forEach(e => {
            e.estimadoYCapacidadFuturo
            contenedorDos += `
            <tr>
            <td scope="row">${e.category}</td>
            <td >$${e.estimateRevenue}</td>
            <td >${e.porcentajeAttendace}%</td>
            </tr>`
            })
            document.getElementById("tablaDinamicaDos").innerHTML = contenedorDos
        }
        segundaTabla()
        
        function terceraTabla() {
            let contenedorTres = ""
            asistenciaYCapacidadPasado.forEach(e => {
            e.asistenciaYCapacidadPasado
            contenedorTres += `
            <tr>
            <td scope="row">${e.category}</td>
            <td >$${e.revenue}</td>
            <td >${e.porcentaje}%</td>
            </tr>`
            })
            document.getElementById("tablaDinamicaTres").innerHTML = contenedorTres
        }
        terceraTabla()
    }
    cargarEventos()







//             let primerTemplateHTML = ""
//             primerTemplateHTML += `
//             <tr>
//             <td data-title="Events whit the highest percentage of attendance">${ordenPorcentaje[0].name} ${arrayAsistenciaMax}%</td>
//             <td data-title="Events whit the lowest percentage of attendance">${ordenPorcentaje[29].name} ${arrayAsistenciaMin}%</td>
//             <td data-title="Event with larger capacity">${arrayCategoriaMax} ${arrayCategoria[0].capacity}</td>
//             </tr>
//             `
            
//         document.querySelector("#tablaDinamica").innerHTML = primerTemplateHTML
        
// //--------------------------------------------------------Tabla Dos--------------------------------------------------------------------------

//         let tarjetasFuturas = [] 
//         tarjetasFuturas.push(...apiEventos.filter(elemento => elemento.date > dataApi.currentDate))
//         console.log(tarjetasFuturas)
        
//         let arrayCategory = []
//         var categoriaUnicas
        
//         function obtenerCategorias(){
//             arrayCategory = tarjetasFuturas.map(elemento => elemento.category)
//             categoriaUnicas = new Set(arrayCategory);
            
//             console.log(arrayCategory);
//             console.log(categoriaUnicas);
//             arrayCategoriaMax = arrayCategoria[0].name
//             crearTablaDos(categoriaUnicas)
//         }
//         obtenerCategorias()
        
//         tarjetasFuturas.filter(e => e.category)
        
//         let arrayEstimate = []
//         let arrayIngresos = []
        
//         function obtenerEstimate(){
//             arrayEstimate = tarjetasFuturas.map(elemento => elemento.estimate).sort((a, b) => b.estimate - a.estimate)
//             console.log(arrayEstimate);
//             arrayAsistenciaMax = arrayEstimate[0].name
//             console.log(arrayAsistenciaMax);
//             arrayEstimate = tarjetasFuturas.filter(elemento => elemento.estimate).sort((a, b) => a.estimate - b.estimate)
//         arrayAsistenciaMin = arrayEstimate[0].name
//         }
//         obtenerEstimate()
        
//         arrayEstimate = tarjetasFuturas.map(futuretarjet => (futuretarjet.estimate*100/futuretarjet.capacity)).sort((a, b) => b - a) //Porcentaje Estimados
//         console.log(arrayEstimate);
        
        
//         arrayIngresos = tarjetasFuturas.map(futuretarjet => (futuretarjet.estimate*futuretarjet.price)).sort((a, b) => b - a) //Ingresos
//         console.log(arrayIngresos); 
        
//         function crearTablaDos(){
//         console.log(categoriaUnicas);
//             let segundoTemplateHTML = ""
//             categoriaUnicas.forEach(element => {
//                 segundoTemplateHTML +=`
//                 <tr>
//                     <td>${element}</td>
                    
//                 </tr>`
//             })
//         document.querySelector("#tablaDinamicaDos").innerHTML = segundoTemplateHTML
        
//         }
//         crearTablaDos()
//     }
// cargarEventos()
















// let evento = []

//1ro separo las categorias y extraigo


//function tabla(){
//    tarjetasPasadas.map(pasttarjet =>{ eventoos.push({nombre:pasttarjet.category,
//                                                       ingreso : pasttarjet.assistance*pasttarjet.price|| pasttarjet.estimate*pasttarjet.price,
//                                                       porcentaje : pasttarjet.estimate*100/pasttarjet.capacity||pasttarjet.assistance*100/pasttarjet.capacity



// async function cargarEventos(){
//     await fetch ('https://amazing-events.herokuapp.com/api/events')
//         .then(respuesta => respuesta.json())// aca informa el formato en q deseo q se ponga la info
//         .then(json => {evento.push(...json.eventos)})

//     }
    
//     console.log(evento)

    

//------------------- necesito -----------------------
//category 
//asistencias
//capacidad
//ingreso
