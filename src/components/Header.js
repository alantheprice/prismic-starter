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

const Header = (props) => {
    const { location } = props
    const [links, setLinks] = useState(null)
    // const [selected, setSelected] = useState(window.location.pathname)

    // Get the page document from Prismic
    useEffect(() => {
        const fetchData = async () => {
            // We are using the function to get a document by its UID
            const result = await client.query(
                Prismic.Predicates.at('document.type', 'page'),
                { orderings: '[document.first_publication_date]' }
            )
            if (result && result.results && result.results) {
                console.log(result.results)
                return setLinks(result.results.filter(x => x.data.show_in_nav))
            }
        }
        fetchData()
    }, [])

    if (links) {
        return (
            <div className="sidebar">
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
            </div>
        )
    } else {
        return null
    }
}


export default withRouter(Sidebar)