import { BotGuildMember, Client, Logger } from "disharmony";
import Guild from "../models/guild";
import GuildMember from "../models/guild-member";
import Message from "../models/message";

export default class ActivityRegisterer
{
    public startListening()
    {
        this.client.onMessage.sub(
            message => this.registerActivity(message.guild, message.member, message.textChannelName))
        this.client.onVoiceStateUpdate.sub(
            args => this.registerActivity(
                new Guild(args.newMember.djs.guild),
                args.newMember,
                args.newMember.voiceChannelName || args.oldMember.voiceChannelName))
    }

    private async registerActivity(guild: Guild, member: GuildMember, channelName: string)
    {
        if (!member || !guild || member.id === this.client.botId)
            return

        await guild.loadDocument()
        if (!this.isGuildSetUp(guild))
            return

        if (this.isMemberIgnored(guild, member))
            return

        guild.users.set(member.id, new Date())
        await this.markMemberActive(guild, member, channelName)
        await guild.save()
    }

    private async markMemberActive(guild: Guild, member: GuildMember, channelName: string)
    {
        try
        {
            const reasonStr = `Activity detected in channel '${channelName}'`
            await member.addRole(guild.activeRoleId, reasonStr);

            if (guild.inactiveRoleId && guild.inactiveRoleId !== "disabled")
                await member.removeRole(guild.inactiveRoleId, reasonStr)
        }
        catch (e)
        {
            Logger.debugLogError(`Error marking user ${member.username} active in guild ${guild.name}.`, e)
            Logger.logEvent("ErrorMarkingActive", { guildId: guild.id, memberName: member.username })
        }
    }

    private isMemberIgnored(guild: Guild, member: BotGuildMember)
    {
        const isIgnoredUser = guild.ignoredUserIds.indexOf(member.id) >= 0
        const hasIgnoredRole = guild.ignoredRoleIds.some(roleId => member.hasRole(roleId))
        return isIgnoredUser || hasIgnoredRole
    }

    private isGuildSetUp(guild: Guild)
    {
        return guild.allowRoleAddition && guild.activeRoleId && guild.activeRoleId.length > 0
    }

    constructor(
        private client: Client<Message, GuildMember>,
    ) { }
}