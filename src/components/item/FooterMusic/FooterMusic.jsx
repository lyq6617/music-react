import React from "react";
import { ReactComponent as PlayIcon } from "../../../assets/icons/play.svg";
import { ReactComponent as TodolistIcon } from "../../../assets/icons/todolist.svg";
import { ReactComponent as PausedIcon } from "../../../assets/icons/paused.svg";
import { getMusicLyric } from "../../../api/item";
import MusicDetail from "../MusicDetail/MusicDetail";
import "./FooterMusic.scss";
import { Context } from "../../../store";

//引入antd的popup弹出框做musicdetial页面

// const AFooter = () => {
//   const [state, setState] = useState(1);
//   const [count, setCount] = useState(1);
//   const [playListIndex, setPlayListIndex] = useState(0);

//   useEffect(() => {
//     console.log(12);
//     setState(count * 2);
//   }, [count]);

//   return <div onClick={setState(123)}>213</div>;
// };

class Footer extends React.Component {
  constructor(props) {
    super(props);
    // 创建一个 ref 来存储 textInput 的 DOM 元素
    this.audio = React.createRef();
  }
  static contextType = Context;

  state = {
    playList: [
      {
        //播放列表
        al: {
          id: 16932,
          name: "梦游计",
          pic: 109951166118946340,
          picUrl:
            "https://p1.music.126.net/ifjKrYPuGzRHlbVDNScQfA==/109951166118946328.jpg",
          pic_str: "109951166118946328",
        },
        id: 167655,
        name: "幻听",
      },
    ],
    playListIndex: 0, //默认歌曲下标
    detailShow: false, //歌曲详情页的展示
    isbtnShow: true, //歌曲默认不播放,显示播放button
    play: undefined,
    Musiclyric: "", //歌词
    currentTime: 0,
  };

  interVal = undefined;

  updateCurrentTime = (currentTime) => {
    this.setState({ currentTime });
  };

  updateTime = () => {
    this.interVal = setInterval(() => {
      this.updateCurrentTime(this.audio.current.currentTime);
    }, 1000);
  };

  async componentDidMount() {
    // console.log("this.context", this.context);
    // console.log(this.audio.current);
    // console.log(this.audio);
    this.context.updateStore({
      updatePlayList: this.updatePlayList,
      updatePlayListIndex: this.updatePlayListIndex,
      pushPlayList: this.pushPlayList,
      // play:this.play,
      playList: this.state.playList,
    });

    let res = await getMusicLyric(
      this.state.playList[this.state.playListIndex].id
    );
    this.setState({
      Musiclyric: res.data.lrc.lyric,
    });

    // console.log("getLyric", res);

    // console.log(lyric.split(/[(\r\n)\r\n]+/));
  }

  async componentDidUpdate(prevProps, prevState) {
    const { playList, playListIndex } = this.state;
    if (
      playList !== prevState.playList ||
      playListIndex !== prevState.playListIndex
    ) {
      let res = await getMusicLyric(playList[playListIndex].id);
      this.setState({
        Musiclyric: res.data.lrc.lyric,
      });
    }

    if (
      playList[playListIndex].id !==
      prevState.playList[prevState.playListIndex].id
    ) {
      this.audio.current.autoplay = true;
      if (this.audio.current.paused) {
        this.updateIsbtnShow(false);
      }
    }
  }

  updateDetailShow = () => {
    this.setState({
      detailShow: !this.state.detailShow,
    });
  };

  updateIsbtnShow = (value) => {
    this.setState({
      isbtnShow: value,
    });
  };

  pushPlayList = (value) => {
    const { playList } = this.state;
    playList.push(value);
    this.setState({
      playList,
    });
  };

  updatePlayList = (value) => {
    this.setState({
      playList: value,
    });
  };

  updateLyricList = (value) => {
    this.setState({
      lyricList: value,
    });
  };

  updatePlayListIndex = (value) => {
    this.setState({
      playListIndex: value,
    });
  };

  play = () => {
    if (this.audio.current.paused) {
      this.audio.current.play();
      this.updateIsbtnShow(false);
      this.updateTime(); //播放调用函数
    } else {
      this.audio.current.pause();
      this.updateIsbtnShow(true);
      clearInterval(this.interVal); //暂停清除定时器
    }
  };

  updatePlay = (value) => {
    this.setState({
      play: value,
    });
  };

  render() {
    const {
      playList,
      playListIndex,
      detailShow,
      isbtnShow,
      Musiclyric,
      currentTime,
    } = this.state;
    // console.log(playList[playListIndex]);
    const { name } = playList[playListIndex];
    const { picUrl } = playList[playListIndex].al;

    return (
      <>
        <div className="footerMusic">
          <div className="footerLeft" onClick={this.updateDetailShow}>
            <img src={playList[playListIndex].al.picUrl} alt="" />
            <div>
              <p>{playList[playListIndex].name}</p>
              <span>横滑切换上下首哦</span>
            </div>
          </div>

          <div className="footerRight">
            {isbtnShow ? (
              <PlayIcon onClick={this.play} />
            ) : (
              <PausedIcon onClick={this.play} />
            )}
            <TodolistIcon />
          </div>
          <audio
            ref={this.audio}
            src={`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`}
          ></audio>
        </div>
        <MusicDetail
          detailShow={detailShow}
          picUrl={picUrl}
          name={name}
          updateDetailShow={this.updateDetailShow}
          updateIsbtnShow={this.updateDetailShow}
          play={this.play}
          isbtnShow={isbtnShow}
          Musiclyric={Musiclyric}
          currentTime={currentTime}
        />
      </>
    );
  }
}

export default Footer;
