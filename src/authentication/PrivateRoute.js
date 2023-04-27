import { memo } from 'react';
import { Redirect, Route } from 'react-router-dom';
import NotFound from '../pages/errors/NotFound';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ Component, authority, isLayout = false, ...routerProps }) => {
  const store = useSelector((state) => state?.auth);

  return (
    <Route
      {...routerProps}
      render={(props) => {

        if (!store?.token) {
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
        }
        const userAuthorities = store?.authority;
        console.log(userAuthorities)
        if (userAuthorities?.includes(authority)) {
          return <Component {...props} />;
        }
        return <NotFound />;

      }}
    />
  );
};

export default memo(PrivateRoute);
