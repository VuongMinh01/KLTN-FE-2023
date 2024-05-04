import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

import { publicRoute, privateRoute } from "./routes";
import Admin from "./pages/Admin";
import User from "./pages/User";
import ReadingTesting from "./pages/ReadingTesting";
import ListeningTesting from "./pages/ListeningTesting";
import FullTesting from "./pages/FullTesting";

function App() {

  return (
    <div>
      <BrowserRouter>

        <Routes>



          {publicRoute.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />


          })}
          <Route path="/admin/*" element={<Admin />}></Route>
          <Route path="/user/*" element={<User />}></Route>
          <Route path="/study/reading-test/*" element={<ReadingTesting />}></Route>
          <Route path="/study/listening-test/*" element={<ListeningTesting />}></Route>
          <Route path="/study/full-test/*" element={<FullTesting />}></Route>


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
