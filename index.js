const { Client, GatewayIntentBits, Events, EmbedBuilder } = require('discord.js');
const { TOKEN, CONFESSION_CHANNEL } = require('./config');
const { addConfession } = require('./database'); // <-- import DB JSON

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'confession') {
        const texte = interaction.options.getString('texte');

        const channel = interaction.guild.channels.cache.find(
            ch => ch.name === CONFESSION_CHANNEL && ch.isTextBased()
        );

        if (!channel) {
            return interaction.reply({ content: `Le canal #${CONFESSION_CHANNEL} n'existe pas.`, ephemeral: true });
        }

        // Enregistrer dans le JSON
        addConfession(interaction.user.id, texte);

        // Crée l'embed
        const embed = new EmbedBuilder()
            .setTitle('Nouvelle confession')
            .setDescription(texte)
            .setColor(0x00AE86)
            .setTimestamp()
            .setFooter({ text: 'Confession uhq' });

        await channel.send({ embeds: [embed] });
        await interaction.reply({ content: 'Ta confession a été envoyée, vas voir dans confessions !', ephemeral: true });
    }
});

client.login(TOKEN);
