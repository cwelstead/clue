import { Lobby } from "../classes/Lobby"

const testLobby = new Lobby()

test('example test', () => {
    expect(testLobby.isEmpty()).toBe(true)
})