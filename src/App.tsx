import Loadable from "react-loadable";
import React, { Suspense } from "react";

// Components
import Home from "./pages/Home";
// import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";
// import Cart from "./pages/Cart";

// SCSS
// import "./scss/app.scss";
import "./scss/app.scss";
// import FullPizza from "./pages/FullPizza";
import MainLayout from "./layouts/MainLayout";

// const Cart = React.lazy(
//    () => import(/* webpackChunkName: "Cart" */ "./pages/Cart")
// );

const Cart = Loadable({
   loader: () => import(/* webpackChunkName: "Cart" */ "./pages/Cart"),
   loading: () => <div>Loading cart...</div>,
});

const FullPizza = React.lazy(
   () => import(/* webpackChunkName: "FullPizza" */ "./pages/FullPizza")
);

const NotFound = React.lazy(
   () => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound")
);

// 1:27:47

const App: React.FC = () => {
   return (
      <Routes>
         <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route
               path="pizza/:id"
               element={
                  <Suspense>
                     <FullPizza />
                  </Suspense>
               }
            />
            <Route
               path="*"
               element={
                  <Suspense>
                     <NotFound />
                  </Suspense>
               }
            />
         </Route>
      </Routes>
   );
};

export default App;
