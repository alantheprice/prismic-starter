import Prismic from 'prismic-javascript'

export const repoName = process.env.REACT_APP_REPO

// -- Prismic API endpoint
// Determines which repository to query and fetch data from
export const apiEndpoint = `https://${repoName}.cdn.prismic.io/api/v2`

// -- Access Token if the repository is not public
// Generate a token in your dashboard and configure it here if your repository is private
const accessToken = process.env.REACT_APP_ACCESS_TOKEN || ''

// -- Link resolution rules
// Manages the url links to internal Prismic documents
export const linkResolver = (doc) => {
  if (doc.type === 'page') return `/page/${doc.uid}`
  return '/'
}

// Client method to query documents from the Prismic repo
export const client = Prismic.client(apiEndpoint, { accessToken })
