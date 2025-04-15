// import React from "react";
// import { Route, Navigate } from "react-router-dom";
// import { auth } from "../firebase";
// import { onAuthStateChanged } from "firebase/auth";

// const PrivateRoute = ({ element: Element, ...rest }) => {
//   const [isAuthenticated, setIsAuthenticated] = React.useState(false);

//   React.useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setIsAuthenticated(true);
//       } else {
//         setIsAuthenticated(false);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <Route
//       {...rest}
//       element={isAuthenticated ? <Element /> : <Navigate to="/signin" />}
//     />
//   );
// };

// export default PrivateRoute;
