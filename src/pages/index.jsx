function IndexPage() {
    return (
        <div className="container">
            <h1>Index</h1>
            <p>Let's explore different ways to style Next.js apps</p>
            <style jsx>{`
          .container {
            margin: 50px;
          }
          p {
            color: blue;
          }
        `}</style>
        </div>
    )
}

export default IndexPage