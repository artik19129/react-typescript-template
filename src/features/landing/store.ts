import { createAction, createReducer } from 'redux-act';
import { landingApi } from './api';

export const landingLoaded = createAction<{response: Object}>('Landing Loaded');

const initialState = {

}

export const landingReducer = createReducer(
  on => {

    on(landingLoaded, (state, payload:{}) => ({
      ...state,
      ...payload,
    }));
  },
  initialState
);

// export const loadAudio = () => dispatch =>
//   audioApi
//     .getAudioData()
//     .then(response => dispatch(landingLoaded(response)));

export default landingReducer;
