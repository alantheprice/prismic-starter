import React, { useEffect, useState } from 'react'
import { RichText } from 'prismic-reactjs'
import { client } from '../prismic-configuration'
import { Link, withRouter } from 'react-router-dom'
import Prismic from 'prismic-javascript'


const LinkItem = (props) => {
    const { selected, title, href, page } = props
    return (
        <li className={`sidebar__list-item${selected === href ? " selected" : ""}`}>
            <Link to={{
                pathname: href,
                state: {
                    page: page
                }
            }}>{title}</Link>
        </li>
    )
}

const Sidebar = (props) => {
    const { location } = props
    const [links, setLinks] = useState(null)

    // Get the pages from Prismic
    useEffect(() => {
        const fetchData = async () => {
            // We are using the predicate to get all pages
            const result = await client.query(
                Prismic.Predicates.at('document.type', 'page'),
                { orderings: '[document.first_publication_date]' }
            )
            if (result && result.results && result.results.length) {
                return setLinks(result.results.filter(x => x.data.show_in_nav))
            }
        }
        fetchData()
    }, [])

    if (links) {
        return (
            <ul className="sidebar__list">
                {
                    links.map((page) => (
                        <LinkItem
                            key={page.uid}
                            selected={location.pathname}
                            page={page}
                            title={RichText.asText(page.data.title)}
                            href={`/${page.uid}`}
                        />
                    )
                    )
                }
            </ul>
        )
    } else {
        return null
    }
}


export default withRouter(Sidebar)