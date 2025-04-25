import { Lobby, Roles, lobbyIDs } from "../classes/Lobby"

test('Lobby should be empty upon creation', () => {
    const testLobby = new Lobby("test")
    expect(testLobby.isEmpty()).toBe(true)

    testLobby.deactivateLobby()
})

test('Lobby should be full with 6 or greater players', () => {
    const testLobby = new Lobby("test")
    testLobby.addPlayer({name: 'player1', id: '01'})
    testLobby.addPlayer({name: 'player2', id: '02'})
    testLobby.addPlayer({name: 'player3', id: '03'})
    testLobby.addPlayer({name: 'player4', id: '04'})
    testLobby.addPlayer({name: 'player5', id: '05'})
    testLobby.addPlayer({name: 'player6', id: '06'})

    expect(testLobby.isFull()).toBe(true)

    testLobby.deactivateLobby()
})

test('Lobby should be include all 6 players when full', () => {
    const testLobby = new Lobby("test")
    testLobby.addPlayer({name: 'player1', id: '01'})
    testLobby.addPlayer({name: 'player2', id: '02'})
    testLobby.addPlayer({name: 'player3', id: '03'})
    testLobby.addPlayer({name: 'player4', id: '04'})
    testLobby.addPlayer({name: 'player5', id: '05'})
    testLobby.addPlayer({name: 'player6', id: '06'})

    expect(testLobby.getPlayer('06')).not.toBeUndefined()
    
    testLobby.deactivateLobby()
})

test('Lobby should stop adding players after 6 are added', () => {
    const testLobby = new Lobby("test")
    testLobby.addPlayer({name: 'player1', id: '01'})
    testLobby.addPlayer({name: 'player2', id: '02'})
    testLobby.addPlayer({name: 'player3', id: '03'})
    testLobby.addPlayer({name: 'player4', id: '04'})
    testLobby.addPlayer({name: 'player5', id: '05'})
    testLobby.addPlayer({name: 'player6', id: '06'})
    testLobby.addPlayer({name: 'player7', id: '07'})

    expect(testLobby.getPlayer('07')).toBeUndefined()
    
    testLobby.deactivateLobby()
})

test('Lobby should remain unchanged if the same player is added twice', () => {
    const testLobby = new Lobby("test")
    const player = {name: 'samePlayer', id: '01'}

    testLobby.addPlayer(player)
    const expectedPlayers = testLobby.getPlayers()
    testLobby.addPlayer(player)

    expect(testLobby.getPlayers()).toEqual(expectedPlayers)
    
    testLobby.deactivateLobby()
})

test('Player addition should fail gracefully when parameters are incorrect', () => {
    const testLobby = new Lobby("test")

    expect(testLobby.addPlayer("blblblblblbl")).toBeFalsy()
    
    testLobby.deactivateLobby()
})

test('Player addition should fail gracefully when parameters are undefined', () => {
    const testLobby = new Lobby("test")

    expect(testLobby.addPlayer(undefined)).toBeFalsy()
    expect(testLobby.addPlayer({id: undefined, name: undefined})).toBeFalsy()
    
    testLobby.deactivateLobby()
})

test('Player addition should fail gracefully when parameters are incorrect', () => {
    const testLobby = new Lobby("test")

    expect(testLobby.addPlayer(null)).toBeFalsy()
    expect(testLobby.addPlayer({id: null, name: null})).toBeFalsy()
    
    testLobby.deactivateLobby()
})

test('Player removal should update lobby size', () => {
    const testLobby = new Lobby("test")
    testLobby.addPlayer({name: 'player1', id: '01'})
    testLobby.addPlayer({name: 'player2', id: '02'})
    testLobby.addPlayer({name: 'player3', id: '03'})
    testLobby.addPlayer({name: 'player4', id: '04'})
    testLobby.addPlayer({name: 'player5', id: '05'})
    testLobby.addPlayer({name: 'player6', id: '06'})
    
    testLobby.removePlayer('01')
    testLobby.removePlayer('02')
    testLobby.removePlayer('03')
    testLobby.removePlayer('04')
    testLobby.removePlayer('05')
    testLobby.removePlayer('06')

    expect(testLobby.isEmpty()).toBeTruthy()
    
    testLobby.deactivateLobby()
})

test('Player removal should fail gracefully with bad parameters', () => {
    const testLobby = new Lobby("test")
    testLobby.addPlayer({name: 'player1', id: '01'})

    expect(testLobby.removePlayer(null)).toBeFalsy()
    expect(testLobby.removePlayer(undefined)).toBeFalsy()
    expect(testLobby.removePlayer("blblblblbl")).toBeFalsy()
    
    testLobby.deactivateLobby()
})

test('An empty lobby should not be ready to start', () => {
    const testLobby = new Lobby("test")

    expect(testLobby.readyToStart()).toBeFalsy()
    
    testLobby.deactivateLobby()
})

