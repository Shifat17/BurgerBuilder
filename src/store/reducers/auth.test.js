import reducer from './auth';
import * as actionTypes from '../actions/actions';

describe('auth reducer', () => {
  it('should return initial state when passed undefined as first argument', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/',
    });
  });

  it('should store the token upon login', () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: '/',
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          idToken: 'some-token',
          userId: 'some-id',
        }
      )
    ).toEqual({
      token: 'some-token',
      userId: 'some-id',
      error: null,
      loading: false,
      authRedirectPath: '/',
    });
  });
});
