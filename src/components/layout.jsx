const Layout = ({ children, data }) => (
    <>
        <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossOrigin="anonymous"
        />
        {/* <Header data={data} /> */}
        <main>{children}</main>
        {/* <Footer /> */}
    </>
)
Layout.propTypes = {
    children: PropTypes.node.isRequired,
}
export default Layout

export const query = graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
      wordpressWpApiMenusMenusItems {
        items {
          title
          object_slug
        }
      }
    }
  `
