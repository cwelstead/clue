let activeLobbies = []

export class Lobby {
    constructor(name) {
        this._name = name
        this._id = this.generateID()
        this._players = []
        this._playerRoles = {
            adam: "",
            steve: "",
            bob: "",
            val: "",
            firestone: "",
            theresa: "",
        }
        activeLobbies = [...activeLobbies.filter(lobby => lobby.getID !== this._id), this]
    }

    isFull() {
        return this._players.length >= 6
    }

    isEmpty() {
        return this._players.length === 0
    }

    addPlayer(player) {
        if (this._players.length < 6)  {
            this._players = [...this._players, player]

            if (!this._playerRoles.adam) {
                this._playerRoles.adam = player
            } else if (!this._playerRoles.steve) {
                this._playerRoles.steve = player
            } else if (!this._playerRoles.bob) {
                this._playerRoles.bob = player
            } else if (!this._playerRoles.val) {
                this._playerRoles.val = player
            } else if (!this._playerRoles.firestone) {
                this._playerRoles.firestone = player
            } else if (!this._playerRoles.theresa) {
                this._playerRoles.theresa = player
            } else {
                return false // might need to throw an error
            }
            return true
        } else {
            return false // might need to throw an error
        }
    }
    removePlayer(player) { // i have no idea if this will work tbh
        for (let role of Object.keys(this._playerRoles)) {
            if (this._playerRoles.role === player) {
                this._playerRoles.role === ""
            }
        }
        this._players = this._players.filter(remainingPlayers => remainingPlayers !== player)
    }

    getID() {
        return this._id
    }

    getName() {
        return this._name
    }

    deactivateLobby() {
        activeLobbies = activeLobbies.filter(lobby => lobby.getID !== this._id)
    }

    generateID() {
        let id = ""
        let idUnique = false;
        while (!idUnique) {
            const idNum = Math.floor(Math.random() * 1000000)
            id = ("000000" + idNum).substring(("000000" + idNum).length - 6)

            idUnique = true;
            for (let i = 0; i < activeLobbies.length && idUnique; i++) {
                if (id === activeLobbies[i].getID()) {
                    idUnique = false
                }
            }
        }
        return id
    }
}