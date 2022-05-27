import { createReducer, createAction } from 'redux-act';


export const setUser = createAction('AUTH_SET_USER');

export const addNetworkAccount = createAction('add network account');
export const removeNetworkAccount = createAction('remove network account');
export const setEmail = createAction('set email');
export const toggleEmailNotifications = createAction(
  'toggle email notifications',
);

export const updatePartnerBalance = createAction('Update partner balance');

const updateUser = createAction('Update user');

const initialState = {
  user: null,
  isLoading: true,
  isFailed: false,
  error: null,
};

export default createReducer(on => {
  on(setUser, (state, payload) => {
    if (payload && payload.is_new) {
      delete payload.is_new;
    }

    return {
      ...state,
      user: payload,
    };
  });

  on(updateUser, (state, payload) => ({
    ...state,
    user: {
      ...state.user,
      ...payload,
    },
  }));

  on(addNetworkAccount, (state, payload) => ({
    ...state,
    user: {
      ...state.user,
      accounts: {
        ...state.user.accounts,
        [payload.network]: payload.account,
      },
    },
  }));

  on(removeNetworkAccount, (state, payload) => {
    const { [payload.network]: _, ...nextAccounts } = state.user.accounts;
    return {
      ...state,
      user: {
        ...state.user,
        accounts: nextAccounts,
      },
    };
  });

  on(setEmail, (state, payload) => ({
    ...state,
    user: {
      ...state.user,
      email: payload.data,
    },
  }));

  on(toggleEmailNotifications, (state, payload) => ({
    ...state,
    user: {
      ...state.user,
      email_notify: payload.data,
    },
  }));

  on(updatePartnerBalance, (state, payload) => {
    const { balance, totalSpent } = payload;

    if (!state.user || !state.user.partner_account) {
      return state;
    }

    return {
      ...state,
      user: {
        ...state.user,
        partner_account: {
          ...state.user.partner_account,
          balance,
          totalSpent,
        },
      },
    };
  });
}, initialState);

export const setBalance = balance => dispatch =>
  dispatch(updateUser({ balance }));

export const increaseBalance = (amount = 0) => (dispatch, getState) => {
  const {
    auth: { user },
  } = getState();

  dispatch(setBalance(user.balance + amount));
};

export const decreaseBalance = (amount = 0) => (dispatch, getState) => {
  const {
    auth: { user },
  } = getState();

  dispatch(setBalance(user.balance - amount));
};

export const setLogin = login => dispatch => dispatch(updateUser({ login }));

export const setUserSession = user => dispatch => {
  dispatch(setUser(user));

  // setTimeout(() => {
  //   window && window.location.replace('/app');
  // }, 500);
};

