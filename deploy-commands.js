const { REST, Routes, SlashCommandBuilder } = require('discord.js');
const { TOKEN, CLIENT_ID, GUILD_ID } = require('./config');

const commands = [
    new SlashCommandBuilder()
        .setName('confession')
        .setDescription('Envoie une confession anonymement')
        .addStringOption(option =>
            option.setName('texte')
                  .setDescription('Ta confession')
                  .setRequired(true)
        )
        .toJSON()
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        console.log('Enregistrement des commandes slash...');
        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands }
        );
        console.log('Commandes slash enregistrées !');
    } catch (error) {
        console.error(error);
    }
})();
