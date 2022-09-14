function fnPintura(){
    let mt2=0;
    let totalMonto=0;
    let precio = 2000;
    
    let tipoPinturaTrabajo = parseInt(prompt("¿Que desea pintar?\n1. Casa (Obs: 1 Solo piso) \n2.Edificio (Obs: Se agrega 5% extra al valor del mt2 por cada piso a contar desde 2do piso)"));    

    //Se ejecuta el ciclo hasta que selecciona una opcion valida
    while (tipoPinturaTrabajo !== 1 &&  tipoPinturaTrabajo !== 2){
        tipoTrabajo = parseInt(prompt("¿Que desea pintar?\n1. Casa (Obs: 1 Solo piso) \n2.Edificio (Obs: Se agrega 5% extra al valor del mt2 por cada piso a contar desde 2do piso)"));    
    }


    if(tipoPinturaTrabajo===1){
        mt2 = parseInt(prompt("¿Cantidad de metros cuadrados?"));    
        totalMonto= precio * mt2;
        alert("El valor total del trabajo de pintura de la casa es de : $"+ totalMonto.toString());
    }else{
        let porcAdic = 5;
        let pisos = parseInt(prompt("¿Cantidad de pisos del edificio?"));
        while (pisos === 1){
            pisos = parseInt(prompt("La cantidad de pisos debe ser igual o mayor a 2:"));
        }
        mt2 = parseInt(prompt("¿Cantidad de metros cuadrados?"));    

        //Se realiza calculo del piso 1
        totalMonto= precio * mt2;

        //Para efectos del calculo (multiplicacion), se inicia en 1 pero se llega a la cantidad "anterior" del total de piso [x < pisos]
        for (let x = 1; x < pisos; x++) {
            totalMonto = totalMonto + ((((precio / 100) * (porcAdic*x)) + precio) * mt2);
        }

        alert("El valor total del trabajo de pintura del edificio es de $"+ totalMonto.toString());
    }
}


function fnRadier(){
    let mt2 = parseInt(prompt("¿Cantidad de metros cuadrados?"));    
    let cmAltura= parseInt(prompt("¿Cantidad de cm del altura?"));
    
    
    while (cmAltura < 15){
        cmAltura = parseInt(prompt("La altura minima necesaria es de 15 cm, favor ingrese nuevamente la altura:"));
    }

    let mtCubicosXsaco=0.025;       // Se entienede que un 1 saco rinde para 1 mt cuadrado con una altura de 25 cm 
    let precio = 2500;              // Valor de mano de obra por metro cuadrado

    let cantSacos = Math.round((mt2 * (cmAltura/1000))/mtCubicosXsaco);
    let totalMonto= mt2 * precio;

    alert("- Se requieren un total de "+ cantSacos.toString()+" sacos de concreto.\n- El valor del trabajo es de $"+ totalMonto.toString());
    
}


let tipoTrabajo = parseInt(prompt("¿Seleccione el tipo de trabajo a realizar?\n1. Trabajo de Pintura\n2. Construcción de Radier"));

//Se ejecuta el ciclo hasta que selecciona una opcion valida
while (tipoTrabajo !== 1 &&  tipoTrabajo !== 2){
    tipoTrabajo = parseInt(prompt("Debe seleccionar el tipo de trabajo:\n1. Trabajo de Pintura\n2. Construcción de Radier"));
}

if(tipoTrabajo === 1)
{
    fnPintura();
}
else
{
    fnRadier();
}