# Long Haired Baddies - Software IV

Included in this README is some basic information about the files included so far. Nothing has yet to be officially started, but I'm following some tutorials to get the basics of server-side development and will update this doc with how to test our app on local devices the more I learn.

### classes
This folder holds all abstractions for objects we may need during development. I started with a User (as a placeholder for when login works) and Lobby (which is subject to change) but once the actual game starts going in we may need to add more.

### client
All client-side code, i.e. the code that controls what the user sees. React and front-end things are all in here.

### server
Controls the back-end, connects users with each other, will probably control database management once that's in.

### ws-chat-tutorial
Thank god for [this tutorial](https://www.youtube.com/watch?v=J8xReLuBNPY). I'm currently following along with it, I would recommend you guys watch it as well for a basic understanding of how to test this program. Eventually I'll take what I learned here and use it to create the skeleton for our game.

## Links and Miscellaneous
Make sure to install Git if you want to use version control through VSCode<br>
In order to run the website and test, you need to have a terminal open for both the client and server folders. Both start with the same command (npm run dev), and both should dynamically update as you save code. If your computer screen is big enough, using the "Split Terminal" feature is very helpful for this.<br>
You'll need to follow some of the tutorial in order to install all the required items on your computer, specifically node.js and maybe a couple others<br>
Use bash for your terminal if you're having problems with powershell or cmd<br>
[uuid](https://www.npmjs.com/package/uuid#uuidv7options-buffer-offset) might be a super helpful library for unique user IDs if we need them<br>
If I missed anything please let me know, I've been trying out a lot of stuff and might have forgotten some of the process