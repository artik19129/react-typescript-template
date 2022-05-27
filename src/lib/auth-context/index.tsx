import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';

import { userApi } from './api';
import { setUser as storeSetUser } from 'store/modules/auth';
import { USER_TYPES } from 'lib/constants/route-rights';

const initialState = {
  error: null,
  isLoading: true,
};

const Context = React.createContext(initialState);

class AuthProvider extends Component {
  constructor(props) {
    super(props);

    this.hasAccess = this.hasAccess.bind(this);
    this.getHomePath = this.getHomePath.bind(this);
    this.hasAccessToLocation = this.hasAccessToLocation.bind(this);

    this.state = { ...initialState };
  }

  componentDidMount() {
    // @ts-ignore
    const { user } = this.props;

    if (user) {
      this.checkAuthPermissions();

      this.setState({
        isLoading: false,
      });
    } else {
      this.fetchUser().then(() => {
        this.checkAuthPermissions();
      });
    }
  }

  componentDidUpdate(prevProps) {
    // @ts-ignore
    const { user } = this.props;

    const prevUserExists = !!prevProps.user;
    const currentUserExists = !!user;

    const isUserAssigned = !prevUserExists && currentUserExists;
    const isUserRemoved = !currentUserExists && prevUserExists;
    const isUserUpdated =
      prevUserExists && currentUserExists && user.id !== prevProps.user.id;

    if (isUserRemoved || isUserAssigned || isUserUpdated) {
      this.checkAuthPermissions();
    }
  }

  get clientType() {
    // @ts-ignore
    const { user } = this.props;

    if (!user) {
      return USER_TYPES.GUEST;
    }

    return user.role;
  }

  checkAuthPermissions() {
    // @ts-ignore
    const { location, history } = this.props;

    if (!this.hasAccessToLocation(location.pathname)) {
        history.replace({
          pathname: this.getHomePath(),
        });
    }
  }

  async fetchUser() {
    this.setState({ isLoading: true });

    return this.authSuccess({ login: 'Test', role: 'admin' });

    // TODO: user request
    // await userApi.getUser()
    //   .then((user: IUser) => {
    //     return this.authSuccess({ ...user, role: 'user' });
    //   })
    //   .catch(({ response }) => {
    //     return this.authFail(response.data.message);
    //   });
  }

  authSuccess(user) {
    // @ts-ignore
    this.props.setUser(user);

    this.setState({
      isLoading: false,
      error: null,
    });
  }

  authFail(error) {
    // @ts-ignore
    this.props.setUser(null);

    this.setState({
      isLoading: false,
      error,
    });
  }

  hasAccessToLocation(pathname) {
    let hasAccess = true;

    // @ts-ignore
    const matchedRoutes = matchRoutes(this.props.routes, pathname);

    if (matchedRoutes.length === 0) {
      return false;
    }

    matchedRoutes.forEach(matched => {
      const { route } = matched;

      if (Array.isArray(route.rights)) {
        hasAccess = this.hasAccess({ allowedRoles: route.rights });
      }
    });

    return hasAccess;
  }

  /*
    By default header is visible for authorized users and is hidden for guests.
    Can force state by setting route.headerVisibleFor (bool)
    headerVisibleFor is set to [] only on fastOrder, because there is custom header
    for everybody.
   */
  isLocationWithHeader(location) {
    let withHeader = null;

    // @ts-ignore
    matchRoutes(this.props.routes, location.pathname).forEach(matched => {
      const { route } = matched;

      /*
       If route's headerVisibleFor explicitly specified we should check current
       user type and determine that header is visible
       */
      if (route.headerVisibleFor) {
        // @ts-ignore
        withHeader = route.headerVisibleFor.indexOf(this.clientType) !== -1;
      }

      // no rights mean that route is available for all type of users
      // so we show the header by default
      if (withHeader === null && !route.rights) {
        // @ts-ignore
        withHeader = true;
      }

      if (route.rights) {
        // But if there is a route.rights, we show header only if no GUEST in
        // rights array, because it means that those route is for authorized only
        withHeader = route.rights.every(
          accessRight => USER_TYPES.GUEST !== accessRight,
        );
      }
    });

    return withHeader || false;
  }

  hasAccess({ allowedRoles }) {
    return allowedRoles.includes(this.clientType);
  }

  getHomePath() {
    // @ts-ignore
    const { homePaths } = this.props;
    const defaultHomePath = homePaths[this.clientType];

    if (defaultHomePath === undefined) {

      return '/';
    }

    return defaultHomePath;
  }

  render() {
    // @ts-ignore
    const { location, children, user } = this.props;
    // @ts-ignore
    const { isLoading, error } = this.state;

    if (process.env.NODE_ENV === 'development' && isLoading && !user) {
      return null;
    }

    return (
      <Context.Provider
        value={{
          // @ts-ignore
          user,
          isLoading,
          error,
          hasAccess: this.hasAccess,
          getRedirectPath: this.getHomePath,
          hasAccessToLocation: this.hasAccessToLocation,
          isHeaderVisible: this.isLocationWithHeader(location),
        }}
      >
        {
          // @ts-ignore
          children({ isHeaderVisible: this.isLocationWithHeader(location) })
        }
      </Context.Provider>
    );
  }
}

// @ts-ignore
AuthProvider.propTypes = {
  children: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,

  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
    }),
  ).isRequired,

  location: PropTypes.shape({
    pathname: PropTypes.string,
    rights: PropTypes.arrayOf(
      PropTypes.oneOf([
        USER_TYPES.ADMIN,
        USER_TYPES.USER,
        USER_TYPES.DEVELOPER
      ]),
    ),
  }).isRequired,

  history: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,

  user: PropTypes.object,

  homePaths: PropTypes.objectOf(PropTypes.string),
};

// @ts-ignore
AuthProvider.defaultProps = {
  user: null,
  homePaths: {
    [USER_TYPES.USER]: '/',
  },
};

function stateToProps(state) {
  return {
    user: state.auth.user,
  };
}

function dispatchToProps(dispatch) {
  return {
    // @ts-ignore
    setUser: user => dispatch(storeSetUser(user)),
  };
}

const ConnectedProvider = withRouter(
  connect(stateToProps, dispatchToProps)(AuthProvider),
);

export { ConnectedProvider as AuthProvider, Context as AuthContext };
