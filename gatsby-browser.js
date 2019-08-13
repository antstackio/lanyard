exports.onRouteUpdate = () => {
  // Donot remove "typeof" : https://github.com/gatsbyjs/gatsby/issues/14480#issuecomment-497983196
  if (typeof window !== "undefined") {
    window.locations = window.locations || [document.referrer]
    locations.push(window.location.href)
    window.previousPath = locations[locations.length - 2]
  }
}
