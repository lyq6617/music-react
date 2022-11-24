import "./App.css";
import React from "react";
import Footer from "./components/item/FooterMusic/FooterMusic";
import Home from "./components/home/Home";
import ItemMusic from "./components/item/ItemMusicTop/ItemMusicTop";
import Search from "./components/item/Search/Search";
import Login from "./components/item/Login/Login";
import { Route, Routes } from "react-router-dom";
import { Context } from "./store";

class App extends React.Component {
  state = {
    store: {
      isFooterMusicShow: true,
    },
  };
  updateStore = (value) => {
    this.setState({
      store: value,
    });
  };
  render() {
    const { store } = this.state;
    console.log(store);
    return (
      <Context.Provider
        value={{ store: this.state.store, updateStore: this.updateStore }}
      >
        <div>
          <Routes>
            {/* https://reactrouter.com/en/main/start/overview */}
            <Route path="/" element={<Home />} />
            <Route path="/itemMusic" element={<ItemMusic />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          {store.isFooterMusicShow ? <Footer /> : ""}
        </div>
      </Context.Provider>
    );
  }
}

export default App;
