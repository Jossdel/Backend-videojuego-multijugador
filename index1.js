const cors = require("cors");
const express = require("express");

const app = express();

app.use(cors());
app.use(express.json());

class Jugador {
    constructor(id) {
        this.id = id;
    }
    asignarMokepon(mokepon) {
        this.mokepon = mokepon;
    }
    actualizarPosicion(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Mokepon {
    constructor(nombre) {
        this.nombre = nombre;
    }
}

const jugadores = [];

  

// Sirve archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


app.get("/unirse", (req, res) => {
    const id = `${Math.random()}`;
    const jugador = new Jugador(id);
    jugadores.push(jugador);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(id);
});

app.post("/mokepon/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || "";
    const nombre = req.body.mokepon || "";
    const mokepon = new Mokepon(nombre);
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id);
    
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMokepon(mokepon);
    }

    res.end();
});

app.post("/mokepon/:jugadorId/posicion", (req, res) => {
    const jugadorId = req.params.jugadorId || "";
    const x = req.body.x || 0;
    const y = req.body.y || 0;
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id);
    
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x, y);
    }

    res.end();
});

app.listen(5000, () => {
    console.log("El servidor está funcionando");
});
