import { GameState, startingPositions } from "../classes/GameState"
import { Lobby } from "../classes/Lobby"

const testLobby = new Lobby("test")
testLobby.addPlayer({name: 'player1', id: '01'})
testLobby.addPlayer({name: 'player2', id: '02'})
testLobby.addPlayer({name: 'player3', id: '03'})
testLobby.addPlayer({name: 'player4', id: '04'})
testLobby.addPlayer({name: 'player5', id: '05'})
testLobby.addPlayer({name: 'player6', id: '06'})

test('GameState puts players in the correct starting positions upon initialization', () => {
    const testGameState = new GameState(testLobby)

    const playerPositions = Object.fromEntries(JSON.parse(testGameState.getPlayerPositions()))

    expect(playerPositions).toMatchObject(startingPositions)
})

test('GameState does not have a current player upon initialization', () => {
    const testGameState = new GameState(testLobby)

    expect(testGameState.getCurrentPlayer()).toBeUndefined()
})

test('getCurrentPlayer happy path', () => {
    const testGameState = new GameState(testLobby)
    
    testGameState.nextTurn() // advances to turn 0
    testGameState.nextTurn() // advances to turn 1

    expect(testGameState.getCurrentPlayer()).toEqual(testGameState._turnOrder[1])
})

test('getCurrentPlayerRole happy path (controlled input creates lack of edge cases)', () => {
    const testGameState = new GameState(testLobby)
    
    testGameState.nextTurn() // advances to turn 0
    testGameState.nextTurn() // advances to turn 1

    const expectedRole = testGameState._players.get(testGameState.getCurrentPlayer()).role

    expect(testGameState.getCurrentPlayerRole()).toEqual(expectedRole)
})

test('nextTurn does not put turnIdx outside the range of the # of players', () => {
    const testGameState = new GameState(testLobby)
    
    testGameState.nextTurn() // advances to turn 0
    testGameState.nextTurn() // advances to turn 1
    testGameState.nextTurn() // advances to turn 2
    testGameState.nextTurn() // advances to turn 3
    testGameState.nextTurn() // advances to turn 4
    testGameState.nextTurn() // advances to turn 5
    testGameState.nextTurn() // SHOULD advance to turn 0

    expect(testGameState._turnIdx).toEqual(0)
})

test('nextTurn sets spacesToMove to -1', () => {
    const testGameState = new GameState(testLobby)
    
    testGameState.setSpacesToMove(5)
    testGameState.nextTurn()

    expect(testGameState.getSpacesToMove()).toEqual(-1)
})

// Moving one player to a cell
const movementLobby = new Lobby('test')
movementLobby.addPlayer({name: 'player1', id: '01'})
const player = movementLobby.getPlayer('01')

test('movePlayerToCell blocks a player from moving to anything but an adjacent cell', () => {
    const movementGameState = new GameState(movementLobby)
    movementGameState.setSpacesToMove(10)

    movementGameState._playerPositions.set('Adam', {x: 6, y: 8, place: ""})
    const expectedPosition = movementGameState._playerPositions.get('Adam')

    movementGameState.movePlayerToCell(player, 5, 7)
    movementGameState.movePlayerToCell(player, 5, 9)
    movementGameState.movePlayerToCell(player, 7, 7)
    movementGameState.movePlayerToCell(player, 7, 9)

    expect(movementGameState._playerPositions.get('Adam')).toEqual(expectedPosition)
})

test('movePlayerToCell blocks a player from moving to an invalid spot on the map', () => {
    const movementGameState = new GameState(movementLobby)
    movementGameState.setSpacesToMove(10)

    movementGameState._playerPositions.set('Adam', {x: 9, y: 0, place: ""})
    const expectedPosition = movementGameState._playerPositions.get('Adam')

    movementGameState.movePlayerToCell(player, 8, 0)
    movementGameState.movePlayerToCell(player, 10, 0)

    expect(movementGameState._playerPositions.get('Adam')).toEqual(expectedPosition)
})

test('movePlayerToCell blocks a player from moving when in an invalid location', () => {
    const movementGameState = new GameState(movementLobby)
    movementGameState.setSpacesToMove(10)

    movementGameState._playerPositions.set('Adam', {x: -1, y: -1, place: ""})
    const expectedPosition = movementGameState._playerPositions.get('Adam')

    movementGameState.movePlayerToCell(player, 5, 7)

    expect(movementGameState._playerPositions.get('Adam')).toEqual(expectedPosition)
})

test('movePlayerToCell blocks a player from moving from a place to an invalid exit', () => {
    const movementGameState = new GameState(movementLobby)
    movementGameState.setSpacesToMove(10)

    movementGameState._playerPositions.set('Adam', {x: -1, y: -1, place: "Great Hall"})
    const expectedPosition = movementGameState._playerPositions.get('Adam')

    movementGameState.movePlayerToCell(player, 7, 6)
    movementGameState.movePlayerToCell(player, 5, 7)
    movementGameState.movePlayerToCell(player, 10, 8)
    movementGameState.movePlayerToCell(player, 0, -1)

    expect(movementGameState._playerPositions.get('Adam')).toEqual(expectedPosition)
})

test('movePlayerToCell returns false whenever a movement fails', () => {
    const movementGameState = new GameState(movementLobby)
    movementGameState.setSpacesToMove(10)

    movementGameState._playerPositions.set('Adam', {x: 6, y: 8, place: ""})

    expect(movementGameState.movePlayerToCell(player, 5, 7)).toBeFalsy()
})