test('A lobby with the required # of players should not be ready to start', () => {
    const testLobby = new Lobby("test")
    testLobby.addPlayer({name: 'player1', id: '01'})
    testLobby.addPlayer({name: 'player2', id: '02'})
    testLobby.addPlayer({name: 'player3', id: '03'})

    expect(testLobby.readyToStart()).toBeFalsy()
    
    testLobby.deactivateLobby()
})

// NOTE: The following tests are dependent on the required # of players being 3
// This number may be 1 during development for convenience but should be changed before deployment
test('A lobby with all players ready but not enough should not be ready to start', () => {
    const testLobby = new Lobby("test")
    testLobby.addPlayer({name: 'player1', id: '01'})
    testLobby.addPlayer({name: 'player2', id: '02'})

    testLobby.readyPlayer('01')
    testLobby.readyPlayer('02')

    expect(testLobby.readyToStart()).toBeFalsy()
    
    testLobby.deactivateLobby()
})

test('A lobby with some players ready should not be ready to start', () => {
    const testLobby = new Lobby("test")
    testLobby.addPlayer({name: 'player1', id: '01'})
    testLobby.addPlayer({name: 'player2', id: '02'})
    testLobby.addPlayer({name: 'player3', id: '03'})

    testLobby.readyPlayer('01')
    testLobby.readyPlayer('02')

    expect(testLobby.readyToStart()).toBeFalsy()
    
    testLobby.deactivateLobby()
})

test('A lobby with all players ready shouldbe ready to start', () => {
    const testLobby = new Lobby("test")
    testLobby.addPlayer({name: 'player1', id: '01'})
    testLobby.addPlayer({name: 'player2', id: '02'})
    testLobby.addPlayer({name: 'player3', id: '03'})

    testLobby.readyPlayer('01')
    testLobby.readyPlayer('02')
    testLobby.readyPlayer('03')
    
    expect(testLobby.readyToStart()).toBeTruthy()
    
    testLobby.deactivateLobby()
})

test('A player automatically is assigned a role after joining', () => {
    const testLobby = new Lobby("test")
    testLobby.addPlayer({name: 'player1', id: '01'})

    expect(testLobby.getPlayer('01').role).toEqual('Adam')
    
    testLobby.deactivateLobby()
})

test('A player cannot switch roles with themself', () => {
    const testLobby = new Lobby("test")
    testLobby.addPlayer({name: 'player1', id: '01'})

    expect(testLobby.switchRole('01', Roles.ADAM)).toBeFalsy()
    
    testLobby.deactivateLobby()
})

test('A player cannot switch to a role that does not exist', () => {
    const testLobby = new Lobby("test")
    testLobby.addPlayer({name: 'player1', id: '01'})

    expect(testLobby.switchRole('01', undefined)).toBeFalsy()
    expect(testLobby.switchRole('01', null)).toBeFalsy()
    expect(testLobby.switchRole('01', 'blblblblblbl')).toBeFalsy()
    
    testLobby.deactivateLobby()
})

test('A player cannot switch to a role that is held by another player', () => {
    const testLobby = new Lobby("test")
    testLobby.addPlayer({name: 'player1', id: '01'})
    testLobby.addPlayer({name: 'player1', id: '02'})

    testLobby.switchRole('02', Roles.FIRESTONE)
    expect(testLobby.switchRole('01', Roles.FIRESTONE)).toBeFalsy()
    
    testLobby.deactivateLobby()
})

test('Role switching happy path', () => {
    const testLobby = new Lobby("test")
    testLobby.addPlayer({name: 'player1', id: '01'})

    expect(testLobby.switchRole('01', Roles.VAL)).toBeTruthy()
    
    testLobby.deactivateLobby()
})

test('takenRoles is automatically updated upon joining a lobby', () => {
    const testLobby = new Lobby("test")
    testLobby.addPlayer({name: 'player1', id: '01'})

    const playerRole = testLobby.getPlayer('01').role
    const takenRoles = new Set(JSON.parse(testLobby.getTakenRoles()))

    expect(takenRoles).toContain(playerRole)
    
    testLobby.deactivateLobby()
})

test('Role switching automatically removes the old role from takenRoles', () => {
    const testLobby = new Lobby("test")
    testLobby.addPlayer({name: 'player1', id: '01'})

    const oldRole = testLobby.getPlayer('01').role

    testLobby.switchRole('01', Roles.STEVE)
    const takenRoles = new Set(JSON.parse(testLobby.getTakenRoles()))

    expect(takenRoles).not.toContain(oldRole)
    
    testLobby.deactivateLobby()
})

// Creates half of all available lobbies
test('Lobby ID generation stress test', () => {
    for (let i = 0; i < 50000; i++) {
        const newLobby = new Lobby("test")
    }

    const lobbySet = new Set(lobbyIDs)

    expect(lobbyIDs).toHaveLength(50000)
    expect(lobbySet.size).toEqual(50000)
})