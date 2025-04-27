export const CARDS = Object.freeze([
    {
        id: "110",
        type: "room",
    },
    {
        id: "112",
        type: "room",
    },
    {
        id: "CONFERENCE",
        type: "room",
    },
    {
        id: "DS_ROOM",
        type: "room",
    },
    {
        id: "GREAT_HALL",
        type: "room",
    },
    {
        id: "MAIN_OFFICE",
        type: "room",
    },
    {
        id: "MEGA_LOUNGE",
        type: "room",
    },
    {
        id: "SELLECK",
        type: "room",
    },
    {
        id: "STUDY",
        type: "room",
    },
    {
        id: "Adam",
        type: "suspect",
    },
    {
        id: "Bob",
        type: "suspect",
    },
    {
        id: "DrCooper",
        type: "suspect",
    },
    {
        id: "Firestone",
        type: "suspect",
    },
    {
        id: "Theresa",
        type: "suspect",
    },
    {
        id: "Val",
        type: "suspect",
    },
    {
        id: "DESK_CHAIR",
        type: "weapon",
    },
    {
        id: "LAPTOP_CHARGER",
        type: "weapon",
    },
    {
        id: "MONITOR",
        type: "weapon",
    },
    {
        id: "PROJECTOR",
        type: "weapon",
    },
    {
        id: "SCISSOR",
        type: "weapon",
    },
    {
        id: "TEXTBOOK",
        type: "weapon",
    },
])

export function getCardSource(card) {
    return `./assets/${card.type}Cards/${id}.svg`
}

export function getCaseFile() {
    const room = CARDS.filter(card => card.type == "room")[0] // change to random choice
    const suspect = CARDS.filter(card => card.type == "suspect")[0] // change to random choice
    const weapon = CARDS.filter(card => card.type == "weapon")[0] // change to random choice

    return {room: room, suspect: suspect, weapon: weapon}
}