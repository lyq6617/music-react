import React from "react";
import { ReactComponent as SearchIcon } from "../../../assets/icons/search.svg";
import { ReactComponent as ListIcon } from "../../../assets/icons/list.svg";
import "./TopNav.scss";
import { Link} from "react-router-dom";


class TopNav extends React.Component {
  render() {
    return (
      <div className="topNav">
        <div className="topLeft">
          <ListIcon/>
        </div>

        <div className="topContent">
          <span>我的</span>
          <span className="active">发现</span>
          <span>云村</span>
          <span>视频</span>
        </div>

        <div className="topRight">
        <Link to={`search`} >
          <SearchIcon />
          </Link>
        </div>
      </div>
    );
  }
}

export default TopNav;
