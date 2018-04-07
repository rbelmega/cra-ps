import * as api from '../../data/api';

export const fetchBlogPost = blogID => dispatch => {
  dispatch({
    type: 'FETCH_DATA_REQUEST',
  });

  api.fetchBlogPost(blogID).then(response =>
    dispatch({
      type: 'FETCH_BLOG_POST_SUCCESS',
      response,
    })
  );
};
