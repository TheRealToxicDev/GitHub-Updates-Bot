# GitHub Updates
![Bot Version](https://img.shields.io/github/package-json/v/TheRealToxicDev/GitHub-Updates-Bot?style=flat-square&logo=github&label=Version&color=%2334D058) ![Discord.js Version](https://img.shields.io/badge/Discord.js-v13.3.1-%2334d058?style=flat-square&logo=npm&logoColor=fff) ![Owner Info](https://img.shields.io/badge/Owner-TheRealToxicDev-%2334d058?style=flat-square&logo=codepen&logoColor=fff) ![License Info](https://img.shields.io/badge/License-MIT-%2334d058?style=flat-square&logo=info&logoColor=fff)

- Displays notifications in your Discord channels when selected events are triggered.

---

## Usage

Command | Description
--------|------------
`cat!add` | Subscribe to a Repo in the Current Channel
`cat!remove` | UnSubscribe from a Repo in the Current Channel
`cat!help` | Display the Bots Help Message and Commands List

---

## Self Hosting
1. Download or Fork this Repo.
2. Upload to GitHub and Deploy to your Host of choice
3. Set the Env Variables listed below
4. Run `npm start` to start the Bot and Server!

**NOTE:** Domain for the Webhook Server will be whatever your Hosting Domain is set to

<a href="https://heroku.com/deploy?template=https://github.com/TheRealToxicDev/GitHub-Updates-Bot">
  <img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy">
</a>

<a href="https://railway.app/new/template?template=https%3A%2F%2Fgithub.com%2FTheRealToxicDev%2FGitHub-Updates-Bot&plugins=mongodb&envs=DBG_TOKEN%2CDBG_DB">
     <img src="https://railway.app/button.svg" alt="Deploy">
</a>

--- 

## Env Variables
- `DBG_DB` - Mongoose Connection String
- `DBG_TOKEN` - Discord Bot Token

---

## Bot Updates
1. This bot has been Updated to `Discord.js v13`
2. New (public) Version of this bot can be found [here](https://github.dbots.site/invite)
3. We will try to Update and Maintain this Bot the best we can ❤️

---
## Note:

I am working on a update for the bot that will rework, improve and update most of its layout
Aswell as adding a dashboard and a few extra features. This update is a work in progress and
will hopefully be ready soon 👌🏻

### Planned Changes

- [x] Update to latest Discord.js
- [x] Upgrade to Fastify for API
- [x] Rework the GitHub Events
- [ ] Add More GitHub Events to fix the Null Event
- [x] Rework the Discord Client
- [x] Move to Mongoose from MongoDB
- [ ] Create the base NextJS App
- [ ] Create the Dashboard Pages
- [ ] Create some Legal Pages
- [ ] Ensure Website is Mobile Friendly
- [x] Add a Custom Logger for Errors and Console Logs
- [x] Add Discord Client Event Handlers
- [x] Add a Functional Database Client
- [ ] Add a Debugging Log which will clearly state if Events are Successful or Not when not in Production Mode


These updates will be posted as a New Major Version when everything is complete and ready ❤️



