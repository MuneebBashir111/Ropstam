import {
  Row,
  Col,
  Card,
  Table,
  Input,
  Select,
  Form,
  Button,
  Modal,
  Space,
} from "antd";
import { useState, useEffect } from "react";
import axios from "axios";

function Tables() {
  const [add, setAdd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const [car, setCar] = useState({
    category: undefined,
    color: "",
    make: "",
    model: "",
    reg_no: "",
  });
  const columns = [
    {
      title: "CATAGORIES",
      dataIndex: "category",
      width: "32%",
    },
    {
      title: "REG NO",
      dataIndex: "reg_no",
    },
    {
      title: "MAKE",
      dataIndex: "make",
    },
    {
      title: "MODEL",
      dataIndex: "model",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.model - b.model,
    },
    {
      title: "Color",
      dataIndex: "color",
    },
    {
      title: "Action",
      align: "end",
      render: (item) => (
        <Space size="middle">
          <a onClick={() => onAdd(item)}>Edit</a>
          <a onClick={() => showPromiseConfirm(item)}>Delete</a>
        </Space>
      ),
    },
  ];
  const getCars = () => {
    axios("http://localhost:5000/api/car").then(
      (response) => {
        setCars(response.data);
        setLoading(false);
      },
      (err) => {
        console.log(err);
        setLoading(false);
      }
    );
  };
  const addCar = (formData) => {
    console.log(formData);
    setLoading(true);
    axios
      .post("http://localhost:5000/api/car", formData)
      .then((data) => {
        console.log("Success:", data);
        getCars();
        setAdd(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const updateCar = (formData) => {
    console.log(formData);
    setLoading(true);
    axios
      .put("http://localhost:5000/api/car", formData)
      .then((data) => {
        console.log("Success:", data);
        getCars();
        setAdd(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const { confirm } = Modal;
  const showPromiseConfirm = (item) => {
    confirm({
      title: "Are you sure?",
      content: "You want to Delete the car?",
      icon: null,
      onOk() {
        return new Promise((resolve, reject) => {
          deleteCar(item._id, resolve, reject);
        }).catch(() => console.log("Oops errors!"));
      },
      onCancel() {},
    });
  };
  const deleteCar = (id, resolve, reject) => {
    setLoading(true);
    axios
      .post("http://localhost:5000/api/deletecar", { id: id })
      .then((data) => {
        console.log("Success:", data);
        getCars();
        resolve();
      })
      .catch((error) => {
        console.error("Error:", error);
        reject();
      });
  };
  const onFinish = (values) => {
    values.category = values.category.value;
    if (car._id) {
      values._id = car._id;
      updateCar(values);
    } else {
      addCar(values);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onAdd = (item) => {
    console.log(item);
    if (item) {
      setCar(item);
    } else {
      reset();
    }

    setTimeout(() => {
      setAdd(true);
    });
  };
  const reset = () => {
    setCar({
      category: "Sedan",
      color: "",
      make: "",
      model: "",
      reg_no: "",
    });
  };
  useEffect(() => {
    getCars();
  }, []);
  return (
    <>
      <div className="tabled">
        {add ? (
          <Row gutter={[24, 0]} justify="start" align="middle">
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 10, offset: 3 }}
              md={{ span: 12 }}
            >
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="row-col"
              >
                <Form.Item
                  className="username"
                  label="Categories"
                  name="category"
                  initialValue={{
                    value: car.category,
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please select car's Category!",
                    },
                  ]}
                >
                  <Select
                    labelInValue
                    placeholder="Select"
                    style={{ borderRadius: "4px" }}
                    options={[
                      {
                        value: "Hatchback",
                        label: "Hatchback",
                      },
                      {
                        value: "Sedan",
                        label: "Sedan",
                      },
                      {
                        value: "SUV",
                        label: "SUV",
                      },
                      {
                        value: "MUV",
                        label: "MUV",
                      },
                      {
                        value: "Coupe",
                        label: "Coupe",
                      },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  className="username"
                  label="Registration Number"
                  name="reg_no"
                  initialValue={car.reg_no}
                  rules={[
                    {
                      required: true,
                      message: "Please enter car's Registration Number!",
                    },
                  ]}
                >
                  <Input placeholder="Registration Number" />
                </Form.Item>
                <Form.Item
                  className="username"
                  label="Make"
                  name="make"
                  initialValue={car.make}
                  rules={[
                    {
                      required: true,
                      message: "Please enter car's Make!",
                    },
                  ]}
                >
                  <Input placeholder="Make" />
                </Form.Item>
                <Form.Item
                  className="username"
                  label="Model"
                  name="model"
                  initialValue={car.model}
                  rules={[
                    {
                      required: true,
                      message: "Please enter car's Model!",
                    },
                  ]}
                >
                  <Input placeholder="Model" />
                </Form.Item>
                <Form.Item
                  className="username"
                  label="Color"
                  name="color"
                  initialValue={car.color}
                  rules={[
                    {
                      required: true,
                      message: "Please enter car's Color!",
                    },
                  ]}
                >
                  <Input placeholder="Color" />
                </Form.Item>
                <Form.Item>
                  <Row justify="space-around">
                    <Button
                      type="defult"
                      style={{ width: "45%", marginRight: "10px" }}
                      onClick={() => setAdd(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      style={{ width: "45%" }}
                    >
                      Submit
                    </Button>
                  </Row>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        ) : (
          <Row gutter={[24, 0]}>
            <Col xs="24" xl={24}>
              <Card
                bordered={false}
                style={{
                  paddingRight: "20px",
                }}
                className="criclebox tablespace mb-24"
                title="Registered Cars"
                extra={
                  <>
                    <Button
                      style={{
                        padding: "0 20px",
                        fontSize: "16px",
                        fontWeight: "200",
                        marginBottom: "24px",
                      }}
                      type="primary"
                      onClick={() => onAdd(null)}
                    >
                      Add New
                    </Button>
                  </>
                }
              >
                <div className="table-responsive">
                  <Table
                    columns={columns}
                    dataSource={cars}
                    pagination={true}
                    loading={loading}
                    rowKey="_id"
                    className="ant-border-space"
                  />
                </div>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
}

export default Tables;
