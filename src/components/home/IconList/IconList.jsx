import React from "react";
import { ReactComponent as RecommendIcon } from "../../../assets/icons/recommend.svg";
import { ReactComponent as StreamIcon } from "../../../assets/icons/stream.svg";
import "./IconList.scss";

const iconListArray = [
  { Icon: RecommendIcon, title: "sad" },
  { Icon: StreamIcon, title: "abc" },
];

export const IconList1 = () => {
  return (
    <div className="iconList">
      {iconListArray.map((item, index) => {
        return (
          <div className="iconItem" key={index}>
            <item.Icon /> {item.title}
          </div>
        );
      })}
    </div>
  );
};

class IconList extends React.Component {
  render() {
    return (
      <div className="iconList">
        <div className="iconItem">
          <RecommendIcon />
        </div>

        <div className="iconItem">
          <StreamIcon />
        </div>
      </div>
    );
  }
}

export default IconList;
