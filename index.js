// Se agrego un repositorio con un archivo JSON con la información que se debe cargar
// https://github.com/rfigueor/js_33995_db/blob/main/db.json
// la cual se invoca desde el servicio gratuito de https://my-json-server.typicode.com/


const getServicios = async () => {
    const respuesta = await fetch("https://my-json-server.typicode.com/rfigueor/js_33995_db/tree/main/servicios");
    const data = await respuesta.json();

    msg = `<option value="0" selected>Seleccione Servicio</option>`

    for (const item of data) {
        msg = msg + `<option value="${item.id}">${item.nombre}</option>`
    }
    document.getElementById("listServicio").innerHTML = msg;
};

const getPinturas = async () => {
    const respuesta = await fetch("https://my-json-server.typicode.com/rfigueor/js_33995_db/tree/main/pinturas");
    const data = await respuesta.json();

    let lstPintura = JSON.parse(localStorage.getItem("ltPintura"));
    msg = `<option value="0" selected>Seleccione Superficie a Pintar</option>`

    for (const item of lstPintura) {

        msg = msg + `<option value="${item.id}">${item.nombre} ${item.nota}</option>`
    }
    document.getElementById("listPintura").innerHTML = msg;
};

const mtXvalor = (mt, valor) => { return mt * valor; }

const extraXpiso = (porc, numPiso, precio) => { return ((precio / 100) * (porc * numPiso)) + precio }

function fnBuildMessage(item) {
    let msg = "";

    switch (item) {
        case "servicios":
            let lstServicio = JSON.parse(localStorage.getItem("ltServicios"));

            msg = `<option value="0" selected>Seleccione Servicio</option>`

            for (const item of lstServicio) {
                msg = msg + `<option value="${item.id}">${item.nombre}</option>`
            }
            document.getElementById("listServicio").innerHTML = msg;
            break;

        case "pintura":
            let lstPintura = JSON.parse(localStorage.getItem("ltPintura"));
            msg = `<option value="0" selected>Seleccione Superficie a Pintar</option>`

            for (const item of lstPintura) {

                msg = msg + `<option value="${item.id}">${item.nombre} ${item.nota}</option>`
            }
            document.getElementById("listPintura").innerHTML = msg;
            break;

        default:
            msg = "sin informacion";
            break;
    }
    return msg;
}

async function fnCalcular() {
    let msg = '';
    let mt2 = 0;              // Inicializa variable
    let totalMonto = 0;       // Inicializa variable
    let tipoServicio = Number(localStorage.getItem("lsServicioSelect"));
    let precio = tipoServicio === 1 ? 2000 : 2500;      // Valor de mano de obra por metro cuadrado
    
    //SERVICIO DE PINTURA
    if (tipoServicio === 1) {

        let tipoTrabajo = Number(localStorage.getItem("lsTipoTrabajoSelect"));

        if (tipoTrabajo === 1) {
            mt2 = Number(localStorage.getItem("mtCasa"));
            msg = "El valor total del trabajo de pintura de la casa es de : $" + mtXvalor(mt2, precio).toString();
        } else if (tipoTrabajo === 2) {
            let porcAdic = 5;
            let pisos = Number(localStorage.getItem("pisosEdif"));
            mt2 = Number(localStorage.getItem("mtEdif"));

            //Se realiza calculo del piso 1
            totalMonto = mtXvalor(mt2, precio);
            for (let x = 1; x < pisos; x++) {
                totalMonto = totalMonto + mtXvalor(mt2, extraXpiso(porcAdic, x, precio));
            }
            msg = "El valor total del trabajo de pintura del edificio es de $" + totalMonto.toString();
        }
    } else if (tipoServicio === 2) {
        //SERVICIO DE RADIER
        let mtCubicosXsaco = 0.025;       // Se entienede que un 1 saco rinde para 1 mt cuadrado con una altura de 25 cm 

        mt2 = Number(localStorage.getItem("mtRadier"));
        let cmAltura = Number(localStorage.getItem("cmRadier"));

        let cantSacos = Math.round((mt2 * (cmAltura / 1000)) / mtCubicosXsaco);

        msg = "El valor del trabajo es de $" + mtXvalor(mt2, precio).toString() + " y se requieren un total de " + cantSacos.toString() + " sacos de concreto.";
    } else {
        msg = "Servicio seleccionado no valido";
    }
    console.log(msg);

    Swal.fire({
        icon: 'info',
        title: 'Monto del Trabajo',
        text: msg,
      });
}



document.getElementById('listServicio').addEventListener('change', async function () {

    let tipoServicio = Number(this.value);
    localStorage.setItem("lsServicioSelect", tipoServicio);

    if (tipoServicio !== 1 && tipoServicio !== 2){
        document.getElementById("divPintura").style.visibility = "hidden";
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Seleccione Opcion Valida!!',
          })
    }
    else if(tipoServicio === 1){
        document.getElementById("divPintura").style.visibility = (tipoServicio === 1) ? "visible" : "hidden";
    }
    else if(tipoServicio === 2){
        const { value: mt2 } = await Swal.fire({
            title: '¿Cantidad de metros cuadrados?',
            input: 'number',
            inputPlaceholder: 'Ingrese cantidad de metros cuadrados'
          });

          const { value: cm } = await Swal.fire({
            title: '¿Altura en cm del radier? (cm)',
            input: 'number',
            inputPlaceholder: 'Ingrese altura del radier en cm'
          });

          localStorage.setItem("mtRadier", mt2);
          localStorage.setItem("cmRadier", cm);

          fnCalcular();
    }
});


document.getElementById('listPintura').addEventListener('change', async function () {

    let tipoTrabajo = Number(this.value);
    localStorage.setItem("lsTipoTrabajoSelect", tipoTrabajo);

    if (tipoTrabajo !== 1 && tipoTrabajo !== 2){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Seleccione Opcion Valida!!',
          })
    }
    else if(tipoTrabajo === 1){
        const { value: mt2 } = await Swal.fire({
            title: '¿Cantidad de metros cuadrados?',
            input: 'number',
            inputPlaceholder: 'Ingrese cantidad de metros cuadrados'
          });
          localStorage.setItem("mtCasa", mt2);
          fnCalcular();
    }
    else if(tipoTrabajo === 2){
        const { value: pisos } = await Swal.fire({
            title: '¿Cantidad de pisos?',
            input: 'number',
            inputPlaceholder: 'Ingrese cantidad de pisos del edificio'
          });

          const { value: mt2 } = await Swal.fire({
            title: '¿Cantidad de metros cuadrados ?',
            input: 'number',
            inputPlaceholder: 'Ingrese cantidad de metros cuadrados'
          });

          localStorage.setItem("pisosEdif", pisos);
          localStorage.setItem("mtEdif", mt2);

          fnCalcular();
    }
});

function fnStar() {
    getServicios();
    getPinturas();
    document.getElementById("divPintura").style.visibility = "hidden";
}

fnStar()