import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { Switch } from "antd";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { AiFillRobot } from "react-icons/ai";
import { set, ref, onValue, update, remove } from "firebase/database";
const Stat = () => {
  const [todos, setTodos] = useState([]);
  const [StatSw, setStatSw] = useState([]);
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setTodos([]);
      const data = snapshot.val();
      setStatSw(data.START_IO.getStateSw);
      if (data !== null) {
        Object.values(data).map((todo) => {
          setTodos((oldArray) => [...oldArray, todo]);
        });
      }
    });
  }, []);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      setStatSw(true);
      setSeconds((seconds) => seconds + 1);
      if (seconds > 2) {
        setSeconds(0);
        setStatSw(false);
      }
    }, 1000);

    return () => clearInterval(interval);
    // return () => clearInterval(interval1);
  });

  return (
    <>
      <Navbar fixed="top" className="tob_Navber">
        <Container>
          <Navbar.Brand href="#home" style={{fontFamily:"Franklin Gothic Medium",fontSize:25}}>Drying </Navbar.Brand>
          <Nav>
            <div className="tob_Navber_icon">
              <AiFillRobot />
              <Switch
                checked={StatSw}
                checkedChildren="ON"
                unCheckedChildren="OFF"
              />
            </div>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Stat;
