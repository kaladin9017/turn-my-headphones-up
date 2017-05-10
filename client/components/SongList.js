import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import fetchSongs from '../queries/fetchSongs';

class SongList extends Component {
  renderSongs() {
    return this.props.data.songs.map(song => (<li key={song.id} className="collection-item">{song.title}</li>));
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

export default graphql(fetchSongs)(SongList);
