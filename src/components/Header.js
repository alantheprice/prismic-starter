import React, { useEffect, useState } from 'react'
import { RichText } from 'prismic-reactjs'
import { client } from '../prismic-configuration'
import { Link, withRouter } from 'react-router-dom'
import Prismic from 'prismic-javascript'

const Header = (props) => {
    const { location } = props
    const [header, setHeader] = useState(null)
    // const [selected, setSelected] = useState(window.location.pathname)

    // Get the page document from Prismic
    useEffect(() => {
        const fetchData = async () => {
            // We are using the function to get a document by its UID
            const result = await client.query(
                Prismic.Predicates.at('document.type', 'header'),
                { orderings: '[document.first_publication_date desc]' }
            )
            if (result && result.results && result.results[0]) {
                console.log(result.results)
                return setHeader(result.results[0])
            }
        }
        fetchData()
    }, [])

    if (header) {
        return (
            <div className="header__container" >
                <div className="header__image-overlay" style={{ backgroundImage: `url(${header.data.header_image.url})` }} />
                <h1 className="header__title hdg hdg--1">{RichText.asText(header.data.primary_header)}</h1>
            </div>
        )
    } else {
        return null
    }
}


export default withRouter(Header)