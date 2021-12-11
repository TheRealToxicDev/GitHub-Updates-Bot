# GitHub Updates

- Displays notifications in your Discord channels when selected events are triggered.

---

## Usage

Command | Description
--------|------------
`cat!add` - Subscribe to a Repo in the Current Channel
`cat!remove` - UnSubscribe from a Repo in the Current Channel
`cat!help` - Display the Bots Help Message and Commands List

---

## Self Hosting
1. Download or Fork this Repo.
2. Upload to GitHub and Deploy to your Host of choice
3. Set the Env Variables listed below
4. Run `npm start` to start the Bot and Server!

NOTE: Domain for the Webhook Server will be whatever your Hosting Domain is set to

--- 

## Env Variables
- `DBG_DB` - Mongoose Connection String
- `DBG_TOKEN` - Discord Bot Token
