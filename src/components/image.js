// import React from "react"
// import { useStaticQuery, graphql } from "gatsby"
// import Img from "gatsby-image"

// const Image = ({ name }) => {
//   const data = useStaticQuery(graphql`
//     query {
//       placeholderImage: file(relativePath: { eq: ${name} }) {
//         childImageSharp {
//           fluid(maxWidth: 300) {
//             ...GatsbyImageSharpFluid
//           }
//         }
//       }
//     }
//   `)

//   return <Img fluid={data.placeholderImage.childImageSharp.fluid} />
// }

// export default Image
// //
// //
// //

// import Img from 'gatsby-image'

// const Image = (props) => (
//   <StaticQuery
//     query={graphql`
//       query {
//         images: allFile {
//           edges {
//             node {
//               relativePath
//               name
//               childImageSharp {
//                 sizes(maxWidth: 600) {
//                   ...GatsbyImageSharpSizes
//                 }
//               }
//             }
//           }
//         }
//       }
//     `}

//     render={(data) => {
//       const image = data.images.edges.find(n => {
//         return n.node.relativePath.includes(props.filename);
//       });
//       if (!image) { return null; }

//       const imageSizes = image.node.childImageSharp.sizes;
//       return (
//         <Img
//           alt={props.alt}
//           sizes={imageSizes}
//         />
//       );
//     }}
//   />
// )

// https://noahgilmore.com/blog/easy-gatsby-image-components/
