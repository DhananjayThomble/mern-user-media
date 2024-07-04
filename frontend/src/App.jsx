import React, { Profiler } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import CreateAccount from "./components/Auth/CreateAccount";
import Login from "./components/Auth/Login";
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/Profile/EditProfile";
import UploadVideo from "./components/Videos/UploadVideo";
import VideoList from "./components/Videos/VideoList";
import NavBar from "./components/Layout/Navbar";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<CreateAccount />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/videos/upload" element={<UploadVideo />} />
            <Route path="/videos" element={<VideoList />} />
          </Routes>
        </main>
      </Router>
    </Provider>
  );
}

export default App;
