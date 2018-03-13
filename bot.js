/*
        Developer/Creator (of Template): Lawliet/Dylan | "Lawloort" @ v3rm
        -  Please do not resell this code :)
        -  Made in 20 minutes or so (with breaks)
        - Commented so you can learn. 
        - Example bot just for people to build off of.
        - Feel free to change for your liking, if you are going to use this, feel free to credit me for the base (optional of course :P)
        - I encourage you improve on this, change stuff up, this in no way is intended to be the best possible for advanced users liking, this is a good start for newbies!
        Steps to install - 
        Install node.js (look it up)
        Then go to your Command Prompt and put in "npm install discord.js"
        Afterwards you should be able to run discord.js bots on your pc. To make things simple I did not add any other external packages and the command handler is simple.
*/
const Discord = require("discord.js");
const client = new Discord.Client();

    client.login("NDI_CHANGE_TOKEN_FAKE_BNlGhl0M__r64vJGSUKB_wE"); // https://discordapp.com/developers/applications/me
    client.on("ready", () => {
        console.log("I am ready to roll!"); //nifty message
    });



client.on("message", async message => { // defines "message" as our message object, which can be used for many, many things. async is needed for "await" functions
    /* Command Handler*/
    const prefix = "!"; // this is a generic prefix, feel free to change to your liking lol
    if (message.author.bot) return; //if the user is a bot it will not respond to it, to prevent b1g issues
    if (!message.content.startsWith(prefix)) return; //returns if the user doesn't use prefix
    let command = message.content.split(" ")[0]; //gets param
    command = command.slice(prefix.length); //slices command length with prefix length to get a definition for let var
    let args = message.content.split(" ").slice(1);

    /* End */

    if (command == "ping") {
        const msg = await message.channel.send("Pinging.."); //calculates the time it takes to edit the message initialy sent, we need async in our message handler for this to function, credit to evie codes for the idea ~!
        msg.edit(`Ping, Pong! :ping_pong: -  ${msg.createdTimestamp - message.createdTimestamp} ms.`); //subtracting initial message with new edited message by new message to get an accurate ping measurement/latency. you could also add api latency if you want to challenge yourself.
    }

    //if a message is made with 10 or more mentions the user will be auto banned for mention abusing
    if (message.mentions.users.size > 10) {
        message.guild.member(message.author).ban("Auto Moderation: 10 or more mentioned.");
    }

    if (command === "kick") {
        if (!message.member.hasPermission("KICK_MEMBERS")) //if the user has the perms kick_members it will allow them to kick perms found here for reference: https://discordapp.com/developers/docs/topics/permissions
            return message.reply("I do not have the valid permissions to this. Provide me KICK_MEMBERS and try again! :cry:");
        let mentioned = message.mentions.members.first();
        if (!mentioned)
            return message.reply("you must mention someone for me to kick! :thinking: :hammer:"); // if they do not provide a mentioned user it will post that
        if (!mentioned.kickable)
            return message.reply("this user is a administrator or above me, so I can not do that. :frowning: :hammer:"); // if the user is above the bot or the bot doesn't have perms it will show this

        let reason = args.slice(1).join(' '); // slicing the args so now it will get the second arguement, e.g. !kick @billybob#6969 being mean
        if (!reason) // if there isn't one tell em' they're bad at life ;')
            return message.reply("Please provide a valid reason for the kick! :sweat_smile:"); // if you want you can make a reason not needed, but I find it quite useful.
        await mentioned.kick(`${message.author.tag} Reason: ${reason}`).catch(err => {
            return message.reply(`An unexpected error has occured with the bot! "${err}" :thinking: `).then(m => m.delete(5000))
        }); //deletes message after 5 seconds of showing error to people, this is used for error handling and debugging, kicks with audit log reason

        message.channel(`\`${mentioned.user.tag}\` has been kicked the moderator ${message.author.tag}, their reason was "${reason}" :hammer:`); // if all goes to plan, it will show success w/ the error they provided in the second parameter!
    }

        
        
        //The rest is up to you, good luck!


}); //end of command handler, commands out of the message event will not function properly
