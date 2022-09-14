import * as React from "react";
import Home from "./page/home/Home";
import Login from "./page/login/Login";
import List from "./page/list/List";
import Signle from "./page/single/Signle";
import New from "./page/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="users">
            <Route index element={<List />} />
            <Route path=":userId" element={<Signle />} />
            <Route path="new" element={<New />} />
            <Route index element={<Signle />} />
          </Route>
          <Route path="products">
            <Route index element={<List />} />
            <Route path=":productsId" element={<Signle />} />
            <Route path="new" element={<New />} />
            <Route index element={<Signle />} />
          </Route>
        </Routes>
      </BrowserRouter>
      ,
    </div>
  );
};
export default App;
