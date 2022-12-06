import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Home from "../Home/Home";
import Dry from "../Dry/Dry";

import Warn from "../Warn/Warn";
import OutDry from "../Home/OutDry";
import Stat from "./Navbar_tob";
import { Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import INpost from "../INpost";
function Navber(props) {
  const [Bt1, SetBt1] = useState("Navber_btOver");
  const [Bt2, SetBt2] = useState("Navber_bt");
  const [Bt3, SetBt3] = useState("Navber_bt");
  const StBt1 = () => {
    SetBt1("Navber_btOver");
    SetBt2("Navber_bt");
    SetBt3("Navber_bt");
  };
  const StBt2 = () => {
    SetBt2("Navber_btOver");
    SetBt1("Navber_bt");
    SetBt3("Navber_bt");
  };
  const StBt3 = () => {
    SetBt3("Navber_btOver");
    SetBt1("Navber_bt");
    SetBt2("Navber_bt");
  };
  useEffect(() => {});
 
  return (
    <>
      <Stat />
      <br />
      <br />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Dry" element={<Dry />} />
        <Route path="Warn" element={<Warn />} />
        <Route path="OutDry" element={<OutDry />} />
      </Routes>

      <div>
        <Navbar
          fixed="bottom"
          collapseOnSelect
          bg="dark"
          variant="dark"
          className="Navber_sty"
        >
          <Navbar.Brand href="#home"></Navbar.Brand>
          <Nav className="Navber_sty">
            <Link to="/">
              <Nav.Link href="#home">
                <button className={Bt1} onClick={StBt1}>
                  Home <INpost/>
                </button>{" "}
              </Nav.Link>
            </Link>
            <Link to="/Dry">
              <Nav.Link href="#features">
                <button className={Bt2} onClick={StBt2}>
                  Dry
                </button>{" "}
              </Nav.Link>
            </Link>
            <Link to="/Warn">
              <Nav.Link href="#features">
                <button className={Bt3} onClick={StBt3}>
                  Warn
                </button>{" "}
              </Nav.Link>
            </Link>
          </Nav>
        </Navbar>
      </div>
    </>
  );
}

export default Navber;
