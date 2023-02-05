import React, { useState } from 'react';
import { Link, graphql } from "gatsby"
import axios from 'axios';
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`
  const [showBalloon, setShowBallon] = useState(false);
  const [shareText, setShareText] = useState("");

  const handleSelectText = () => {
    const selectedText = window.getSelection().toString()
    const isSelected = selectedText.length > 0
    if (isSelected) {
      setShowBallon(true)
      setShareText(selectedText)
    } else {
      setShowBallon(false)
    }

  }

  const handleClickSuzuri = async () => {
    const apiUrl = "https://sensational-puffpuff-0189ed.netlify.app/.netlify/functions/suzuri"
    const config = {
      headers: {
        "Content-Type": "application/json"
      },
    };
    const data = { "text": shareText }

    const response = await axios.post(apiUrl, data, config)
      .then((res) => {
        console.log(res.data)
        window.location.href = res.data.data.products[0].sampleUrl
      })
  }
  return (
    <Layout location={location} title={siteTitle}>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
          onMouseUp={() => handleSelectText()}
          onMouseOut={() => handleSelectText()}
        />
        {showBalloon && (<button className="share" onClick={() => handleClickSuzuri(shareText)}>SUZURI</button>)}
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export const Head = ({ data: { markdownRemark: post } }) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
