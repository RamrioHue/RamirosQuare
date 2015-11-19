function registrar(){
    //Función para registrar al usuario en el localStorage
    //Obtenemos valores de las contraseñas
    var mensaje = document.getElementById('mensaje');
    var pass1 = document.getElementById('contraseña').value;
    var pass2 = document.getElementById('confirma').value;

    //Comparamos las contraseñas antes de hacer el registro
    if(pass1==pass2){
        var contador = 0;
        localStorage.setItem('contador', contador);
        //Si las contraseñas coinciden registramos al usuario
        var nombre = document.getElementById('nombre').value;
        var correo = document.getElementById('correo').value;
        //Guardamos los datos en el local storage
        localStorage.setItem('nombre', nombre);
        localStorage.setItem('correo', correo);
        localStorage.setItem('contraseña', pass1);
        //Le indicamos al usuario que el registro fue exitoso con el <p> de id "mensaje"
        mensaje.style.opacity="1";
        mensaje.style.background="rgba(0,85,71,.8)";
        mensaje.style.transition=".6s all";
        mensaje.innerHTML = "Usuario registrado";
        //Redirigimos a la pagina de inicio de sesión después de 5 segundos
        setTimeout(function(){
            window.location.assign('login.html');
        },2500);
    }//if
    else{
        //Si las contraseñas NO coinciden se lo indicamos al usuario con el <p> de id "mensaje"
        document.getElementById('contraseña').style.border="3px solid red";
        document.getElementById('confirma').style.border="3px solid red";
        mensaje.style.opacity="1";
        mensaje.style.background="rgba(255,55,50,.8)";
        mensaje.style.transition=".6s all";
        mensaje.innerHTML = "Las contraseñas no coinciden";
        //Le regresamos a <p> de id "mensaje" su opacity a 0
        setTimeout(esconder, 5000);
    }//else
}//registrar()

function esconder(){
    //Función para regresar el opacity del <p> con id "mensaje" a 0
    document.getElementById('mensaje').style.opacity="0";
    document.getElementById('mensaje').style.transition=".6 all";
}//esconder()

function login(){
    //Función para que el usuario inicie sesión
    var mensaje = document.getElementById('mensaje');
    //Obtenemos los valores del formulario
    var correo =  document.getElementById('correo').value;
    var pass = document.getElementById('contraseña').value;
    //Asignamos valores del localStorage a variables
    var localsc =  localStorage.getItem('correo');
    var localsp =  localStorage.getItem('contraseña');
    //Comparamos los valores del formulario con los del localStorage
    if(correo == localsc && pass == localsp){
        //Si coinciden le indicamos al usuario que el logeo fue exitoso con el <p> de id "mensaje"
        mensaje.style.opacity = "1";
        mensaje.style.background="rgba(0,85,71,.8)";
        mensaje.style.transition=".6s all";
        mensaje.innerHTML = "Bienvenido";
        //Redirigimos al usuario a la pantalla pricipal después de 5 segundos
        setTimeout(function(){
            window.location.assign('main.html')
        },2500);
    }//if
    else{
        //Si los valores no coinciden se lo indicamos al usuario con el <p> de id "mensaje"
        mensaje.style.opacity = "1";
        mensaje.style.background="rgba(255,55,50,.8)";
        mensaje.style.transition=".6s all";
        mensaje.innerHTML = "Usuario o contraseña incorrectos";
        //Le regresamos a <p> de id "mensaje" su opacity a 0
        setTimeout(esconder, 5000);
    }//else
}//login()


function aquitoy(){
    //Función para obtener la posición
    navigator.geolocation.getCurrentPosition(ontoy);
}//aquitoy()

function ontoy(position){
    //Función para obtener coordenadas de latitud y longitud
    var latitud = (position.coords.latitude);
    var longitud = (position.coords.longitude);
    //Obtenemos el valor de la pantalla redondeado al menor
    //Lo hacemos porcentaje y lo asignamos a la variable 'wpx'
    //Para ajustarlo al tamaño del <div> que lo contiene
    var wpx = Math.floor(screen.width*.90);
    //Le asignamos al source el link del API para conseguir la imagen de la ubicación del usuario
    document.getElementById('image').src="http://maps.google.com/maps/api/staticmap?center="+latitud+","+longitud+"&zoom=17&markers="+latitud+","+longitud+"&size="+wpx+"x"+wpx;
}//ontoy()

function actualiza(val){
    //Función para actualizar el valor del <p> con id "notita" en su innerHtml
    document.getElementById('notita').value=val;
    document.getElementById('notita').innerHTML = val;
}

function guardarLugar(){
    //Funcion para guardar el lugar donde te encuentras
    //Obtiene los valores de los inputs
    var nombreLugar = document.getElementById('nombreLugar').value;
    var varo = document.getElementById('varo').value;
    var nota = document.getElementById('notita').value;
    var categoria = document.getElementById('categoria').options.selectedIndex;
    var opcion = document.getElementById('categoria').options[categoria].text;
    //Los guarda en el localStorage
    contador = localStorage.getItem('contador');
    localStorage.setItem('nombreLugar'+contador, nombreLugar);
    localStorage.setItem('varo'+contador, varo);
    localStorage.setItem('nota'+contador, nota);
    localStorage.setItem('opcion'+contador, opcion);
    ubicacion = document.getElementById('image').src;
    localStorage.setItem('ubicacion'+contador, ubicacion);
    contador++;
    localStorage.setItem('contador', contador);
    
    document.getElementById('guardar').innerHTML="Guardado";
    setTimeout(function (){
 document.getElementById('guardar').innerHTML="Guardar";
    },2500);
}

function mostrar(){
    var tmp = 0;
    var lugares = document.getElementById('lugares');
    while(tmp<localStorage.getItem('contador')){
        var nombre = localStorage.getItem('nombreLugar'+tmp);
        var varo = localStorage.getItem('varo'+tmp);
        var nota = localStorage.getItem('nota'+tmp);
        var opcion = localStorage.getItem('opcion'+tmp);
        var ubicacion = localStorage.getItem('ubicacion'+tmp);
        if(tmp == 0){
            lugares.innerHTML += "<div id=primer class=lugar><p id=nombre>"+nombre+"</p><p id=gasto>"+varo+"</p><p id=nota>"+nota+"</p><p id=categoria>"+opcion+"</p><img src="+ubicacion+" id=mapa></div>"
            tmp++;
        }else{
            lugares.innerHTML += "<div class=lugar><p id=nombre>"+nombre+"</p><p id=gasto>"+varo+"</p><p id=nota>"+nota+"</p><p id=categoria>"+opcion+"</p><img src="+ubicacion+" id=mapa></div>"
            tmp++;
        }
    }
}

