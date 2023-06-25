import json
import websockets
import asyncio
import psycopg2

# Connect to the PostgreSQL database
conn = psycopg2.connect(
    host = "localhost", 
    port = "5432",
    database = "votes",
    user = "micaeladl",
    password = "root"
)
cursor = conn.cursor()

# Crea la tabla para almacenar los votos si no existe
cursor.execute("CREATE TABLE IF NOT EXISTS votes (email VARCHAR, team_id INTEGER)")

# Carga los votos iniciales desde la base de datos
cursor.execute("SELECT team_id, count(*) AS total_votos FROM votes GROUP BY team_id; ")
#diccionario llamado "votes" utilizando una comprensión de diccionario. "team_id" es clave y "total_votos" es el valor.
votes = {team_id: total_votos for team_id, total_votos in cursor.fetchall()}
votes["type"] = "votes" # se aclara el tipo de mje

cursor.execute("SELECT email FROM votes; ")
emails = [email for email in cursor.fetchall()]

CONNECTIONS = set()
# conexión establecida con el cliente
async def new_client(websocket):
    print("Client conectado.")
    global CONNECTIONS
    CONNECTIONS.add(websocket)
    
    # Envía los votos al cliente
    votes_mje = json.dumps(votes)
    await websocket.send(votes_mje)

    while True:
        data = await websocket.recv()
        data = json.loads(data)
        if data["type"] == "vote":
            email = data["email"]
            team_id = data["team"]
            if (email,) not in emails:
                # Inserta el voto en la base de datos
                cursor.execute("INSERT INTO votes (email, team_id) VALUES (%s, %s)", (email, team_id))
                conn.commit()

                # Almacena el voto en el diccionario
                if int(team_id) in votes.keys(): #si ya está el team en el dict...
                    votes[int(team_id)] += 1 
                else: # si no crea el par key: val
                    votes[int(team_id)] = 1
                
                # se almacena el voto en la list
                emails.append((email,))

                # Envía los votos actualizados a todos los clientes
                votes_mje = json.dumps(votes)
                websockets.broadcast(CONNECTIONS, votes_mje)

            else:
                # Envía un mensaje de error al cliente si el email ya ha votado
                await websocket.send(json.dumps({"type": "ya_voto"}))

# Inicializa el servidor de websockets

async def main():
    async with websockets.serve(new_client, "0.0.0.0", 9001):
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())