import React from "react";
import "./Search.scss";
import { getSearchMusic } from "../../../api/home";
import { Link } from "react-router-dom";
import { ReactComponent as BackIcon } from "../../../assets/icons/back.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/delete.svg";
import { ReactComponent as PlayLIcon } from "../../../assets/icons/playL.svg";
import { ReactComponent as ListLIcon } from "../../../assets/icons/listL.svg";
import { Context } from "../../../store";

export default class Search extends React.Component {
  static contextType = Context;

  state = {
    keyWordList: [],
    searchKey: "",
    searchList: [],
  };

  componentDidMount() {
    this.setState({
      keyWordList: JSON.parse(localStorage.getItem("keyWordList")) || [],
    });
  }

  onkeydown = (e) => {
    if (e.keyCode === 13) {
      this.enterKey();
    }
  };

  onChange = (e) => {
    this.setState({
      searchKey: e.target.value,
    });
  };

  enterKey = async () => {
    const { searchKey } = this.state;
    let { keyWordList } = this.state;
    if (searchKey !== "") {
      keyWordList.unshift(searchKey);
      //去重
      keyWordList = [...new Set(keyWordList)];
      //固定长度
      if (keyWordList.length > 4) {
        keyWordList.pop();
      }

      this.setState({ keyWordList });
      localStorage.setItem("keyWordList", JSON.stringify(keyWordList));
      let res = await getSearchMusic(searchKey);

      this.setState({
        searchList: res.data.result.songs,
        searchKey: "",
      });
    }
  };

  searchHistory = async (item) => {
    let res = await getSearchMusic(item);
    this.setState({
      searchList: res.data.result.songs,
    });
  };

  delHistory = () => {
    localStorage.removeItem("keyWordList");
    this.setState({
      keyWordList: [],
    });
  };

  updateIndex = (item) => {
    console.log("updateIndex");
    item.al = item.album;
    item.al.picUrl = item.album.artist.img1v1Url;
    this.context.store.pushPlayList(item);
    this.context.store.updatePlayListIndex(
      this.context.store.playList.length - 1
    );
  };

  render() {
    const { keyWordList, searchList, searchKey } = this.state;
    return (
      <>
        <div className="searchTop">
          <Link to={`/`}>
            <BackIcon />
          </Link>
          <input
            type="text"
            placeholder="陈奕迅"
            onKeyDown={(e) => this.onkeydown(e)}
            onChange={(e) => this.onChange(e)}
            value={searchKey}
          />
        </div>
        <div className="searchHistory">
          <span className="searchSpan">历史</span>
          {keyWordList.map((item, index) => {
            return (
              <span
                className="spanKey"
                key={index}
                onClick={() => this.searchHistory(item)}
              >
                {item}
              </span>
            );
          })}
          <DeleteIcon onClick={this.delHistory} />
        </div>

        <div className="itemList">
          {searchList.map((item, index) => {
            return (
              <div className="item" key={index}>
                <div
                  className="itemLeft"
                  onClick={() => this.updateIndex(item)}
                >
                  <span className="leftSpan">{index + 1}</span>
                  <div>
                    <p>{item.name}</p>
                    {item.artists.map((item, index) => {
                      return (
                        <span key={index} style={{ marginRight: 0.1 + "rem" }}>
                          {item.name}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="itemRight">
                  {item.mvid !== 0 ? <PlayLIcon /> : ""}
                  <ListLIcon />
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
