import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { content: '' };

  }
  onSubmit(event) {
    event.preventDefault();
    this.props.mutate({
      variables: { content: this.state.content, songId: this.props.songId },
       //variables can be added after query inline
    })
    this.setState({content: ''});
  }
  render() {
    return (
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Add A Lyric</label>
          <input
            onChange={event => this.setState({ content: event.target.value })}
            value={this.state.content}
          />
        </form>
    )
  }
}

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID!){
    addLyricToSong(content: $content, songId: $songId) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`

export default graphql(mutation)(LyricCreate);
