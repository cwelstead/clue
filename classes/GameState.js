import Board from "./Board.js"

const startingPositions = {
    ADAM: {x: 7, y: 24, place: ""},
    STEVE: {x: 14, y: 0, place: ""},
    BOB: {x: 23, y: 19, place: ""},
    VAL: {x: 23, y: 6, place: ""},
    FIRESTONE: {x: 0, y: 17, place: ""},
    THERESA: {x: 9, y: 0, place: ""}
}

export class GameState {
    constructor(lobby) {
        this._lobby = lobby
        this._playerPositions = new Map(Object.entries(startingPositions))
        this._piecePositions = {} // we don't even have to keep pieces on the board if we don't want to
        this._playerCards = new Map()
    }

    movePlayerToCell(player, destX, destY) {
        playerPosition = this._playerPositions.get(player.role)
        currX = playerPosition.x
        currY = playerPosition.y
        currPlace = playerPosition.place

        if (currX >= 0 && currY >= 0) {
            if (Math.abs(playerPosition.x - destX) + Math.abs(playerPosition.y - destY) <= 1) {
                this._playerPositions.set(player.role, {x: destX, y: destY, place: ""})
            }
        } else if (currPlace) {
            Board.PLACES.forEach(place => {
                if (currPlace == place.key) {
                    place.adjacentSpaces.forEach(exit => {
                        if (exit.x == destX && exit.y == destY) {
                            this._playerPositions.set(player.role, {x: destX, y: destY, place: ""})
                        }
                    })
                }
            })
        } else {
            console.warn("Player didn't have a valid position, nor was it in a place. Might be in limbo?")
        }
    }

    movePlayerToPlace(player, destPlace) {
        playerPosition = this._playerPositions.get(player.role)

        Board.PLACES.forEach(place => {
            if (destPlace == place.key) {
                place.adjacentSpaces.forEach(exit => {
                    if (exit.x == playerPosition.x && exit.y == playerPosition.y) {
                        setPlayerPosition({x: -1, y: -1, place: destPlace})
                    }
                })
            }
        })
    }

    getPlayerPositions() {
        return JSON.stringify(Array.from(this._playerPositions))
    }
}