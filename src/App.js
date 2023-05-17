import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Header from "./Header";
import Signin from "./pages/Signin";
import Post from "./pages/Post";
import New_Post from "./pages/New_post";
import Postpages from "./pages/Postpages";
import Home from "./pages/Home";
import Modify from "./pages/Modify";
import View from "./pages/View";
import Dif_topic from "./pages/Dif_topic";
// import Header_css from "./css/Header.css";

function App() {
  // 顯示網站內容
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Post />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        {/* eslint-disable-next-line */}
        <Route path="/newPost" element={<New_Post />}></Route>

        <Route path="post/:postId" element={<Postpages />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/post/:postId/modify" element={<Modify />}></Route>
        <Route path="/post/:postId/modify/:versionId" element={<Modify />}></Route>
        <Route path="/view" element={<View />}></Route>
        {/* eslint-disable-next-line */}
        <Route path="/:topicname" element={<Dif_topic/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
