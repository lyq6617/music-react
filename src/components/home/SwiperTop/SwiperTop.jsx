import React from "react";
import { Space, Swiper } from "antd-mobile";
import "./SwiperTop.scss";
import { getBanner } from "../../../api/home";

class SwiperTop extends React.Component {
  state = {
    banners: [],
  };

  async componentDidMount() {
    let res = await getBanner();
    this.setState({
      banners: res.data.banners,
    });
  }

  render() {
    // console.log(this.state.banners);
    const items = this.state.banners.map((banner, index) => (
      <Swiper.Item key={index}>
        <div className="swiperTop">
          <img src={banner.pic} alt="" />
        </div>
      </Swiper.Item>
    ));

    return (
      <div>
        <Space direction="vertical" block>
          <Swiper
            style={{
              "--border-radius": "8px",
            }}
          >
            {items}
          </Swiper>
        </Space>
      </div>
    );
  }
}

export default SwiperTop;
