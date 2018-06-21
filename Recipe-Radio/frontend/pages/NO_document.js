// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Head, Main, NextScript } from 'next/document'
import cookies from 'next-cookies'
import jwt_decode from 'jwt-decode'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    const {token} = cookies(ctx)
    var decoded = jwt_decode(token);
    const user_id = decoded.userid;
    const loggedInUser = decoded.username;
    console.log("initialProps: ", initialProps)
    console.log("document token: ", token)
    return { ...initialProps, token: token, loggedInUser: loggedInUser }
  }

  render() {
    const loggedInUser = this.props.loggedInUser;
    const token = this.props.token;

    console.log("loggedInUser: ", loggedInUser)

    return (
      <html>
        <Head>
          <style>{`body { margin: 0 } /* custom! */`}</style>
        </Head>
        <body className="custom_class">
          <h1>Hello from document {loggedInUser}</h1>
          <Main token={token} />
          <NextScript />
        </body>
      </html>
    )
  }
}