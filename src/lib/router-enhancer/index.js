import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { matchRoutes } from 'react-router-config';
import { connect } from 'react-redux';
import { AuthContext } from 'lib/auth-context';
import * as app from 'store/modules/ui';
import { animateScroll as scroll } from 'react-scroll/modules';
import { LOGOUT_REDIRECT } from 'lib/constants/route-rights';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom'

function showNextPage() {
  scroll.scrollToTop({
    duration: 0,
    delay: 0,
    smooth: false,
  });
}

function isLocationsEquals(previousLocation, nextLocation) {
  if (previousLocation === null || nextLocation === null) {
    return previousLocation === nextLocation;
  }

  return previousLocation.pathname === nextLocation.pathname;
}

/**
 * Роутер принимает массив всех роутов приложения, текущюю локации и рендер-свитч ребенком
 * Роутер умеет подгружать данные роута, функция async route.preloadData({dispatch, match})
 * Роутер так же проверяет 1) доступ для юзера 2) наличие шапки на странице
 *
 */
class RouterEnhancer extends Component {
  state = {
    currentLocation: null,
    nextLocation: null,
    shouldPreloadNextLocation: true,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { currentLocation, nextLocation: loadingLocation } = prevState;
    const { location: toLocation } = nextProps;

    const currentLocationChanged = !isLocationsEquals(
      currentLocation,
      toLocation,
    );

    const sameAsLoadingLocation = isLocationsEquals(
      loadingLocation,
      toLocation,
    );

    if (!currentLocationChanged || sameAsLoadingLocation) {
      return null;
    }

    return {
      nextLocation: toLocation,
      shouldPreloadNextLocation: true,
    };
  }

  componentDidMount() {
    this.navigate();
  }

  async componentDidUpdate(prevProps, prevState) {
    const { history } = this.props;
    const { nextLocation, shouldPreloadNextLocation } = this.state;
    const { getRedirectPath } = this.context;

    const nextLocationUpdated = !isLocationsEquals(
      prevState.nextLocation,
      nextLocation,
    );

    const shouldUpdateLocation = nextLocation !== null && nextLocationUpdated;

    if (!shouldUpdateLocation && !shouldPreloadNextLocation) {
      return;
    }

    /**
     * If route is not accessible then we redirect to home page.
     * Except case when we logout and user object is
     * still exist. (we need to redirect before setting user to null)
     * Page flicker (no preload).
     */
    const isLogoutRedirect =
      nextLocation.state && nextLocation.state[LOGOUT_REDIRECT] === true;

    const shouldRedirectToHome =
      shouldUpdateLocation &&
      !this.canAccessLocation(nextLocation) &&
      !isLogoutRedirect;

    if (shouldRedirectToHome) {
      history.replace(getRedirectPath());
      return;
    }

    // lol kek cheburek

    this.navigate();
  }

  navigate() {
    const { nextLocation, shouldPreloadNextLocation } = this.state;

    if (shouldPreloadNextLocation) {
      const { startLoading, endLoading } = this.props;

      this.setState({
        shouldPreloadNextLocation: false,
      });

      const matchedRoutes = this.matchRoutes(nextLocation);

      if (this.canPreloadRoutes(matchedRoutes)) {
        startLoading();

        this.preloadRoutes(matchedRoutes).then(() => {
          endLoading();
          this.showNextLocation(nextLocation);
        });

        return;
      }
    }

    this.showNextLocation(nextLocation);
  }

  showNextLocation(nextLocation) {
    this.setState(state => {
      if (
        !state.nextLocation ||
        state.nextLocation.pathname !== nextLocation.pathname
      ) {
        return {};
      }

      return {
        currentLocation: state.nextLocation,
        nextLocation: null,
      };
    }, showNextPage);
  }

  matchRoutes(location) {
    const { routes } = this.props;
    return matchRoutes(routes, location.pathname);
  }

  canPreloadRoutes(routes) {
    return routes.some(matched => {
      const { route } = matched;

      const canPreloadData = typeof route.preloadData === 'function';
      const isLoadable =
        route.component && route.component.preload !== undefined;

      return isLoadable || canPreloadData;
    });
  }

  preloadRoutes(routes) {
    const { dispatch, history } = this.props;
    const preload = [];

    routes.forEach(matched => {
      const { route, match } = matched;

      if (route.preloadData) {
        preload.push(route.preloadData({ dispatch, history, match }));
      }

      if (route.component.load) {
        // for @loadable/component
        preload.push(route.component.load());
      } else if (route.component.preload) {
        // for react-loadable
        preload.push(route.component.preload());
      }
    });

    return Promise.all(preload);
  }

  canAccessLocation(location) {
    const { hasAccessToLocation } = this.context;

    return location && hasAccessToLocation
      ? hasAccessToLocation(location.pathname)
      : false;
  }

  render() {
    const { children } = this.props;
    const { currentLocation, nextLocation } = this.state;
    const { isLoading, getRedirectPath } = this.context;
    const canAccessCurrentLocation = this.canAccessLocation(currentLocation);
    const canAccessNextLocation = this.canAccessLocation(nextLocation);

    if (canAccessCurrentLocation) {
      return (
        <Route
          key={currentLocation.pathname}
          location={currentLocation}
          render={() => children}
        />
      );
    }

    if (!currentLocation && !canAccessNextLocation && !isLoading) {
      return <Redirect to={getRedirectPath()} />;
    }

    return null;
  }
}

RouterEnhancer.contextType = AuthContext;

RouterEnhancer.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
    }),
  ).isRequired,
  children: PropTypes.node.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  startLoading: PropTypes.func.isRequired,
  endLoading: PropTypes.func.isRequired,
};

function stateToProps(state) {
  return {
    isLoading: state.app.isLoading,
  };
}

function dispatchToProps(dispatch) {
  return {
    dispatch,

    startLoading() {
      dispatch(app.startLoading());
    },

    endLoading() {
      dispatch(app.endLoading());
    },
  };
}

export default withRouter(
  connect(stateToProps, dispatchToProps)(RouterEnhancer),
);
