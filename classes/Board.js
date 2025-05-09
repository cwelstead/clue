

export default class Board {
    // 24 width, 25 height
    static BOARD = [
        [0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0],
        [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],
        [0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
    ]
    static PLACES = [
        {
            key: "112",
            xPos: 0,
            yPos: 1,
            width: 6,
            height: 6,
            adjacentSpaces: [{x: 4, y: 7}],
            img: './src/assets/rooms/112.png', // images are relative to the 'client' folder
            alt: "Room 112"
        },
        {
            key: "Great Hall",
            xPos: 8,
            yPos: .3,
            width: 8,
            height: 7.7,
            adjacentSpaces: [{x: 7, y: 5}, {x: 9, y: 8}, {x: 14, y: 8}, {x: 16, y: 5}],
            img: './src/assets/rooms/great-hall.png',
            alt: "Great Hall"
        },
        {
            key: "Selleck",
            xPos: 18,
            yPos: 1,
            width: 6,
            height: 5,
            adjacentSpaces: [{x: 18, y: 5}],
            img: './src/assets/rooms/selleck.png',
            alt: "Selleck"
        },
        {
            key: "Conference",
            xPos: 0,
            yPos: 9,
            width: 8,
            height: 7,
            adjacentSpaces: [{x: 8, y: 12}, {x: 6, y: 16}],
            img: './src/assets/rooms/conference.png',
            alt: "Conference Room"
        },
        {
            key: "Kauffman Clue",
            xPos: 10,
            yPos: 9,
            width: 5,
            height: 7,
            adjacentSpaces: [{x: 12, y: 16}],
            img: './src/assets/rooms/kauffman-clue.png',
            alt: "Kauffman Clue"
        },
        {
            key: "Study",
            xPos: 18,
            yPos: 8,
            width: 6.15,
            height: 5,
            adjacentSpaces: [{x: 17, y: 9}, {x: 22, y: 13}],
            img: './src/assets/rooms/study.png',
            alt: "Study"
        },
        {
            key: "DS Room",
            xPos: 17,
            yPos: 14,
            width: 7,
            height: 5,
            adjacentSpaces: [{x: 20, y: 13}, {x: 16, y: 16}],
            img: './src/assets/rooms/ds-room.png',
            alt: "DS Room"
        },
        {
            key: "Mega Lounge",
            xPos: 0,
            yPos: 19,
            width: 7,
            height: 6,
            adjacentSpaces: [{x: 6, y: 18}],
            img: './src/assets/rooms/mega-lounge.png',
            alt: "Mega Lounge"
        },
        {
            key: "Main Office",
            xPos: 9,
            yPos: 18,
            width: 6,
            height: 7.6,
            adjacentSpaces: [{x: 11, y: 17}, {x: 12, y: 17}, {x: 15, y: 20}],
            img: './src/assets/rooms/main-office.png',
            alt: "Main Office"
        },
        {
            key: "110",
            xPos: 17,
            yPos: 21,
            width: 7,
            height: 4,
            adjacentSpaces: [{x: 17, y: 20}],
            img: './src/assets/rooms/110.png',
            alt: "Room 110"
        },
     ]
}