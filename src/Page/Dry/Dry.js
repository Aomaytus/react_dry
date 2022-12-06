import React, { useState, useEffect } from "react";
import Slider from 'react-input-slider';
import { Routes, Route, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

import Button from "react-bootstrap/Button";
import { db } from "../firebase";
import Home from "../Home/Home";
import { set, ref, onValue, update, remove } from "firebase/database";
import { CgAdd } from "react-icons/cg";
import { BsFillDropletFill } from "react-icons/bs";
import { FaTemperatureLow } from "react-icons/fa";
import { BsFillAlarmFill } from "react-icons/bs";
var Te, Hu, H, M;
var io1 = 'Start';


function Add_Tem() {
      const i = 50
      const [state, setState] = useState({ x: i });
      return (
            <div>
                  <FaTemperatureLow className='Hu' /> : {Te = state.x} C
                  <br />
                  <Slider
                        styles={{
                              active: {
                                    backgroundColor: 'red'
                              }
                        }}
                        axis="x"
                        xmin={30}
                        xmax={70}
                        x={state.x}

                        onChange={({ x }) => setState(state => ({ ...state, x, }))}
                  />
            </div>
      )
}
const Add_Hum = () => {

      const [state, setState] = useState({ x: 50 });
      return (
            <div>
                  <BsFillDropletFill className='Te' /> : {Hu = state.x} %
                  <br />
                  <Slider


                        axis="x"
                        xmin={30}
                        xmax={70}
                        x={state.x}

                        onChange={({ x }) => setState(state => ({ ...state, x, }))}
                  />


            </div>
      )
};



const Add_Time = () => {

      const [state, setState] = useState({ x: 4 });

      return (
            <div>
                  <BsFillAlarmFill className='Ti' />
                  <br />
                  Hour : {H = state.x}
                  <br />
                  <Slider

                        styles={{
                              active: {
                                    backgroundColor: 'green'
                              }
                        }}
                        axis="x"
                        xmin={0}
                        xmax={8}
                        x={state.x}



                        onChange={({ x }) => setState(state => ({ ...state, x, }))}

                  />




            </div>
      )
}

const Add_Time_M = () => {

      const [state, setState] = useState({ x: 30 });
      return (
            <div >
                  Minute : {M = state.x}
                  <br />
                  <Slider
                        styles={{
                              active: {
                                    backgroundColor: 'green'
                              }
                        }}
                        axis="x"
                        xmin={1}
                        xmax={60}
                        x={state.x}
                        onChange={({ x }) => setState(state => ({ ...state, x, }))}
                  />


            </div>
      )
}
const Dry = (props) => {
  const i=50
  const [state, setState] = useState({ x:i });
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setTodos([]);
      const data = snapshot.val();

      if (data !== null) {
        Object.values(data).map((todo) => {
          setTodos((oldArray) => [...oldArray, todo]);
        });
      }
    });
  }, []);
  const Dry_Add = "Day_Add";
  const START_IO = "START_IO";
  const Swh = true;
  const Day_banana = () => {
    var Hum = 50;
    var Tem = 35;
    var Hr = 6;
    var Min = 30;
   
    update(ref(db, `/${Dry_Add}`), {
      Hum,
      Tem,
      Hr,
      Min,
    });

    update(ref(db, `/${START_IO}`), {
      Swh,
    });
  };
  const Dry_Pig = () => {
    var Hum = 50;
    var Tem = 40;
    var Hr = 8;
    var Min = 20;
    update(ref(db, `/${Dry_Add}`), {
      Hum,
      Tem,
      Hr,
      Min,
    });
    update(ref(db, `/${START_IO}`), {
      Swh,
    });
  };
  function start() {

    update(ref(db, `/Add`), {   //child
          Te, Hu, H, M,
    }
    )
    update(ref(db, `/IO`), {   //child
          io1,
    })
}
  return (
    <>
      <div>
        <>
          <br />
          <Routes>
            <Route path="Home1" element={<Home />} />
            <Route path="Home2" element={<Home />} />
          </Routes>
          <div></div>
        </>
        <button className="bt_Dry">
          <Card style={{ width: "21rem" }}>
            <Card.Img
              variant="light"
              src="https://cf.shopee.co.th/file/8e4485b7b2bac2cabbc637dbfe2d7525"
            />
            <Card.Body>
              <Card.Title>Dried bananas</Card.Title>
              <Card.Text style={{ textAlign: "left", fontSize: 20 }}>
                Drying temperature that's right
                <br />
                Temperature Not lower than 30 C <br />
                Humidity not higher than 50 %.
                <br />
                Drying time about 6-8 hours.
              </Card.Text>
              <Link to="/">
                <Button variant="primary" onClick={Day_banana}>
                  Drying
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </button>
        <button className="bt_Dry">
          <Card style={{ width: "21rem" }}>
            <Card.Img
              variant="top"
              src="https://i0.wp.com/www.raikaset.net/wp-content/uploads/2020/05/%E0%B8%AB%E0%B8%A1%E0%B8%B9%E0%B9%81%E0%B8%94%E0%B8%94%E0%B9%80%E0%B8%94%E0%B8%B5%E0%B8%A2%E0%B8%A7002-20200513.jpg?resize=400%2C400&ssl=1"
            />
            <Card.Body>
              <Card.Title>Dried pork</Card.Title>
              <Card.Text style={{ textAlign: "left", fontSize: 20 }}>
                Drying temperature that's right <br />
                Temperature Not lower than 35 C <br />
                Humidity not higher than 50 %.
                <br />
                Drying time about 8 hours.
              </Card.Text>
              <Link to="/">
                <Button variant="primary" onClick={Dry_Pig}>
                  Drying
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </button>
        <Add_Tem />
                  <Add_Hum /> <br />
                  <Add_Time />
                  <Add_Time_M />
                  <CgAdd className='Add_OK' onClick={start}>

</CgAdd>
      </div>
      <br />
      <br />
      <br />
      
    </>
  );
};

export default Dry;
