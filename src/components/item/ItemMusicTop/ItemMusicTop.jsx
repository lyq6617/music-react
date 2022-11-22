import React from "react";
import { getMusicItemList, getItemList, getMusicUrl } from "../../../api/item";
import { ReactComponent as LeftIcon } from "../../../assets/icons/left.svg";
import { ReactComponent as SearchWhiteIcon } from "../../../assets/icons/searchWhite.svg";
import { ReactComponent as ListWhiteIcon } from "../../../assets/icons/listWhite.svg";
import { ReactComponent as RightPlayIcon } from "../../../assets/icons/rightPlay.svg";
import { ReactComponent as RightArrowWIcon } from "../../../assets/icons/rightArrowW.svg";
import { ReactComponent as MessageIcon } from "../../../assets/icons/message.svg";
import { ReactComponent as ShareIcon } from "../../../assets/icons/share.svg";
import { ReactComponent as DownloadIcon } from "../../../assets/icons/download.svg";
import { ReactComponent as ChoicesIcon } from "../../../assets/icons/choices.svg";
import { ItemMusicList } from "../ItemMusicList/ItemMusicList";

import { Link } from "react-router-dom";

// import { ReactComponent as TodolistIcon } from "../../../assets/icons/todolist.svg";
import "./ItemMusicTop.scss";
// import { resolvepath } from "react-router-dom";

export default class ItemMusicTop extends React.Component {
  state = {
    playlist: [],
    itemList: [],
    musicUrl: [],
  };

  changeCount = (num) => {
    if (num >= 100000000) {
      return (num / 100000000).toFixed(1) + "亿";
    } else if (num >= 10000) {
      return (num / 10000).toFixed(1) + "万";
    }
  };

  async componentDidMount() {
    const id = window.location.search.slice(1).split("=")[1];
    //获取歌单详情页
    let res = await getMusicItemList(id);
    this.setState({
      playlist: res.data.playlist,
    });
    //获取歌单的歌曲
    let result = await getItemList(id);
    this.setState({
      itemList: result.data.songs,
    });
    let musicUrl = await getMusicUrl(id);
    this.setState({
      musicUrl: musicUrl,
    });
  }

  render() {
    const { playlist, itemList } = this.state;
    // console.log("playlist", this.state.playlist);
    // console.log("itemList", this.state.itemList);
    // console.log(this.state.musicUrl);

    return (
      <>
        <div className="itemMusicTop">
          <img src={playlist.coverImgUrl} alt="" className="bgimg" />
          <div className="itemLeft">
            <Link to={`/`}>
              <LeftIcon />
            </Link>
            <span>歌单</span>
          </div>
          <div className="itemRight">
            <SearchWhiteIcon />
            <ListWhiteIcon />
          </div>
        </div>

        <div className="itemTopContent">
          <div className="contentLeft">
            <img src={playlist.coverImgUrl} alt="" />
            <div className="playCount">
              <RightPlayIcon />
              <span>{this.changeCount(playlist.playCount)}</span>
            </div>
          </div>
          <div className="contentRight">
            <p className="rightP_one">{playlist.name}</p>

            <div className="right_image">
              <img src={playlist.creator?.avatarUrl} alt="" />
              <span>{playlist.creator?.nickname}</span>
              <RightArrowWIcon />
            </div>

            <div className="rightP_two">
              <span>{playlist.description}</span>
              <RightArrowWIcon />
            </div>
          </div>
        </div>

        <div className="itemTopFooter">
          <div className="footerItem">
            <MessageIcon />
            <span>{playlist.commentCount}</span>
          </div>
          <div className="footerItem">
            <ShareIcon />
            <span>{playlist.shareCount}</span>
          </div>
          <div className="footerItem">
            <DownloadIcon />
            <span>下载</span>
          </div>
          <div className="footerItem">
            <ChoicesIcon />
            <span>多选</span>
          </div>
        </div>
        <ItemMusicList itemList={itemList} playlist={playlist} />
      </>
    );
  }
}
