/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Checkbox,
  Modal,
} from "antd";

const { Title } = Typography;

export default class SignIn extends Component {
  constructor() {
    super();
    this.state = { isAgree: false, loading: false };
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
      signUp(values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    const signUp = (formData) => {
      console.log(formData);
      this.setState({ ...this.state, loading: true });
      axios
        .post("http://localhost:5000/api/sign-up", formData)
        .then((data) => {
          console.log("Success:", data);
          showConfirm(data.data);
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
            <Title className="mb-15">Sign Up</Title>
            {/* <Title className="font-regular text-muted" level={5}>
              Enter information below to sign up
            </Title> */}
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
              className="row-col"
            >
              <Form.Item
                className="username"
                label="First Name"
                name="first_name"
                rules={[
                  {
                    required: true,
                    message: "Please enter your First Name!",
                  },
                ]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
              <Form.Item
                className="username"
                label="Last Name"
                name="last_name"
                rules={[
                  {
                    required: true,
                    message: "Please enter your Last Name!",
                  },
                ]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
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
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox
                  checked={this.state.isAgree}
                  onChange={(e) =>
                    this.setState({
                      ...this.state,
                      isAgree: !this.state.isAgree,
                    })
                  }
                >
                  I agree the{" "}
                  <a href="#pablo" className="font-bold text-dark">
                    Terms and Conditions
                  </a>
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                  disabled={!this.state.isAgree}
                  loading={this.state.loading}
                >
                  SIGN UP
                </Button>
              </Form.Item>
              <p className="font-semibold text-muted">
                Already have an account?{" "}
                <Link to="/sign-in" className="text-dark font-bold">
                  Sign In
                </Link>
              </p>
            </Form>
          </Col>
        </Row>
      </>
    );
  }
}
