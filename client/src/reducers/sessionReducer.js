import { RECEIVE_CURRENT_USER } from '../actions/sessionActions';

const _nullUser = Object.freeze({
  currentUser: null
});

const sessionReducer = (state = _nullUser, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      const currentUser = action.currentUser;
      return { ...currentUser };
    default:
      return state;
  }
};

export default sessionReducer;
