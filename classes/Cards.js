export const CARDS = Object.freeze([
    {
        id: "110",
        type: "room",
        phrase: "room 110"
    },
    {
        id: "112",
        type: "room",
        phrase: "room 112"
    },
    {
        id: "CONFERENCE",
        type: "room",
        phrase: "the conference room"
    },
    {
        id: "DS_ROOM",
        type: "room",
        phrase: "the Design Studio room"
    },
    {
        id: "GREAT_HALL",
        type: "room",
        phrase: "the Great Hall"
    },
    {
        id: "MAIN_OFFICE",
        type: "room",
        phrase: "the Main Office"
    },
    {
        id: "MEGA_LOUNGE",
        type: "room",
        phrase: "the Mega Lounge"
    },
    {
        id: "SELLECK",
        type: "room",
        phrase: "Selleck"
    },
    {
        id: "STUDY",
        type: "room",
        phrase: "the study room"
    },
    {
        id: "Adam",
        type: "suspect",
        phrase: "Adam"
    },
    {
        id: "Bob",
        type: "suspect",
        phrase: "Bob"
    },
    {
        id: "DrCooper",
        type: "suspect",
        phrase: "Dr. Cooper"
    },
    {
        id: "Firestone",
        type: "suspect",
        phrase: "Dr. Firestone"
    },
    {
        id: "Theresa",
        type: "suspect",
        phrase: "Theresa"
    },
    {
        id: "Val",
        type: "suspect",
        phrase: "Val"
    },
    {
        id: "DESK_CHAIR",
        type: "weapon",
        phrase: "the desk chair"
    },
    {
        id: "LAPTOP_CHARGER",
        type: "weapon",
        phrase: "the laptop charger"
    },
    {
        id: "MONITOR",
        type: "weapon",
        phrase: "the monitor"
    },
    {
        id: "PROJECTOR",
        type: "weapon",
        phrase: "the projector"
    },
    {
        id: "SCISSOR",
        type: "weapon",
        phrase: "the scissors"
    },
    {
        id: "TEXTBOOK",
        type: "weapon",
        phrase: "the textbook"
    },
])

export function getCaseFile() {
    const room = CARDS.filter(card => card.type == "room")[0] // change to random choice
    const suspect = CARDS.filter(card => card.type == "suspect")[0] // change to random choice
    const weapon = CARDS.filter(card => card.type == "weapon")[0] // change to random choice

    return {room: room, suspect: suspect, weapon: weapon}
}