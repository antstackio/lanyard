/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

exports.onRouteUpdate = () => {
  if (typeof window !== "undefined") {
    window.locations = window.locations || [document.referrer]
    locations.push(window.location.href)
    window.previousPath = locations[locations.length - 2]
  }
}

