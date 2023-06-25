// conexión con el servidor de websockets
var socket = new WebSocket('ws://192.168.1.38:9001');

// evento de conexión con el servidor establecida
socket.onopen = ({ data }) => {
    console.log('Conectado al servidor de websocket.');
    update_votes(data);
};

// evento de mensaje del servidoe recibido
socket.onmessage = ({ data }) => {
    update_votes(data);
};

function update_votes(data) {
    if (data != undefined) {
        var votes = JSON.parse(data);
        switch (votes.type) {
            case "votes":
                for (var teamId in teams) {   
                    var votesElement = document.getElementById('votes_' + teamId);
                    if (votesElement) {
                        if (votes[teamId] != undefined) {
                            votesElement.innerText = votes[teamId];
                        } else { // si es undefined el team no tiene votos
                            votesElement.innerText = 0;
                        }
                    }
                }
                break;
            case "ya_voto":
                alert("Sólo puede votar una vez :c");
                break;
            default:
                console.error("Error jiji")
        }
    }
}

// Función para enviar el voto al servidor a través de websockets
function sendVote() {
    var email = document.getElementById('email').value;
    var selectedTeam = document.querySelector('input[name="equipo"]:checked').value;

    // Crear un objeto con los datos del voto
    var message = {
        type: 'vote',
        email: email,
        team: selectedTeam
    };

    // Enviar el mensaje al servidor a través de websockets
    socket.send(JSON.stringify(message));

    return false;
}