import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import fetchSongs from '../queries/fetchSongs';

class SongList extends Component {
  onSongDelete(id) {
    this.props.mutate({
      variables: { id }
    })
      // a slightly different way to refetch information after mutation using react-apollo
      .then(() => this.props.data.refetch());
  }
  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => {
      return (
        <li key={id} className="collection-item">
          {title}
          <i className="material-icons" onClick={ () => this.onSongDelete(id) }>
            delete
          </i>
        </li>
      );
    });
  }


  render() {
    return this.props.data.loading ? null : (
      <div>
        <ul className="collection">
          {this.props.data.songs ? this.renderSongs() : null}
        </ul>
        <Link to="/songs/new"
          className="btn-floating btn-large green right"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    )
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID){
    deleteSong(id: $id) {
      id
    }
  }
`


export default graphql(mutation)(
  graphql(fetchSongs, mutation)(SongList)
);
