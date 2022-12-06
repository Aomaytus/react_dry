import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { Switch } from "antd";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { AiFillRobot } from "react-icons/ai";
import { set, ref, onValue, update, remove } from "firebase/database";
const Stat = () => {
  const [todos, setTodos] = useState([]);
  const [StatSw, setStatSw] = useState(false);
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setTodos([]);
      const data = snapshot.val();
      setStatSw(data.START_IO.StartOnline);
      if (data !== null) {
        Object.values(data).map((todo) => {
          setTodos((oldArray) => [...oldArray, todo]);
        });
      }
    });
  }, []);
  const [getStateSw, setgetStateSw] = useState(0);
  
  useEffect(() => {
    setStatSw(false);
    let interval = null;
    interval = setInterval(() => {
      setStatSw((StatSw) => StatSw -1);
      setgetStateSw(StatSw);
      update(ref(db, `/${StatSw}`), {
        getStateSw,
      });
      if (StatSw < 2) {
       
        setStatSw(false);
      }
      else { setStatSw(true);}
    }, 10000);

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
                checkedChildren="ON line"
                unCheckedChildren="Off line"
              />
            </div>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Stat;