test('movePlayerToCell allows a player to leave a place via an exit', () => {
    const movementGameState = new GameState(movementLobby)
    movementGameState.setSpacesToMove(10)

    movementGameState._playerPositions.set('Adam', {x: -1, y: -1, place: "Great Hall"})
    const expectedPosition = {x: 7, y: 5, place: ""}

    movementGameState.movePlayerToCell(player, 7, 5)

    expect(movementGameState._playerPositions.get('Adam')).toEqual(expectedPosition)
})

test('movePlayerToCell blocks a move when spacesToMove is 0 or less', () => {
    const movementGameState = new GameState(movementLobby)
    movementGameState.setSpacesToMove(0)

    movementGameState._playerPositions.set('Adam', {x: -1, y: -1, place: "Great Hall"})
    const expectedPosition = {x: -1, y: -1, place: "Great Hall"}

    movementGameState.movePlayerToCell(player, 7, 5)

    expect(movementGameState._playerPositions.get('Adam')).toEqual(expectedPosition)
})

test('movePlayerCell happy path', () => {
    const movementGameState = new GameState(movementLobby)
    movementGameState.setSpacesToMove(10)

    movementGameState._playerPositions.set('Adam', {x: 7, y: 5, place: ""})
    const expectedPosition = {x: 6, y: 5, place: ""}

    movementGameState.movePlayerToCell(player, 6, 5)

    expect(movementGameState._playerPositions.get('Adam')).toEqual(expectedPosition)
})

test('movePlayerCell returns true on movement success', () => {
    const movementGameState = new GameState(movementLobby)
    movementGameState.setSpacesToMove(10)

    movementGameState._playerPositions.set('Adam', {x: 7, y: 5, place: ""})

    expect(movementGameState.movePlayerToCell(player, 6, 5)).toBeTruthy()
})

// Moving one player to a place
test('movePlayerToPlace correctly updates place', () => {
    const movementGameState = new GameState(movementLobby)
    movementGameState.setSpacesToMove(10)

    movementGameState._playerPositions.set('Adam', {x: 7, y: 5, place: ""})
    const expectedPosition = {x: -1, y: -1, place: "Great Hall"}

    movementGameState.movePlayerToPlace(player, 'Great Hall')

    expect(movementGameState._playerPositions.get('Adam')).toEqual(expectedPosition)
})

test('movePlayerToPlace blocks move when spacesToMove is 0 or less', () => {
    const movementGameState = new GameState(movementLobby)
    movementGameState.setSpacesToMove(0)

    movementGameState._playerPositions.set('Adam', {x: 7, y: 5, place: ""})
    const expectedPosition = {x: 7, y: 5, place: ""}

    movementGameState.movePlayerToPlace(player, 'Great Hall')

    expect(movementGameState._playerPositions.get('Adam')).toEqual(expectedPosition)
})

test('movePlayerToPlace returns true on successful move', () => {
    const movementGameState = new GameState(movementLobby)
    movementGameState.setSpacesToMove(10)

    movementGameState._playerPositions.set('Adam', {x: 7, y: 5, place: ""})

    expect(movementGameState.movePlayerToPlace(player, 'Great Hall')).toBeTruthy()
})

test('movePlayerToPlace returns false on unsuccessful move', () => {
    const movementGameState = new GameState(movementLobby)
    movementGameState.setSpacesToMove(10)

    movementGameState._playerPositions.set('Adam', {x: 7, y: 5, place: ""})

    expect(movementGameState.movePlayerToPlace(player, '112')).toBeFalsy()
})

test('movePlayerToPlace handles invalid place gracefully', () => {
    const movementGameState = new GameState(movementLobby)
    movementGameState.setSpacesToMove(10)

    movementGameState._playerPositions.set('Adam', {x: 7, y: 5, place: ""})

    expect(movementGameState.movePlayerToPlace(player, 'blblblblb')).toBeFalsy()
})

// Testing interactions between moving different players in the same game
movementLobby.addPlayer({name: 'player2', id: '02'})

test('movePlayerCell blocks movement from cell when another player occupies the space', () => {
    const movementGameState = new GameState(movementLobby)
    movementGameState.setSpacesToMove(10)

    movementGameState._playerPositions.set('Adam', {x: 7, y: 5, place: ""})
    movementGameState._playerPositions.set('Dr Cooper', {x: 6, y: 5, place: ""})
    const expectedPosition = {x: 7, y: 5, place: ""}

    movementGameState.movePlayerToCell(player, 6, 5)

    expect(movementGameState._playerPositions.get('Adam')).toEqual(expectedPosition)
})

test('movePlayerCell blocks movement from place when another player occupies the space', () => {
    const movementGameState = new GameState(movementLobby)
    movementGameState.setSpacesToMove(10)

    movementGameState._playerPositions.set('Adam', {x: -1, y: -1, place: "Great Hall"})
    movementGameState._playerPositions.set('Dr Cooper', {x: 7, y: 5, place: ""})
    const expectedPosition = {x: -1, y: -1, place: "Great Hall"}

    movementGameState.movePlayerToCell(player, 7, 5)

    expect(movementGameState._playerPositions.get('Adam')).toEqual(expectedPosition)
})