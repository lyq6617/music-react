import React from "react";
import { ReactComponent as RecommendIcon } from "../../../assets/icons/recommend.svg";
import { ReactComponent as StreamIcon } from "../../../assets/icons/stream.svg";
import { ReactComponent as MusicListIcon } from "../../../assets/icons/musicList.svg";
import { ReactComponent as RankingIcon } from "../../../assets/icons/ranking.svg";


import "./IconList.scss";

const iconListArray = [
  { Icon: RecommendIcon, title: "每日推荐" },
  { Icon: StreamIcon, title: "私人FM" },
  { Icon: MusicListIcon, title: "歌单" },
  { Icon: RankingIcon, title: "排行榜" },

];

export const IconList = () => {
  return (
    <div className="iconList">
      {iconListArray.map((item, index) => {
        return (
          <div className="iconItem" key={index}>
            <span className="iconicon"><item.Icon /></span>
             {item.title}
          </div>
        );
      })}
    </div>
  );
};

// class IconList extends React.Component {
//   render() {
//     return (
//       <div className="iconList">
//         <div className="iconItem">
//           <RecommendIcon />
//         </div>

//         <div className="iconItem">
//           <StreamIcon />
//         </div>
//       </div>
//     );
//   }
// }

// export default IconList;
