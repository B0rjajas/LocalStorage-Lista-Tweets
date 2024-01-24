// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Inicializar eventos
EventListener();

// Función que inicializa los eventos
function EventListener() {
    // Configurar evento 'submit' en el formulario
    formulario.addEventListener('submit', cargarTweet);

    //CUANDO EL DOCUMENTO esta listo
    document.addEventListener('DOMContentLoaded', ()=> {
        tweets = JSON.parse( localStorage.getItem('tweets')) || [];

        console.log(tweets);
        // Crear el HTML con los tweets recuperados
        crearHTML();
    })
}

// Función manejadora del evento 'submit'
function cargarTweet(e) {
    e.preventDefault(); // Prevenir que el formulario se recargue

    // Lógica para cargar el tweet
    const tweet = document.querySelector('#tweet').value;
    const tweetVacio = tweet === '';
    if (tweetVacio) {
        mostrarError('NO no puede ir VACIO');
        console.log('No valido')
        return;
    }
    

    const tweetOBJ = {
        id: Date.now(),
        texto: tweet
    }

    //Agregar Array vacio
    tweets = [...tweets, tweetOBJ];
    
    //UNa vez Agregado CREAR HTML
    crearHTML();
    

    //Reiniciar el Formulario
    formulario.reset();
    


    

}






//Mostrar Mensaje de Error 
function mostrarError(mensaje){
     const mensajeError = document.createElement('p');
     mensajeError.textContent = mensaje;
     mensajeError.classList.add('error');

     //Insertar el mensaje en el contenido
     const contenido = document.querySelector('#contenido');

     contenido.appendChild(mensajeError);
     
     //Aparezca Mensaje de ERROR TIMEOUT 

     setTimeout(() => {
        mensajeError.remove();
        
     }, 3000);

}


//Muestra un listado de TWEETS

//Muestra un listado de TWEETS
function crearHTML(){
    LimpiarHTML();

    if(tweets.length > 0 ){
        tweets.forEach( comentario => {
            //Agregar un boton de ELimiar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('btnEliminar');
            btnEliminar.textContent = 'X';

            //FUNCION Eliminar

            btnEliminar.onclick = () => {
                borrarTweet(comentario.id);
                
            }
            //CREAR Html
            const li = document.createElement('li');
            li.textContent = comentario.texto; // Cambiado de tweet.tweet a tweet.texto
            
            //Agregar en HTML 
            listaTweets.appendChild(li);

            //Agregar BotomELiminar tweets en HTML
            listaTweets.appendChild(btnEliminar);
        })
    }

    sincronizarStorage();
}

//Agregar los tweets  al LocalStorage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

//ELIMINAR TWEET
function borrarTweet(id){
    
    tweets = tweets.filter( comentario => comentario.id !== id)
    console.log('borrando')
    crearHTML();
    
}

//Limpiar HTML
function LimpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}





