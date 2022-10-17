import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Setting from "../Setting/Setting";
import { db } from "../firebase";
import { uid } from "uid";
import {
  set,
  ref,
  onValue,
  remove,
  update,
  getDatabase,
  get,
  child,
} from "firebase/database";
const Warn = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [getStateSw1, setStateSw1] = useState([]);
  const [getStateSw2, setStateSw2] = useState([]);
  const [getStateSw3, setStateSw3] = useState([]);
  const [getStateSw4, setStateSw4] = useState([]);
  const [getStateSw5, setStateSw5] = useState([]);
  const [getStateSw6, setStateSw6] = useState([]);
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setTodos([]);
      const data = snapshot.val();
      setStateSw1(data.START_IO.getStateSw1);
      setStateSw2(data.START_IO.getStateSw2);
      setStateSw3(data.START_IO.getStateSw3);
      setStateSw4(data.START_IO.getStateSw4);
      setStateSw5(data.START_IO.getStateSw5);
      setStateSw6(data.START_IO.getStateSw6);
      // device_cout=(data.START_IO.device_cout);
      console.log("data", data.Ad1);
      if (data !== null) {
        Object.values(data).map((todo) => {
          setTodos((oldArray) => [...oldArray, todo]);
        });
      }
    });
  }, []);
  return (
    <div style={{ backgroundColor: "white" }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Equipment</th>
            <th>Status ON</th>
            <th>Status OFF</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Heater</td>
            <td>{getStateSw1 + getStateSw2 + getStateSw3 + getStateSw4}</td>
            <td>{4 - (getStateSw1 + getStateSw2 + getStateSw3 + getStateSw4)}</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Fan</td>
            <td>{getStateSw5 + getStateSw6 }</td>
            <td>{2-(getStateSw5 + getStateSw6) }</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Sensor DHT</td>
            <td>2</td>
            <td>0</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Sensor Light </td>
            <td>2</td>
            <td>0</td>
          </tr>
        </tbody>
      </Table>
      <br />
      <Setting />
    </div>
  );
};

export default Warn;
