import { LOCATION_CHANGE } from 'connected-react-router';
import { setUser } from 'store/modules/auth';

const reducerName = 'app';
const createActionName = name => `${reducerName}/${name}`;

/* Actions */
const OPEN_MENU = createActionName('OPEN_MENU');
const CLOSE_MENU = createActionName('CLOSE_MENU');
const START_LOADING = createActionName('START_APP_LOADING');
export const END_LOADING = createActionName('END_APP_LOADING');

/*  Reducer */
const initialState = {
  isMenuOpen: false,
  isLoading: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOCATION_CHANGE:
    case setUser:
    case OPEN_MENU:
    case CLOSE_MENU: {
      return { ...state, isMenuOpen: action.type === OPEN_MENU };
    }

    case START_LOADING:
    case END_LOADING: {
      return { ...state, isLoading: action.type === START_LOADING };
    }

    default:
      return state;
  }
}

/* Action Creators */
export const openMenu = () => ({
  type: OPEN_MENU,
});

export const closeMenu = () => ({
  type: CLOSE_MENU,
});

export const startLoading = () => ({
  type: START_LOADING,
});

export const endLoading = () => ({
  type: END_LOADING,
});