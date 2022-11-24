import React, { useState } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import { ReactComponent as BackIcon } from "../../../assets/icons/back.svg";
import { Form, Input, Button, SpinLoading } from "antd-mobile";
import { login, getCode } from "../../../api/item";
import { Context } from "../../../store";

export default class Login extends React.Component {
  static contextType = Context;

  state = {
    wrongReasonIndex: -1,
    wrongReason: ["手机号应以1开头", "第二位不能是0,1,2"],
    phone: "",
    code: "",
    loading: false,
  };

  componentDidMount() {
    this.context.updateStore({
      ...this.context.store,
      isFooterMusicShow: false,
    });
  }
  componentWillUnmount() {
    this.context.updateStore({
      ...this.context.store,
      isFooterMusicShow: true,
    });
  }

  checkInput = (key) => {
    // console.log("checkInput", key);

    let wrongReasonIndex = -1;
    // const reg = /^1[^012][0-9]{9}$/;
    if (key == "") {
      this.setState({ wrongReasonIndex });
      return;
    }

    if (key[0] !== "1") {
      wrongReasonIndex = 0;
    } else if (["0", "1", "2"].includes(key[1])) {
      wrongReasonIndex = 1;
    }

    this.setState({
      wrongReasonIndex,
    });
  };

  onChange = (key) => {
    // this.checkInput(key);
    this.setState(
      {
        phone: key,
      },
      () => {
        console.log(this.state.phone);
      }
    );
  };

  onCodeChange = (code) => {
    this.setState(
      {
        code: code,
      },
      () => {
        console.log(this.state.code);
      }
    );
  };

  toGetCode = () => {
    const { phone } = this.state;
    getCode(phone);
    console.log(phone);
  };

  toLogin = async () => {
    const { phone, code, loading } = this.state;
    this.setState({
      loading: true,
    });

    try {
      await login(phone, code);
      this.context.store.updateIsLogin(true);
      alert("登录成功");
    } catch {
      alert("登录失败");
    } finally {
      this.setState({
        loading: false,
      });
    }
    // router.push("/InfoUser");
  };

  render() {
    const { wrongReason, wrongReasonIndex, phone, loading } = this.state;
    return (
      <>
        <div className="loginTop">
          <Link to={`/`}>
            <BackIcon />
          </Link>
        </div>

        <div className="welcome">欢迎登录</div>

        <Form layout="horizontal">
          <Form.Item label="手机号" name="number">
            <Input
              placeholder="请输入手机号"
              // value={phone}
              clearable
              maxLength="11"
              onChange={(key) => this.onChange(key)}
            />

            {wrongReasonIndex !== -1 ? (
              <span className="wrong">{wrongReason[wrongReasonIndex]}</span>
            ) : (
              ""
            )}
          </Form.Item>

          <Form.Item
            label="短信验证码"
            extra={
              <div className="sendCode">
                <Button color="primary" fill="outline" onClick={this.toGetCode}>
                  发送验证码
                </Button>
              </div>
            }
          >
            <Input
              placeholder="请输入验证码"
              clearable
              onChange={(code) => this.onCodeChange(code)}
            />
          </Form.Item>
        </Form>

        <Button
          className="clickLogin"
          block
          color="primary"
          size="large"
          onClick={this.toLogin}
        >
          点此登录
        </Button>
        {/* <div className='bg'>123456</div> */}

        {loading ? (
          <div className="bg">
            <div className="loading-wrapper">
              <SpinLoading />
              <div className="loading-text">正在加载中，请稍候</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}
