# Lanyard

[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors-)

Lanyard was originally created by us for our community event AWS Community Day. It became popular in the community because of ease of use and well thought-out inteface. Quickly other communities wanted to use this app & we helped them get up and running. This made us think there may be many more organizers who woould love to use something like Lanyard & hence we decided to open-source the project

[![amplifybutton](https://oneclick.amplifyapp.com/button.svg)](https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/antstackio/lanyard)

## Features:

### Time Aware

When you open the app, it always displays what's currently happening based on time, right in your face, no scrolling through endless agenda table

### Make Your Own Schedule

Let's users to make their own schedule for mult-track events and accordingly highlights the scheduled track at that time.

### Talk Level Feedback

We all know that feedback at the end of the event is broken and very less useful. Lanyard allows attendees give feedback for the talk right after it is finished, collecting the feedback when the talk is still fresh in the head.

### Progressive Web App (PWA)

No App Stores, No installation, just load the URL and tap "Add to Home Screen", use it for the event & remove it later.

### Works offline!

Having a decent network connectivity at the event is always a challenge. Lanyard takes advantage of local storage & once it's loaded, it can completely work offline (except for submitting feedback).

### Kiosk Mode (Coming Soon)

As an organiser if you want to display agenda on a vertically mounted display, you could use Kiosk mode of Lanyard. Just like the normal version, it is time-aware and will always display currently running talk, it's plug & play! Kiosk mode also sports a QR code for people to scan and get this on their phone.

## Run Locally/Dev

Clone this repository

```
git clone git@github.com:antstackio/lanyard.git
cd lanyard
```

Install Dependencies & Run!

```
npm install
npm run start
```

## Configuration

To customize this app for you conference, start with config/website.js & edit the details accordingly

```javascript
module.exports = {
  siteTitle: "Lanyard", // Navigation and Site Title
  siteTitleShort: "Lanyard", // short_name for manifest
  siteLogo: "images/logo.png", // Used for SEO and manifest, path to your image you placed in the 'static' folder
  siteDescription: "The Agenda PWA for your Conference.",

  // Manifest and Progress color
  themeColor: "#1E2A39", //
  backgroundColor: "#ffffff",
}
```

### Adding Your Agenda

To add agenda you will have to modify/create src/data/agenda.json

- Slots - Array of slots, slots are time-based & cuts across "tracks"
- Each slot will have array of tracks
- Each track will have it's meta like 'title' & also array of 'speakers'

Example:
Say you have an event which has 3 tracks (say Track1, Track2, Track3) & goes from 10AM to 11:30AM and each slot is 30 mins

- You will have 3 slots, 10:00 - 10:30, 10:30 - 11:00, 11:00 to 11:30
- Each slot will three tracks, Track1, Track2, Track3
- Each of these tracks will have talk meta & speaker information. Tracks must have a unique trackId.

### Tea Breaks, Lunch etc & Merging Tracks

To mark a slot as a non-talk slot, make slotType value to be "break". To merge tracks for few talks/breaks, set trackLength appropriately. If you want to merge all 3 tracks like in example above, trackLength should be set to 3.

### Deploying

Lanyard is configured with one-click deploy with AWS Amplify. All you need to do is click "Deploy on AWS", connect with Github, select your forked repo with your customisations and follow along. AWS Amplify will also deploy the required backend for the app, basically an API to capture event feedback. So it creates API Garetway -> Lambda -> DynamoDB setup for this & all the submitted feedback will be stored in DynamoDB for you to access later.

### Hosted Solutions

We will be launching our hosted solution on lanyard.app but in the meantime if you need us to get this up and running for your conference, get in touch at [connect@antstack.io](mailto:connect@antstack.io)

### Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

[Code of Conduct](https://github.com/lanyard/lanyard/blob/master/CODE_OF_CONDUCT.md)

### License

[MIT](https://choosealicense.com/licenses/mit/)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://hnp.dev"><img src="https://avatars0.githubusercontent.com/u/379689?v=4" width="50px;" alt="Prashanth HN"/><br /><sub><b>Prashanth HN</b></sub></a><br /><a href="https://github.com/hnprashanth/lanyard/commits?author=hnprashanth" title="Code">💻</a> <a href="https://github.com/hnprashanth/lanyard/commits?author=hnprashanth" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/Raalzz"><img src="https://avatars3.githubusercontent.com/u/30571073?v=4" width="50px;" alt="Raalzz"/><br /><sub><b>Raalzz</b></sub></a><br /><a href="https://github.com/hnprashanth/lanyard/commits?author=Raalzz" title="Code">💻</a></td>
    <td align="center"><a href="http://creatorvisions.com"><img src="https://avatars0.githubusercontent.com/u/8165238?v=4" width="50px;" alt="Praveen Kumar Gorakala"/><br /><sub><b>Praveen Kumar Gorakala</b></sub></a><br /><a href="https://github.com/hnprashanth/lanyard/commits?author=onlyveen" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/KrishnaMuddi"><img src="https://avatars0.githubusercontent.com/u/30470613?v=4" width="50px;" alt="krishnamuddi"/><br /><sub><b>krishnamuddi</b></sub></a><br /><a href="https://github.com/hnprashanth/lanyard/commits?author=KrishnaMuddi" title="Code">💻</a></td>
    <td align="center"><a href="https://vishwas.tech/"><img src="https://avatars3.githubusercontent.com/u/13111030?v=4" width="50px;" alt="Vishwas Navada K"/><br /><sub><b>Vishwas Navada K</b></sub></a><br /><a href="https://github.com/hnprashanth/lanyard/commits?author=vishwasnavadak" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
