const express = require("express")
const http = require("http")
const cors = require("cors")
const socketio = require("socket.io")
const app = express()
const server = http.createServer(app)
const io = new socketio.Server(server, {
    cors: {
        origin: '*'
    }
});

const messages = []

server.listen(81)
app.use(cors({
    origin: '*'
}))

app.get("/", (req, res) => {
    res.send("SimpleChat API Endpoint!")
})

app.get("/messages", (req,res) => res.send(messages))

io.on("connection", (socket) => {
    console.log(socket.id + " has connected!");

    socket.on("disconnect", () => {
        console.log(socket.id + " has disconnected!")
    })

    socket.on("send", (message) => {
        messages.push(message)
        io.emit("message", message)
    })
})