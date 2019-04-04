import { BotGuild } from "disharmony"

export default class Guild extends BotGuild
{
    private _users: Map<string, Date>

    get inactiveThresholdDays(): number { return this.record.inactiveThresholdDays || 7 }
    set inactiveThresholdDays(value: number) { this.record.inactiveThresholdDays = value }

    get activeRoleId(): string { return this.record.activeRoleId || "" }
    set activeRoleId(value: string) { this.record.activeRoleId = value }

    get inactiveRoleId(): string { return this.record.inactiveRoleId || "" }
    set inactiveRoleId(value: string) { this.record.inactiveRoleId = value }

    get allowRoleAddition(): boolean { return this.record.allowRoleAddition }
    set allowRoleAddition(value: boolean) { this.record.allowRoleAddition = value }

    get ignoredUserIds(): string[] { return this.record.ignoredUserIds = this.record.ignoredUserIds || [] }
    get ignoredRoleIds(): string[] { return this.record.ignoredRoleIds = this.record.ignoredRoleIds || [] }

    get users(): Map<string, Date>
    {
        if (!this._users)
            this._users = new Map(this.record.users || [])
        return this._users
    }

    public toRecord()
    {
        this.record.users = [...this._users.entries()]
        return super.toRecord()
    }
}