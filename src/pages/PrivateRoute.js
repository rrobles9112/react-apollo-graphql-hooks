import  React from  "react";
import { Route, Redirect } from  "react-router-dom";
import { useDispatch, useTrackedState } from "../store";

const  PrivateRoute = (props) => {
    const dispatch = useDispatch();
    const state = useTrackedState();

    return  state.isAuthenticated ? (<Route  path={props.path}  exact={props.exact} component={props.component} />) :
        (<Redirect  to="/"  />);
};

export  default  PrivateRoute;