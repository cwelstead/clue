# Long Haired Baddies - Software IV

Welcome to our implementation of the classic game Clue! This file explains the basic purposes of each file as well as how to set up and run the game on your own local machine. VSCode is highly recommended but as long as you have a way to run multiple terminals at once it's not required.

## Setup and Running the Program
### Setup Steps
1. Open a terminal in the root directory.
2. Run the command `npm i` to install all dependencies.

    This will allow you to run the testing framework if you so desire. All you have to do is run `npm run test` in the source directory and the test suite will automatically be run for you.
3. Navigate to the "client" folder and use `npm i` to install dependencies for the client folder. These are different because we wanted to separate the function of client and server programs, so there is a separate node_modules folder and dependency list for each folder.
4. Run `npm run dev` to start the program. Don't open the localhost hyperlink yet, the server needs to be started first for the multiplayer functionality and database authentication to work properly.
5. In a second terminal (I usually use the "split terminal" function on VSCode), navigate to the "server" folder. Use `npm i` again to install server dependencies.
6. Just as before, run `npm run dev` to start the program. Once you see the message that the server is up and running, you're good to go!
7. Click the link in your client's terminal or follow [this hyperlink here](http://localhost:5173/) to find the homepage for Clue. 

### Troubleshooting
If you're having trouble getting the program to run, try the following:

- Verify that upon opening the web page, the server console prints a message that a user connected. If you don't see this message, it means that the client and server are not correctly connected.
- Check the console of the web page for any connection errors. This is another sign that the client hasn't properly connected to the server.
- Lastly, if you get stuck after logging in or signing up, check the server console for a successful login message. Sometimes the server won't correctly update after an authentication request (which usually happens during development) which can give the impression that no errors have occurred but in reality the authentication process is stuck in limbo.

All of these errors can be fixed by simply quitting the running program in both client and server terminals, closing any localhost tabs that are open, and re-running each in the order described above (client, server, open client hyperlink).

## Repository Tour
Here we'll go over a high-level overview of what the most important folders have in them.

### classes
Basic classes and static information that we need to reference from time to time. This is mostly useful for the backend but the Board class has been indispensable in helping display the game board correctly.
### client
All code pertaining to what the user sees when they open the Kauffman Clue webpage. This project is made through Vite, which supports hot updates and streamlines the development process.

- client/public: Miscellanous fonts that are used as well as the music that can be heard in the lobby.
- client/src: Contains the base of client code and the connection to Firebase, our authentication system.
    - client/src/assets: All images and visual aspects used, from cards to background images. Organized into folders for convenience.
    - client/src/components: Every .jsx file that isn't our main App. Some are organized into folders for a less messy navigation experience.

### server
All code pertaining to the backend. Communication between client and server is done through socket.io, which is all handled in the index.js file. It can feel unwieldy looking through it for the first time, but all functions are generally organized well by their purpose. The main categories include abstrations for convenience (which all have individual comments on them), code for lobbies, and code for in-game. 

### tests
Tests created for some of the files in our /classes folder. Run `npm run test` from the source directory to run these tests.