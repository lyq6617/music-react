import React from "react";
import { ReactComponent as RightPlayIcon } from "../../../assets/icons/rightPlay.svg";
import { getMusicList } from "../../../api/home";
import "./MusicList.scss";
import { Link } from "react-router-dom";

class MusicList extends React.Component {
  state = {
    musicList: [],
  };

  async componentDidMount() {
    let res = await getMusicList();
    // console.log(res);
    this.setState({
      musicList: res.data.result,
    });
  }

  changeCount = (num) => {
    if (num >= 100000000) {
      return (num / 100000000).toFixed(1) + "亿";
    } else if (num >= 10000) {
      return (num / 10000).toFixed(1) + "万";
    }
  };

  render() {
    // console.log(this.state.musicList);
    const items = this.state.musicList.map((item) => (
      <Link to={`itemMusic?id=${item.id}`} key={item.id}>
        <div className="musicList-item">
          <img src={item.picUrl} alt="" />
          <span className="playCount">
            <RightPlayIcon />
            {this.changeCount(item.playCount)}
          </span>
          <div className="name">{item.name}</div>
        </div>
      </Link>
    ));
    return (
      <div className="musicList">
        <div className="musicTop">
          <div className="title">发现好歌单</div>
          <div className="more">查看更多</div>
        </div>
        <div className="musicContent">{items}</div>
      </div>
    );
  }
}

export default MusicList;
