import React from "react";
import "./MusicDetail.scss";
import { ReactComponent as LeftArrowIcon } from "../../../assets/icons/leftArrow.svg";
import { ReactComponent as RightArrowIcon } from "../../../assets/icons/rightArrow.svg";
import { ReactComponent as ShareIcon } from "../../../assets/icons/share.svg";
import { ReactComponent as HeartIcon } from "../../../assets/icons/heart.svg";
import { ReactComponent as DownloadIcon } from "../../../assets/icons/download.svg";
import { ReactComponent as CdIcon } from "../../../assets/icons/cd.svg";
import { ReactComponent as TalkIcon } from "../../../assets/icons/talk.svg";
import { ReactComponent as MessageIcon } from "../../../assets/icons/message.svg";
import { ReactComponent as CircleIcon } from "../../../assets/icons/circle.svg";
import { ReactComponent as PrevIcon } from "../../../assets/icons/prev.svg";
import { ReactComponent as NextIcon } from "../../../assets/icons/next.svg";
import { ReactComponent as PlayWhiteIcon } from "../../../assets/icons/playWhite.svg";
import { ReactComponent as TodoListWhiteIcon } from "../../../assets/icons/todoListWhite.svg";
import { ReactComponent as PausedIcon } from "../../../assets/icons/paused.svg";
import { Popup } from "antd-mobile";

class musicDetail extends React.Component {
  constructor(props) {
    super(props);
    // 创建一个 ref 来存储 textInput 的 DOM 元素
    this.musicLyricRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.currentTime !== prevProps.currentTime) {
      let p = document.querySelector("p.active");
      // console.log([p]);
      if (p) {
        if (p.offsetTop > 200) {
          this.musicLyricRef.current.scrollTop = p.offsetTop - 200;
        }
        // if (this.props.currentTime === this.duration) {
        //   if (this.playListIndex === this.playList.length - 1) {
        //     this.updatePlayListIndex(0);
        //     this.play();
        //   } else {
        //     this.updatePlayListIndex(this.playListIndex + 1);
        //   }
        // }
      }
    }
  }

  state = {
    isLyricShow: false,
    getLyric: {},
    // lyricArr:[],
  };

  lyric = () => {
    let arr;
    if (this.props.Musiclyric) {
      // console.log(this.props.Musiclyric);
      arr = this.props.Musiclyric.trim()
        .split(/[(\r\n)\r\n]+/)
        .map((item, i) => {
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mill = item.slice(7, 10);
          let lrc = item.slice(11, item.length);
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);

          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9);
            lrc = item.slice(10, item.length);
            time =
              parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          }
          // console.log(min, sec, mill, lrc);
          return { min, sec, mill, lrc, time };
        });
      arr.forEach((item, i) => {
        if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
          item.pre = 1000000;
        } else {
          item.pre = arr[i + 1].time;
        }
      });
    }
    // console.log(arr);
    return arr;
  };

  render() {
    const {
      detailShow,
      picUrl,
      name,
      updateDetailShow,
      isbtnShow,
      play,
      currentTime,
    } = this.props;

    const lyric = this.lyric();
    // console.log(lyric);
    // console.log(Musiclyric.split(/[(\r\n)\r\n]+/));
    // console.log(arr);

    const { isLyricShow } = this.state;

    return (
      <Popup
        visible={detailShow}
        // onMaskClick={() => {
        //   setVisible4(false)
        // }}
        position="right"
        bodyStyle={{ width: "100%" }}
      >
        <div className="musicDetail">
          <img src={picUrl} alt="" className="bgimg" />
          <div className="detailTop">
            <div className="detailTopLeft">
              <LeftArrowIcon onClick={updateDetailShow} />
              <div className="leftMarquee">
                <div className="musicName">{name}</div>
                <RightArrowIcon />
              </div>
            </div>
            <div className="detailTopRight">
              <ShareIcon />
            </div>
          </div>

          {!isLyricShow ? (
            <div className="detailContent">
              <img
                src={require("../../../assets/imgs/needle-ab.png")}
                alt=""
                className={
                  "img_needle" + (isbtnShow ? "" : " img_needle_active")
                }
              />

              <img src="disc-plus.png" alt="" className="img_cd" />
              {/* <img src={picUrl} alt="" className="img_ar" /> */}

              <img
                src={picUrl}
                alt=""
                className={"img_ar_pauesd" + (isbtnShow ? "" : "img_ar_active")}
                onClick={() => this.setState({ isLyricShow: true })}
              />
            </div>
          ) : (
            // <div onClick={() => this.setState({ isLyricShow: false })}>
            //   {Musiclyric}
            //   </div>
            <div className="musicLyric" ref={this.musicLyricRef}>
              {lyric.map((item, index) => {
                return (
                  <p
                    key={index}
                    className={
                      currentTime * 1000 >= item.time &&
                      currentTime * 1000 < item.pre
                        ? "active"
                        : ""
                    }
                  >
                    {item.lrc}
                  </p>
                );
              })}
            </div>
          )}

          <div className="detailFooter">
            <div className="footerTop">
              <HeartIcon />
              <DownloadIcon />
              <CdIcon />
              <MessageIcon />
              <TalkIcon />
            </div>
            <div className="footerContent">
              <input type="range" className="range" min="0"></input>
            </div>
            <div className="footer">
              <CircleIcon />
              <PrevIcon />
              {isbtnShow ? (
                <PlayWhiteIcon className="iconBig" onClick={play} />
              ) : (
                <PausedIcon className="iconBig" onClick={play} />
              )}
              <NextIcon />
              <TodoListWhiteIcon />
            </div>
          </div>
        </div>
      </Popup>
    );
  }
}

export default musicDetail;
