const express = require ("express")

class Jugador {
constructor(id){
   this.id = id;
}
}

const app = express();

const jugadores = []; 

app.get("/unirse", (req, res)=>{
const id = `${Math.random()}`;

const jugador = new Jugador (id)

jugadores.push(jugador);

    res.send(id)
})

app.listen(5000 , ()=>{
    console.log("el servidor esta funcionando")
});
