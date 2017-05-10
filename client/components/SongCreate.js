import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';

import fetchSongs from '../queries/fetchSongs';

class SongCreate extends Component {
  constructor(props) {
    super(props)
    this.state = { title: "" }
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.mutate({
      variables: { title: this.state.title },
       //variables can be added after query inline
      refetchQueries: [{ query: fetchSongs /*, variables: someVariable*/ }]
    })
    .then(() => hashHistory.push('/'));

  }
  render() {
    return (
      <div>
        <br/>
          <Link to="/"
            className="btn btn-medium red right"
          >
            Back
          </Link>
        <br/>
        <h3>Create a new Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            value={this.state.input}
            onChange={event => this.setState({title: event.target.value})}
            placeholder="Enter A Title"
          />
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

const mutation = gql`
  mutation AddSong($title: String){
    addSong(title: $title) {
      title
    }
  }
`


export default graphql(mutation)(SongCreate);
