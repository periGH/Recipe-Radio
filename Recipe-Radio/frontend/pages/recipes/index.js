import React from 'react'
import Link from 'next/link'
import 'isomorphic-unfetch'
import Header from '../../components/Header'

export default class profile extends React.Component {
  static async getInitialProps () {
    // eslint-disable-next-line no-undef
    const backend_url = 'http://api-server:4000/api/recipes';
    const res = await fetch(backend_url)
    const json = await res.json()
    return { recipes: json }
  }

  render () {
    return (
      <div>
        <Header />
        <div className="recipes-list">
          {this.props.recipes.map(function(recipe) {
            return (
              <article key={recipe._id}>
                <div>ID: {recipe._id}</div>
                <div>TAGS: {recipe.tags}</div>
                <div>INGREDIENTS: {recipe.ingredients}</div>
                <div>IMAGE: {recipe.image}</div>
                <div>DIRECTIONS: {recipe.directions}</div>
                <div>cooktime: {recipe.cooktime}</div>
              </article>
            )
          })}
        </div>
      </div>
    )
  }
}