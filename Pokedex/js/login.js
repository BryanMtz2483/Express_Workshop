window.onload = init;

function init(){
    if(!localStorage.getItem("token")){
        document.querySelector('.btn-secondary').addEventListener('click', function (){
            window.location.href = "signin.html";
        });
        document.querySelector('.btn-primary').addEventListener('click', login);
    }else{
        window.location.href= "pokedex.html";
    }    
}

function login(){
    var mail = document.getElementById('input-mail').value;
    var pass = document.getElementById('input-password').value;
    if(mail && pass){   
        console.log(mail,pass);
        axios({
            method:'post',
            url: 'http://localhost:3000/user/login',
            data: {
                user_mail: mail,
                user_password: pass
            }
        }).then( function(res){
            console.log(res);
            if(res.data.code === 200){
                alert("Inicio Exitoso");
                localStorage.setItem("token", res.data.message);
                window.location.href= "pokedex.html";
            }
        }).catch(function(err){
            console.log(err);  
            alert("Usuario Y/O contraseña incorrectos");        
        })
    }else{
        alert("Campos incompletos");
    }
}

//Document es un objeto que existe dentro del navegador, representa todo el árbol de elementos que se están mostrando en en la pantalla, básicamente nos muestra todo el árbol que deriva a partir de el html el head el body y todo su contenido.

//QuerySelector es una función a la cual tú le pasas un nombre de una clase de estilo de nuestro html, en este caso el btn-primary o secondary. Mediante el document y query selector se representa la selección de un elemento en específico del html en este caso son los botones de entrar y de registo

//Con el addEventListener le añadimos un evento al elemento seleccionado, este método tiene dos parámetros: 1-Cuando va a ejecutarse el evento, en este caso es que al botón al hacerle click y 2-Cuando suceda lo anterior que va a ejecutar o hacer dicho elemento, en este caso va a ejecutar una función para mandarnos al archivo signin.html

//getElementById funciona muy parecido al querySelector, solo que en vez de darle una clase de estilo como parámetro se le da un id que el programador establece. .value sirve para que obtengamos el valor actual de un elemento, en este caso el valor actual de un input.

//Axios es una libreria que nos ayuda a mandar nuestros datos al servidor o nuestra API y que nos da muchas facilidades y esta al ser utilizada recibe 3 parámetros, 1- El método hhtp de la petición que se le hará a nuestro servidor, en este caso en nuestro servidor tenemos la ruta del login con método POST así que ese establecimos. 2- La url, es decir, a donde vamos a hacer la petición y 3- Los datos que vamos a enviar al servidor. Todo esto abarca solo el mandar la petición al servidor.

//Lo anterior fué la peticion, la palabra .then sirve para ejecutar una función después de que se haya hecho la petición al servidor en este caso la utilizamos para procesar la respuesta que mandó nuestro servidor al respecto de nuestra petición.

//Ahora la palabra .catch sirve para ejecutar una función para cuando haya algún tipo de error al hacer esta petición (El error puede darse por algo mal programado en la API, también porque enviamos datos que hicieron que nuestro servidor funcionara mal puede darse porque se interrumpe la conexión a internet ó también puede darse por errores de seguridad (En este caso sale un error en el cual se bloquea la petición por policas del cors, que es una política de seguridad entre los dispositivos para que si se tiene un servidor funcionando, el servidor no permita peticiones de clientes desconocidos. Esto se soluciona creando un middleware dentro de la API donde establezcamos quienes pueden tener acceso al servidor ya que siempre está activa la polícita cors por temas de seguridad.))
