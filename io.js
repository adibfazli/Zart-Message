const jwt = require('jsonwebtoken')

let io;

module.exports = {
    init,
}


function init(http) {
    io = require('socket.io')(http);
    // Listen for new connections from clients (socket)
    io.on('connection', function (socket) {
        
        console.log('connected to io');

        socket.on('click-submit', async function(content) {
            console.log(content)
            socket.join(content, function() {
                io.to(content).emit("click-submit", content);
            });
        })

    });
}

function getIo() {
    return io;
}
  
function validateToken(token) {
    return new Promise(function(resolve) {
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) resolve(false);
        resolve(decoded.user);
        });
    });
}