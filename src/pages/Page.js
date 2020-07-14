// In src/pages/Page.js
import React, { useEffect, useState } from 'react'
import { RichText } from 'prismic-reactjs'
import { client, linkResolver } from '../prismic-configuration'
import NotFound from './NotFound'

const Page = (props) => {
    const { match, location } = props
    const { page } = location.state || {}
    const [doc, setDocData] = useState(null)
    const [notFound, toggleNotFound] = useState(false)
    const uid = match.params.uid

    // Get the page document from Prismic
    useEffect(() => {
        const fetchData = async () => {
            if (page && page.uid === uid) {
                setDocData(page)
                return
            }
            // We are using the function to get a document by its UID
            const result = await client.getByUID('page', uid)

            if (result) {
                // We use the State hook to save the document
                return setDocData(result)
            } else {
                // Otherwise show an error message
                console.warn('Page document not found. Make sure it exists in your Prismic repository')
                toggleNotFound(true)
            }
        }
        fetchData()
    }, [uid, page]) // Skip the Effect hook if the UID hasn't changed

    if (doc) {
        return (
            <div className="page">
                <h2 className="hdg hdg--2">{RichText.asText(doc.data.title)}</h2>
                <div className="txt">
                    <RichText render={doc.data.description} linkResolver={linkResolver} />
                </div>
                <div className="page__image-container">
                    <img src={doc.data.image.url} alt={doc.data.image.alt} />
                </div>
            </div>
        )
    } else if (notFound) {
        return <NotFound />
    }
    return null
}

export default Page