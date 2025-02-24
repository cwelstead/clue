import { User } from "./User.js"

let lobbyIDs = []

const Roles = Object.freeze({
    ADAM: "Adam",
    STEVE: "Dr Cooper",
    BOB: "Bob",
    VAL: "Val",
    FIRESTONE: "Firestone",
    THERESA: "Theresa"
})

export class Lobby {
    constructor(name) {
        this._name = name
        this._id = generateID()
        this._players = new Map()
        this._takenRoles = new Set()
    }


    isFull() {
        return this._players.size >= 6
    }

    isEmpty() {
        return this._players.size === 0
    }

    addPlayer(player) {
        if (player.id !== undefined && !this._players.has(player.id) && this._players.size < 6)  {
            const firstRoleAvailable = Object.values(Roles).filter(role => !this._takenRoles.has(role))[0]
            this._players.set(player.id, {
                username: player.name,
                role: firstRoleAvailable,
                ready: false,
            })
            this._takenRoles.add(firstRoleAvailable)
        } else {
            return false // might need to throw an error
        }
    }
    removePlayer(playerID) {
        if (this._players.has(playerID)) {
            this._takenRoles.delete(this._players.get(playerID).role)
            this._players.delete(playerID)
            return true
        } else {
            return false
        }
    }

    readyPlayer(id) {
        this._players.get(id).ready = !this._players.get(id).ready
    }

    getName() {
        return this._name
    }

    getID() {
        return this._id
    }

    getPlayers() {
        return JSON.stringify(Array.from(this._players))
    }

    getTakenRoles() {
        return this._takenRoles
    }

    deactivateLobby() {
        lobbyIDs = lobbyIDs.filter(lobbyID => lobbyID !== this._id)
    }
}

function generateID() {
    let id = ""
    let idUnique = false
    while (!idUnique) {
        const idNum = Math.floor(Math.random() * 1000000)
        id = ("000000" + idNum).substring(("000000" + idNum).length - 6)

        idUnique = true;
        if (!lobbyIDs.includes(id)) {
            lobbyIDs.push(id)
        } else {
            idUnique = false
        }
    }
    return id
}