import "./App.css";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "antd";
import Login from "./components/Login";
import { GetTodos } from "./API/apis";
import AddTodo from "./components/AddTodo";

function App() {
  const [todos, setTodos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const call_todos = async () => {
    const todos = await GetTodos();
    console.log("todos ", todos);
    setTodos(todos);
  };
  useEffect(() => {
    call_todos();
  }, []);
  return (
    <Row gutter={16}>
      <Col span={16}>
        <h2>
          Welcome{" "}
          {localStorage.getItem("token") &&
            JSON.parse(localStorage.getItem("user")).name}
        </h2>
      </Col>
      <Col span={8}>
        <Button
          style={{
            background: "green",
            borderColor: "yellow",
            color: "white",
          }}
          onClick={() => setModalOpen(true)}
        >
          AddTodo
        </Button>
        <AddTodo setModalOpen={setModalOpen} modalOpen={modalOpen} />
      </Col>
      <Login />
      {todos.map((data) => (
        <Col md={8}>
          <Card title={data.taskname} bordered={false}>
            Task Id: {data.id}
            <br />
            Date: {data.date}
            <br />
            Comment: {data.comment}
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default App;
