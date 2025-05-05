import Board from "./Board.js"
import { CARDS, getCaseFile } from "./Cards.js"

export const startingPositions = {
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
        this._lobbyID = lobby.getID()
        this._players = new Map(JSON.parse(lobby.getPlayers()))
        this._piecePositions = {} // we don't even have to keep pieces on the board if we don't want to
        this._turnOrder = this.determineTurnOrder(this._players) // random for now
        this._suggestOrder = this._turnOrder // Order of suggestion for players who have been removed from the game
        this._caseFile = getCaseFile()

        // Sent to the players as updates
        this._playerPositions = new Map(Object.entries(startingPositions))
        this._playerCards = this.distributeCards()
        this._spacesToMove = -1
        this._turnIdx = -1 // in the form of getCurrentPlayer()
    }

    getCurrentPlayer() {
        if (this._turnIdx < 0)
            return undefined
        else
            return this._turnOrder[this._turnIdx]
    }

    getCurrentPlayerRole() {
        const player = this._players.get(this.getCurrentPlayer())
        if (player) {
            return player.role
        } else {
            return ""
        }
    }

    // Removes the current player from the turn order.
    // They can still prove others wrong, but they cannot move or suggest.
    removeCurrentPlayer() {
        const playerID = this.getCurrentPlayer()

        this._turnOrder = this._turnOrder.filter(id => id != playerID)
        this._turnIdx -= 1
    }

    // Increments the turn counter and returns whose turn is up next.
    nextTurn() {
        this._turnIdx = (this._turnIdx + 1) % this._turnOrder.length
        this._spacesToMove = -1
    }

    getSpacesToMove() {
        return this._spacesToMove
    }

    setSpacesToMove(number) {
        this._spacesToMove = number
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
            if (Board.BOARD[destY][destX] === 0) return false

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
                        this._spacesToMove = 0
                        moveSuccessful = true
                    }
                })
            }
        })

        return moveSuccessful
    }

    // Function to manage movement that doesn't follow the valid movement structure
    // e.g. moving between passageways and suggestion-based movement
    forceRoleToPlace(role, destPlace) {
        if (destPlace) {
            this._playerPositions.set(role, {x: -1, y: -1, place: destPlace})
            // if using a secret passageway, player can still make a suggestion
            this.setSpacesToMove(0)

            return true
        } else {
            return false
        }
    }

    getSuggestionProof(guess) {
        let playerToProveWrong = undefined

        // Iterate through turn order in reverse
        // If a player has a card that can prove the guess wrong, update the variable
        // At the end of iteration, the earliest player in turn order will be the variable
        // Otherwise, it remains undefined
        let i = (this._turnIdx + this._suggestOrder.length - 1) % this._suggestOrder.length
        while (i != this._turnIdx) {
            const playerCards = this._playerCards.get(this._suggestOrder[i])

            if (playerCards.some(card => card.id == guess.room.id
                                        || card.id == guess.suspect.id
                                        || card.id == guess.weapon.id)) {
                playerToProveWrong = this._players.get(this._suggestOrder[i])
            }

            i = (i + this._suggestOrder.length - 1) % this._suggestOrder.length
        }

        return playerToProveWrong
    }

    getPlayerPositions() {
        return JSON.stringify(Array.from(this._playerPositions))
    }

    getPlayerCards() {
        return JSON.stringify(Array.from(this._playerCards))
    }

    determineTurnOrder(players) {
        let playerIDs = Array.from(players.keys())
        let turnOrder = []
        
        while (playerIDs.length > 0) {
            turnOrder.push(playerIDs.splice(Math.floor(Math.random() * playerIDs.length), 1)[0])
        }

        return turnOrder
    }

    checkAccusation(guess) {
        return guess.suspect.id == this._caseFile.suspect.id
            && guess.weapon.id == this._caseFile.weapon.id
            && guess.room.id == this._caseFile.room.id
    }

    distributeCards() {
        // Set up cards without case file cards and shuffle their order
        let remainingCards = [...CARDS]

        Object.values(this._caseFile).forEach(caseCard => {
            remainingCards = remainingCards.filter(card => JSON.stringify(card) != JSON.stringify(caseCard))
        })

        for (let i = remainingCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [remainingCards[i], remainingCards[j]] = [remainingCards[j], remainingCards[i]];
        }

        // Set up the map of player-owned cards
        const playerCards = new Map()
        this._players.keys().forEach(player => {
            playerCards.set(player, [])
        })

        // Distribute cards until there are none left, starting with the last player and going against turn order
        let i = this._turnOrder.length - 1
        while (remainingCards.length > 0) {
            playerCards.get(this._turnOrder[i]).push(remainingCards.pop())
            i = (i + this._turnOrder.length - 1) % this._turnOrder.length
        }

        return playerCards
    }
}