/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

exports.onRouteUpdate = () => {
  // Donot remove "typeof" : https://github.com/gatsbyjs/gatsby/issues/14480#issuecomment-497983196
  if (typeof window !== "undefined") {
    window.locations = window.locations || [document.referrer]
    locations.push(window.location.href)
    window.previousPath = locations[locations.length - 2]
  }
}
