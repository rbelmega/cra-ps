import * as api from '../../data/api';

export const fetchBio = () => dispatch => {
  dispatch({
    type: 'FETCH_DATA_REQUEST',
  });

  api.fetchBio().then(response =>
    dispatch({
      type: 'FETCH_BIO_SUCCESS',
      response,
    })
  );
};
