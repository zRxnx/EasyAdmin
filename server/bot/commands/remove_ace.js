

module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove_ace')
		.setDescription('Removes a permission from a group, saves into easyadmin_permissions.cfg'),
	async execute(interaction, exports) {
		var timestamp = Date.now()

		const modal = new Modal()
			.setCustomId('removeaceModal'+timestamp)
			.setTitle('Remove ACE');

		const groupName = new TextInputComponent()
			.setCustomId('groupName')
			.setLabel("Group Name")
			.setStyle('SHORT')
			.setRequired(true)
			.setMaxLength(120)
			.setPlaceholder('group.admin');

		const permission = new TextInputComponent()
			.setCustomId('permission')
			// The label is the prompt the user sees for this input
			.setLabel("Permission")
			// Short means only a single line of text
			.setStyle('SHORT')
			.setRequired(true)
			.setMaxLength(120)
			.setPlaceholder('easyadmin.bot.playerlist');

		const firstActionRow = new MessageActionRow().addComponents(groupName);
		const secondActionRow = new MessageActionRow().addComponents(permission);

		modal.addComponents(firstActionRow, secondActionRow);

		interaction.showModal(modal);

		const filter = (interaction) => interaction.customId === 'removeaceModal'+timestamp;
		interaction.awaitModalSubmit({ filter, time: 120000 })
		.then(async (interaction) => {
			var group = interaction.fields.getTextInputValue('groupName');
			var permission = interaction.fields.getTextInputValue('permission');
			var query = `remove_ace ${group} ${permission} allow`
			exports[EasyAdmin].RemoveFromFile("easyadmin_permissions.cfg", `add_ace ${group} ${perm} allow`)
	
			ExecuteCommand(query)
	
			interaction.reply(`\`${query}\` has been executed and saved.`)
		}).catch(async (error) => {}) // silently catch error, happens if the form times out
	},
};
