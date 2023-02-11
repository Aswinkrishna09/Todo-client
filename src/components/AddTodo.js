import { Button, Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { AddTodos } from "../API/apis";

const AddTodo = ({ modalOpen, setModalOpen }) => {
  const [taskname, setTaskName] = useState("");
  const [comment, setComment] = useState("");
  const [disable, setDisable] = useState();

  useEffect(() => {
    if (taskname.length > 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
    if (comment.length > 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [taskname, comment]);

  const finddate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = dd + "/" + mm + "/" + yyyy;
    return formattedToday;
  };

  const onFinish = async () => {
    let obj = {
      taskname,
      comment,
      date: finddate(),
    };
    console.log(obj);
    const res = await AddTodos(obj);
    setModalOpen(false);
    window.location.reload();
  };
  return (
    <Modal
      title={"Add Todo"}
      style={{
        top: 20,
      }}
      footer={false}
      open={modalOpen}
      onCancel={()=>setModalOpen(false)}
    >
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Task Name"
          name="taskname"
          rules={[
            {
              required: true,
              message: "Please input your Task Name!",
            },
          ]}
        >
          <Input
            value={taskname}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Comment"
          name="comment"
          rules={[
            {
              required: true,
              message: "Please input your Comment!",
            },
          ]}
        >
          <Input value={comment} onChange={(e) => setComment(e.target.value)} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 20,
            span: 8,
          }}
        >
          <Button disabled={disable} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTodo;
