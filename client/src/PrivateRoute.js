import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ children, isAdmin }) => {
    // Replace this with your actual authentication logic
    const isAuthenticated = isAdmin; // Set to true if the user is an admin, otherwise set to false

    return isAuthenticated ? (
        <Route element={children} />
    ) : (
        <Navigate to="/student/login" replace={true} />
    );
};

export default PrivateRoute;
