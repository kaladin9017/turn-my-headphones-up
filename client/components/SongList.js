import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class SongList extends Component {
  renderSongs() {
    return this.props.data.songs.map(song => (<li key={song.id} className="collection-item">{song.title}</li>));
  }

  render() {
    return this.props.data.loading ? null : (
        <ul className="collection">
          {this.props.data.songs ? this.renderSongs() : null}
        </ul>
    )
  }
}

const query = gql`
  {
    songs {
      id
      title
    }
  }
`;

export default graphql(query)(SongList);
