import React from "react";
import TopNav from "./TopNav/TopNav";
import SwiperTop from "./SwiperTop/SwiperTop";
import { IconList } from "./IconList/IconList";
import MusicList from "./MusicList/MusicList";

function Home() {
  return (
    <>
      <TopNav />
      <SwiperTop />
      <IconList />
      <MusicList />
    </>
  );
}

export default Home;
