import Board from "./Board.js"

const startingPositions = {
    "Adam": {x: 7, y: 24, place: ""},
    "Dr Cooper": {x: 14, y: 0, place: ""},
    "Bob": {x: 23, y: 19, place: ""},
    "Val": {x: 23, y: 6, place: ""},
    "Firestone": {x: 0, y: 17, place: ""},
    "Theresa": {x: 9, y: 0, place: ""}
}

export class GameState {
    constructor(lobby) {
        // Used by the backend
        this._lobby = lobby
        this._piecePositions = {} // we don't even have to keep pieces on the board if we don't want to
        this._turnOrder = this.determineTurnOrder(lobby.getPlayers()) // random for now

        // Sent to the players as updates
        this._playerPositions = new Map(Object.entries(startingPositions))
        this._playerCards = new Map()
        this._spacesToMove = -1
        this._turnIdx = -1 // in the form of getCurrentPlayer()
    }

    getCurrentPlayer() {
        return this._turnOrder[this._turnIdx]
    }

    // Increments the turn counter and returns whose turn is up next.
    nextTurn() {
        this._turnIdx = (this._turnIdx + 1) % this._turnOrder.length

        // TEMPORARY: Set spacesToMove to 3, placeholder for rolling
        this._spacesToMove = 3

        console.log("Next player!")
    }

    getSpacesToMove() {
        return this._spacesToMove
    }

    spaceMoved() {
        this._spacesToMove -= 1
        return this._spacesToMove
    }

    movePlayerToCell(player, destX, destY) {
        if (this._spacesToMove <= 0) return false

        let moveSuccessful = false
        const playerPosition = this._playerPositions.get(player.role)
        const currX = playerPosition.x
        const currY = playerPosition.y
        const currPlace = playerPosition.place

        if (currX >= 0 && currY >= 0) {
            if (Math.abs(playerPosition.x - destX) + Math.abs(playerPosition.y - destY) <= 1) {
                let destOccupied = false
                this._playerPositions.forEach((position) => {
                    if (position.x == destX && position.y == destY) {
                        destOccupied = true
                    }
                })
                if (!destOccupied) {
                    this._playerPositions.set(player.role, {x: destX, y: destY, place: ""})
                    moveSuccessful = true
                }
            }
        } else if (currPlace) {
            Board.PLACES.forEach(place => {
                if (currPlace == place.key) {
                    place.adjacentSpaces.forEach(exit => {
                        if (exit.x == destX && exit.y == destY) {
                            let destOccupied = false
                            this._playerPositions.forEach((position) => {
                                if (position.x == destX && position.y == destY) {
                                    destOccupied = true
                                }
                            })
                            if (!destOccupied) {
                                this._playerPositions.set(player.role, {x: destX, y: destY, place: ""})
                                moveSuccessful = true
                            }
                        }
                    })
                }
            })
        } else {
            console.warn("Player didn't have a valid position, nor was it in a place. Might be in limbo?")
        }

        return moveSuccessful
    }

    movePlayerToPlace(player, destPlace) {
        if (this._spacesToMove <= 0) return false

        let moveSuccessful = false
        const playerPosition = this._playerPositions.get(player.role)

        Board.PLACES.forEach(place => {
            if (destPlace == place.key) {
                place.adjacentSpaces.forEach(exit => {
                    if (exit.x == playerPosition.x && exit.y == playerPosition.y) {
                        this._playerPositions.set(player.role, {x: -1, y: -1, place: destPlace})
                        moveSuccessful = true
                    }
                })
            }
        })

        return moveSuccessful
    }

    getPlayerPositions() {
        return JSON.stringify(Array.from(this._playerPositions))
    }

    determineTurnOrder(players) {
        // may not work as intended, but doesn't break so not a concern rn
        let playerIDs = JSON.parse(players).map(row => row[0])
        let turnOrder = []
        
        while (playerIDs.length > 0) {
            console.log(`Shuffling turn order... ${playerIDs.length} roles left`)
            turnOrder.push(playerIDs.splice(Math.floor(Math.random() * playerIDs.length), 1))
        }

        return turnOrder
    }
}