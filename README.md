[![Build status](https://badge.buildkite.com/0721103d18e2921880c1f18df491229eea35b2075e3d58b270.svg)](https://buildkite.com/benji7425/activity-monitor)

# Discord Activity Monitor
A Discord bot to assign/remove a role from users in your guild based on whether or not they have been active lately.

## Features
- Remove an 'active' role from a user who has not been active for a number of days
- Optionally assign an 'inactive' role to a user when they lose the 'active' role
- Optionally re-assign the 'active' role when a user who becomes active again
- Configure specific users or roles to be exempt from monitoring
- Configure threshold for inactivity

## Use cases
- Keep active members at the top of the members sidebar
- Reward active members for participating in the community
- Recognise how many inactive members your server has

## Getting started
Activity Monitor needs to be deployed before you can invite it to your Discord server. Please see [my written deployment guide](https://benji7425.io/discord-deployment) or [video tutorial](https://www.youtube.com/watch?v=DjQayKgcjGM) which can guide you through deployment even if you are a beginner.  
Once you have deployed Activity Monitor then return here to follow the Discord setup instructions below.  

This button can be used for following the Heroku deployment steps.

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/benji7425/discord-activity-monitor)

## Discord setup
Follow these instructions once you have deployed Activity Monitor and added it to your Discord server.
Use `@Activity Monitor help` to view available commands.

**Admin only**  
The setup command requires administrator permission in the Discord server.
1. Create a role (or choose an existing one) to use to mark active users
2. Make your chosen role *mentionable* (only needed until setup is complete)
3. Put the bot's role *higher* in the list than your chosen role
4. Run `@Activity Monitor setup` in a channel the bot can *read* and *write* in
	- If you've nicknamed the bot, substitute `@Activity Monitor` for it's nickname
5. Respond with the information the bot asks you for, until setup is complete

You can view your guild settings with `@Activity Monitor view-config`

Example:  
![Example setup](https://user-images.githubusercontent.com/14295333/61799425-01468d00-ae23-11e9-9e88-604eaa033a24.png)

## Permissions

The bot requires certain permissions, which you are prompted for on the invite screen.
Each permission has a reason for being required, explained below.

| Permission    | Reason                                       |
| ------------- | -------------------------------------------- |
| Read messages | Detect when people are active                |
| Send messages | Ask setup questions and respond to commands  |
| Manage roles  | Assign and remove the active role from users |
| Embed links   | Respond to commands                          |

## Built With
- [Node.js v10](https://nodejs.org/en/) - *Runtime*
- [discord.js](https://github.com/discordjs/discord.js) - *Discord library*
- [disharmony](https://github.com/benji7425/disharmony) - *Bot framework*

## Versioning
[SemVer](http://semver.org/) is used for versioning. View available versions on the [tags page](https://github.com/your/project/tags).

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.