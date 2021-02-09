import React from "react"
import { graphql } from "gatsby"
//gatsby-nodeからcontextで受け取ったtagの表示
const ArchivePage = (props) => {
  const tag = props.pageContext.tag;
  const articles = props.data.allMarkdownRemark.edges;
  return (
    <div style={{'margin':'50px'}}>
      <h1>{tag}一覧</h1>
      <div>
        <ul>
          {
            articles.map((v,i)=>{
              return (
                <li key={i}>{v.node.frontmatter.title}</li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}
//contextで受け取ったtagを使用して、filterで絞り込みをする
export const query = graphql`
  query ArchiveQuery($tag: String) {
    allMarkdownRemark (
      filter: {frontmatter: {tag: {eq: $tag}}}
      ) {
      edges {
        node {
          frontmatter {
            title
            tag
          }
        }
      }
    }
  }
`
export default ArchivePage
