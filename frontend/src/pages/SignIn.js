import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Row, Col, Typography, Form, Input, Modal } from "antd";

const { Title } = Typography;

export default class SignIn extends Component {
  constructor() {
    super();
    this.state = { loading: false };
  }
  render() {
    const { confirm } = Modal;
    const showConfirm = (item) => {
      confirm({
        title: item.type,
        content: item.message,
        icon: null,
        onOk() {},
        onCancel() {},
      });
    };
    const onFinish = (values) => {
      console.log("Success:", values);
      signIn(values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    const setCookie = (cname, cvalue) => {
      const d = new Date();
      d.setTime(d.getTime() + 10 * 60 * 1000);
      let expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    };
    const signIn = (formData) => {
      console.log(formData);
      this.setState({ ...this.state, loading: true });
      axios
        .post("http://localhost:5000/api/sign-in", formData)
        .then(({ data }) => {
          console.log("Success:", data);
          if (data._id) {
            setCookie("access_token", data.token);
            this.props.history.push("/home");
            return;
          }
          showConfirm(data);
          this.setState({ ...this.state, loading: false });
        })
        .catch((error) => {
          console.error("Error:", error);
          this.setState({ ...this.state, loading: false });
        });
    };
    return (
      <>
        <Row
          gutter={[24, 0]}
          justify="space-around"
          align="middle"
          style={{ height: "100vh" }}
        >
          <Col
            xs={{ span: 24, offset: 0 }}
            lg={{ span: 6, offset: 2 }}
            md={{ span: 12 }}
          >
            <Title className="mb-15">Sign In</Title>
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
              className="row-col"
            >
              <Form.Item
                className="username"
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your Email!",
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item
                className="username"
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your Password!",
                  },
                ]}
              >
                <Input placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  SIGN IN
                </Button>
              </Form.Item>
              <p className="font-semibold text-muted">
                Don't have an account?{" "}
                <Link to="/sign-up" className="text-dark font-bold">
                  Sign Up
                </Link>
              </p>
            </Form>
          </Col>
        </Row>
      </>
    );
  }
}
