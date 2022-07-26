let total = 1;
caracteres = parseInt(prompt('Ingrese los caracteres posibles: '));
if (isNaN(caracteres)){
    alert("No ingresaste un numero");
}else{
    campos = parseInt(prompt('Ingrese los espacios disponibles: ')); 
    if (isNaN(campos)){
        alert("No ingresaste un numero");
    }else{
        for(let i= 1; i<= campos; i++){
            total =  total * caracteres;
            console.log(total);
        }
    }
}
alert("Existen "+total+" posibilidades de contrasenas con los datos ingresados");
