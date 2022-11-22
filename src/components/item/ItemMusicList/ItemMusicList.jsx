import React from "react";
import { ReactComponent as PlayIcon } from "../../../assets/icons/play.svg";
import { ReactComponent as PlusIcon } from "../../../assets/icons/plus.svg";
import { ReactComponent as PlayLIcon } from "../../../assets/icons/playL.svg";
import { ReactComponent as ListLIcon } from "../../../assets/icons/listL.svg";

import { Context } from "../../../store";

import "./ItemMusicList.scss";

export class ItemMusicList extends React.Component {
  static contextType = Context;

  state = {};

  playMusic = (i) => {
    this.context.store.updatePlayList(this.props.itemList);
    this.context.store.updatePlayListIndex(i);
  };

  render() {
    const { itemList, playlist } = this.props;

    return (
      <div className="itemMusicList">
        <div className="itemListTop">
          <div className="listLeft">
            <PlayIcon />
            <span className="playAll">
              播放全部
              <span className="all">(共{itemList.length}首)</span>
            </span>
          </div>
          <div className="listRight">
            <PlusIcon />
            <span>收藏({playlist.subscribedCount})</span>
          </div>
        </div>

        <div className="itemList">
          {itemList.map((item, i) => {
            return (
              <div className="item" key={i} onClick={() => this.playMusic(i)}>
                <div className="itemLeft">
                  <span className="leftSpan">{i + 1}</span>
                  <div>
                    <p>{item.name}</p>

                    {item.ar.map((item1, j) => {
                      return (
                        <span style={{ marginRight: 0.1 + "rem" }} key={j}>
                          {item1.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className="itemRight">
                  {item.mv !== 0 ? <PlayLIcon /> : ""}
                  <ListLIcon />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
