const inquirer = require("inquirer");
const fs = require("fs");

let prompts = [
  {
    type: "input",
    name: "token",
    message: "Discord-Bot token:"
  }, {
    type: "input",
    name: "prefix",
    default: ".pr0",
    message: "Command prefix:"
  }, {
    type: "input",
    name: "ownerid",
    message: "Bot owner-ID:"
  }
];

console.log("This little script will ask you for some information needed to make the bot work properly.");

inquirer.prompt(prompts).then(answers => {
  let settings = JSON.stringify(answers, null, 2);
  if (!fs.existsSync("./config")) fs.mkdirSync("./config");
  fs.writeFile("./config/settings.json", settings, function(err) {
    if(err) return console.log("There was an error creating the settings file. " + err);
    console.log("Settings saved in ./config/settings.json");
    console.log('You can start the bot using "npm start"');
  });
});