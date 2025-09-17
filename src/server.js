// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // en producción limita al dominio de tu frontend
  }
});

// Aquí almacenamos los registros en memoria (array simple)
const registros = {};
let sesionId = 0;

// Cuando un cliente se conecta
io.on("connection", (socket) => {
  console.log("Un cliente se conectó:", socket.id);

  // Recibe un punto desde un cliente
  socket.on("nuevo_punto", (data, callback) => {
    console.log("Recibida data:", data);

    if (!data.sesion) {
      console.warn("Error: sesión nula");
      callback?.({ ok: false, error: "La sesión no puede ser null" });
      return;
    };

    const { sesion, punto } = data;
    if (!registros[sesion]) registros[sesion] = [];

    const id = registros[sesion].length + 1;
    const record = { id, timestamp: new Date(), ...data };

    registros[sesion].push(record);
    console.log(`Punto añadido en sesión ${sesion}:`, record);

    // Reenvía a todos los demás clientes
    socket.broadcast.emit("punto_actualizado", data);
  });

  // Devolver todos los puntos de una sesión
  socket.on("obtener_puntos", (idSesion, callback) => {
    if(!registros.hasOwnProperty(idSesion)){
      console.warn(`Cliente pide puntos de sesión: ${idSesion} pero la sesión no existe`);
      callback?.(`No existe la sesión con el ${idSesion}`);
      return;
    }
    console.log(`Cliente pide puntos de sesión: ${idSesion}. Se devolverán ${registros[idSesion].length}`);
    // socket.emit("lista_puntos", registros[sesion] || []);
    callback?.(null, registros[idSesion] || []);
  });

  // Crear sesion
  socket.on("new_sesion", (callback) => {
    const idSesion = ++sesionId;
    try {
      registros[idSesion] = [];
      console.log(`Cliente pide crear sesión. Sesión creada: ${idSesion}`);
      callback(null, idSesion);
    } catch (error) {
      callback(error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

// Servidor escucha en el puerto 3000 por defecto
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor WebSocket escuchando en puerto ${PORT}`);
});