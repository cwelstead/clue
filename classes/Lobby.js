export class Lobby {
    constructor(name) {
        self._name = name
        self._id = generateID()
        self._players = []
        self._playerRoles = {
            adam: "",
            steve: "",
            bob: "",
            val: "",
            firestone: "",
            theresa: "",
        }
    }

    isFull() {
        return self._players.length >= 6
    }

    addPlayer(player) {
        if (self._players.length < 6)  {
            self._players = [...self._players, player]

            if (!self._playerRoles.adam) {
                self._playerRoles.adam = player
            } else if (!self._playerRoles.steve) {
                self._playerRoles.steve = player
            } else if (!self._playerRoles.bob) {
                self._playerRoles.bob = player
            } else if (!self._playerRoles.val) {
                self._playerRoles.val = player
            } else if (!self._playerRoles.firestone) {
                self._playerRoles.firestone = player
            } else if (!self._playerRoles.theresa) {
                self._playerRoles.theresa = player
            } else {
                return false // might need to throw an error
            }
            return true
        } else {
            return false // might need to throw an error
        }
    }

    getID() {
        return _id
    }

    generateID() {
        let idUnique = false;
        while (!idUnique) {
            const idNum = Math.floor(Math.random() * 1000000)
            const id = ("000000" + idNum).substring(("000000" + idNum).length - 6)

            idUnique = true;
            for (let i = 0; i < activeLobbies.length() && idUnique; i++) {
                if (id === activeLobbies[i].getID()) {
                    idUnique = false
                }
            }
        }
    }
}