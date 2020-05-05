const  { prefix, token } = require('./config.json');
const { exec } = require('child_process');
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();

  const max_num_lines=25
  const max_char_per_line=28
  
  const max_char_print=max_num_lines*max_char_per_line


  if (command === `print`) {

    var try_msg_content = msg.content.slice(prefix.length+command.length).match(/"([^"]+)"/)
    if (try_msg_content===null){
      msg.channel.send('ERROR: invalid message!');
      return;
    }

    const print_msg_content = try_msg_content[1];
    const actual_print_msg = msg.author.username+'\n'+msg.createdAt.toLocaleString()+'\n'+print_msg_content


    if ( actual_print_msg.length > max_char_print || print_msg_content.split(/\r\n|\r|\n/).length > max_num_lines ){
      msg.channel.send('ERROR: Message too long!');
      return;
    }

    msg.channel.send('Printing\n'+actual_print_msg);

    exec('./print_message.sh '+`'${actual_print_msg}'`, (error, stdout, stderr) => {
           console.log(stdout);
           console.log(stderr);
           if (error !== null) {
             console.log(`exec error: ${error}`);
           }
         });

  }
});

client.login(token);
