var palabras = ['HELADERA', 'RELOJ', 'CUADERNO', 'SABANA', 'ESCRITORIO', 'SEMAFORO', 'CELULAR'];
var tablero = document.getElementById('horca').getContext('2d');
var letras = [];
var palabrascorrectas = '';
var errores = 10;

function escogerPalabra() {
    var palabra = palabras [Math.floor(Math.random()*palabras.length)]
    palabraSecreta = palabra
    console.log(palabra)
    return palabraSecreta
};

function dibujarLineas() {
    tablero.lineWidth = 6
    tablero.lineCap = 'round'
    tablero.lineJoin = 'round'
    tablero.strokeStyle = '#0390sw'
    tablero.beginPath()

    var ancho = 600/palabraSecreta.length
    for (let i = 0; i < palabraSecreta.length; i++) {
       tablero.moveTo(500+(ancho*i), 640)
       tablero.lineTo(550+(ancho*i), 640)
    }

    tablero.stroke()
    tablero.closePath()
};

dibujarLineas(escogerPalabra());

function escribirLetraCorrecta(i) {
    tablero.font = 'bold 52px Inter';
    tablero.lineWidth = 6
    tablero.lineCap = 'round'
    tablero.lineJoin = 'round'
    tablero.fillStyle = "#000"

    var ancho = 600/palabraSecreta.length
    tablero.fillText(palabraSecreta[i], 505+(ancho*i), 620)

}

function escribirLetraIncorrecta(letras, errorsLeft) {
    tablero.font = 'bold 30px Inter';
    tablero.lineWidth = 6
    tablero.lineCap = 'round'
    tablero.lineJoin = 'round'
    tablero.fillStyle = "#000"

    tablero.fillText(letras, 535+(40*(10 - errorsLeft)), 710, 40);
}

function verificarLetraClicada(key) {
    if (letras.length<1 || letras.indexOf(key)<0) {
       letras.push(key)
       return false 
    }
    else {
        letras.push(key)
        return true
    }
}

function adicionarLetraCorrecta(i) {
    palabrascorrectas += palabraSecreta[i].toUpperCase()
}

function adicionarLetraIncorrecta(letter) {
    if (palabraSecreta.indexOf(letter)<=0) {
        errores -= 1
    }
}

document.onkeydown = (e) => {
    let letra = e.key.toUpperCase()
    if (!verificarLetraClicada(e.key)) {
        if (palabraSecreta.includes(letra)) {
            console.log(letra)
            adicionarLetraCorrecta(palabraSecreta.indexOf(letra))
            for (let i = 0; i < palabraSecreta.length; i++) {
                if (palabraSecreta[i]===letra) {
                    escribirLetraCorrecta(i);
                }
                
            }
        }else {
            if(!verificarLetraClicada(e.key)) return
            adicionarLetraIncorrecta(letra)
            escribirLetraIncorrecta(letra, errores)
        }
    }
}

