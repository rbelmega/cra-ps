import * as api from '../../data/api';

export const fetchPosts = () => dispatch => {
  dispatch({
    type: 'FETCH_DATA_REQUEST',
  });

  api.fetchPosts().then(response =>
    dispatch({
      type: 'FETCH_POSTS_SUCCESS',
      response,
    })
  );
};
