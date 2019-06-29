const app = require('express')();

const http = require('http').createServer(app);

const io = require('socket.io')(http);

io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("SEND_DATA_TO_SERVER", (data) => {
        io.sockets.emit("SEND_DATA_TO_CLIENT", data);
    });


    socket.on("disconnect", () => {
        console.log("a user disconnected")
    });

});


const port = process.env.PORT || 5000;

http.listen(port, () => console.log(`Server listening on port ${port}`));