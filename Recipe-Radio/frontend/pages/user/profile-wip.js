import React from 'react'
import Link from 'next/link'
import 'isomorphic-unfetch'
import Header from '../../components/Header'
import cookies from 'next-cookies'
import jwt_decode from 'jwt-decode'

export default class profile extends React.Component {
  static async getInitialProps (ctx) {
    // get cookie here!
    // const { token } = cookies(ctx)
    const {token} = cookies(ctx)
    console.log("token: ", token)
    var decoded = jwt_decode(token);
    console.log("decoded: ", decoded);
    const user_id = decoded.userid;
    console.log("user_id: ", user_id)

    // eslint-disable-next-line no-undef
    const backend_url = 'http://api-server:4000/api/users/' + user_id;
    const res = await fetch(backend_url, {
      headers: {
        'content-type': 'application/json'
      }
    })
    const json = await res.json()
    return { user: json, token }
  }
  
  render () {
    if (this.props.token) {
    const { _id, username, email } = this.props.user;
    const token = this.props.token;
        return (
          <div>
            <Header token={token}/>
            <div>ID: {_id}</div>
            <h2>Username: {username}</h2>
            <div>Email: {email}</div>
          </div>
        ) 
    } else {
      return (
        <div>
          <Header />
          <p>Please login</p>
        </div>
      )
    }

  }
}