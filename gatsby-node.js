const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`)

  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                category
                draft
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges.filter(
      ({ node }) => !node.frontmatter.draft && !!node.frontmatter.category
    )

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: blogPostTemplate,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
exports.createPages = async ({ graphql, actions }) => {

  const { createPage } = actions;

  //groupを使用してtagを抽出するクエリ

  const tagsResult = await graphql(`

    query tagsQuery {

      allMarkdownRemark {

        group(field: frontmatter___tag) {

          fieldValue

        }

      }

    }

  `)

  const sampleTemplate = path.resolve("./src/template/temp.js")

  //タグの数だけforEachでループする

  //テンプレート側で絞り込みをするため、contextで値（タグ）を渡す

  tagsResult.data.allMarkdownRemark.group.forEach(v => {

    const path = '/blog/tags/' + v.fieldValue

    createPage({

      path: path,

      component: sampleTemplate,

      context: {

        tag: v.fieldValue

      }

    })

  });

}