//VARIABLES PALABRAS
var palabras = ['AZUL', 'AMARILLO', 'ROJO', 'VERDE', 'VIOLETA'];
var letras = [];
var palabrascorrectas = '';
var errores = '';

//ESCOGER PALABRA AL AZAR
function escogerPalabra() {
    var palabra = palabras[Math.floor(Math.random() * palabras.length)];
    palabrasecreta = palabra
    console.log(palabras)
    return palabrasecreta
};

//VARIABLE TABLERO
const tablero = document.querySelector('.horca').getContext('2d');

//DIBUJAR HORCA
function dibujarHorca() {
    tablero.fillStyle = '#000';
    tablero.lineWidth = 18;
    tablero.moveTo(350, 600); // Punto de inicio de la linea
    tablero.lineTo(350, 300); // Punto final de la linea e inicio de la siguiente linea
    tablero.lineTo(530, 300); // Punto final de la linea
    tablero.lineTo(530, 400);
    tablero.stroke();  // Pinta las lineas
};
dibujarHorca();

//DIBUJAR LÍNEAS
function dibujarLineas() {
    tablero.lineWidth = 6
    tablero.lineCap = 'round'
    tablero.lineJoin = 'round'
    tablero.strokeStyle = '#0390sw'
    tablero.beginPath()

    var ancho = 600 / palabrasecreta.length
    for (let i = 0; i < palabrasecreta.length; i++) {
        tablero.moveTo(400 + (ancho * i), 680)
        tablero.lineTo(350 + (ancho * i), 680)
    }
    tablero.stroke()
    tablero.closePath()
};

dibujarLineas(escogerPalabra());

//DIBUJAR LETRAS CORRECTAS E INCORRECTAS
function dibujarLetraCorrecta(i) {
    tablero.font = 'bold 65px Nanum Pen Script';
    tablero.lineWidth = 6
    tablero.lineCap = 'round'
    tablero.lineJoin = 'round'
    tablero.fillStyle = "#000"

    var ancho = 600 / palabrasecreta.length
    tablero.fillText(palabrasecreta[i], 360 + (ancho * i), 675)
};

function dibujarLetraIncorrecta(letras, errorsLeft) {
    tablero.font = 'bold 30px Inter';
    tablero.lineWidth = 6
    tablero.lineCap = 'round'
    tablero.lineJoin = 'round'
    tablero.fillStyle = "grey"

    tablero.fillText(letras, 50 + (40 * (10 - errorsLeft)), 720, 40);
};

//FUNCIONES PARA VERIFICAR SI LA LETRA PRESIONADA ESTA EN LA PALABRA
function verificarLetraClicada(key) {
    if (letras.length < 1 || letras.indexOf(key) < 0) {
        letras.push(key)
        return false
    }
    else {
        letras.push(key)
        return true
    }
};

function adicionarLetraCorrecta(i) {
    palabrascorrectas += palabrasecreta[i].toUpperCase()
};

function adicionarLetraIncorrecta(letter) {
    if (palabrasecreta.indexOf(letter) <= 0) {
        errores -= 1
    }
};

//ADICIONAR LETRAS, DIBUJAR AHORCADO Y MENSAJE GANASTE/PERDISTE
document.onkeydown = (e) => {
    let letra = e.key.toUpperCase()
    if (!verificarLetraClicada(e.key)) {
        if (palabrasecreta.includes(letra)) {
            console.log(letra)
            adicionarLetraCorrecta(palabrasecreta.indexOf(letra))
            for (let i = 0; i < palabrasecreta.length; i++) {
                if (palabrasecreta[i] === letra) {
                    dibujarLetraCorrecta(i);
                }
            }
        } else {
            if (!verificarLetraClicada(e.key)) return
            adicionarLetraIncorrecta(letra)
            dibujarLetraIncorrecta(letra, errores)
        }
    }
    switch (errores) {
        case -1:
            tablero.beginPath();
            tablero.arc(530, 430, 25, 0, 2 * Math.PI, false,); //cabeza    
            tablero.stroke();
            tablero.fillStyle = '#000';

            tablero.fill();
            tablero.closePath();
            break;
        case -2:
            tablero.moveTo(530, 530);
            tablero.lineTo(530, 430); //cuerpo
            tablero.stroke();
            break;
        case -3:
            tablero.moveTo(530, 480);
            tablero.lineTo(480, 500); //brazo izquierdo
            tablero.stroke();
            break;
        case -4:
            tablero.moveTo(530, 480);
            tablero.lineTo(480, 500); //brazo izquierdo
            tablero.stroke();
            break;
        case -5:
            tablero.moveTo(530, 480);
            tablero.lineTo(580, 500); //brazo derecho
            tablero.stroke();
            break;
        case -6:
            tablero.moveTo(530, 530);
            tablero.lineTo(580, 560); //pierna derecha
            tablero.stroke();
            break;
        case -7:
            tablero.moveTo(530, 530);
            tablero.lineTo(480, 560); //pierna izquierda
            tablero.stroke();
            document.write('¡PERDISTE!');
            break;
    }
    console.log(errores)
    console.log(palabrasecreta)
    console.log(letras)
    if (letras === palabrasecreta) {
        document.write('¡GANASTE!');
    }
};

//VARIABLES PALABRA NUEVA
var palabranueva = document.getElementById('#palabra-nueva').value;
var botonagregar = document.getElementById('#boton-agregar');

//AGREGAR PALABRA NUEVA

botonagregar.onclick = function agregarNuevaPalabra() {
    if (document.getElementById('#palabra-nueva').value) {
        palabras.push(palabranueva)
        console.log(palabras)
    }
    else {
        alert('no se permiten caracteres especiales');
    }
    botonagregar.onclick = document.getElementById('#palabra-nueva').value = " ";
};

agregarNuevaPalabra();


