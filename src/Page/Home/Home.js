import React, { useState, useEffect } from "react";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { BsSun } from "react-icons/bs";
import { BsCloudHazeFill } from "react-icons/bs";
import Table from "react-bootstrap/Table";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Switch } from "antd";
import { db } from "../firebase";
import { uid } from "uid";
import { set, ref, onValue, update, remove } from "firebase/database";
import Post from "../Post";
var InTem = 0,
  InHum = 0,
  InLux = 0,
  SetHum = 0,
  SetTem = 0,
  SetHr = 0,
  SetMin = 0;
const Home = (props) => {
  const [todo, setTodo] = useState();
  const [todos, setTodos] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [GetSw, setGetSw] = useState();
  const START_IO = "START_IO";
  const data1 = false;

  //read
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setTodos([]);
      const data = snapshot.val();
      InTem = data.Fram.TemF;
      if (InTem <= 0) {
        InTem = 0;
      }
      InHum = data.Fram.HumF;
      if (InHum >= 200) {
        InHum = 0;
      }
      InLux = data.Fram.LuxF;
      SetTem = data.Day_Add.Tem;
      SetHum = data.Day_Add.Hum;
      SetHr = data.Day_Add.Hr;
      SetMin = data.Day_Add.Min;
      setGetSw(data.START_IO.Swh);

      if (data !== null) {
        Object.values(data).map((todo) => {
          setTodos((oldArray) => [...oldArray, todo]);
        });
      }
    });
  }, []);
  const [Swh, setDisabled1] = useState(GetSw);

  const toggle1 = () => {
    var getStateSw;
    if (Swh == true) {
      getStateSw = 1;
      update(ref(db, `/${START_IO}`), {
        getStateSw,
      });
    } else {
      getStateSw = 0;
      update(ref(db, `/${START_IO}`), {
        getStateSw,
      });
    }
    setDisabled1(!GetSw);
    update(ref(db, `/${START_IO}`), {
      Swh,
    });
  };
  const Dry_Add = "Day_Add";
  const Reset_val = () => {
    var Hum = 0;
    var Tem = 0;
    var Hr = 0;
    var Min = 0;
    update(ref(db, `/${Dry_Add}`), {
      Hum,
      Tem,
      Hr,
      Min,
    });
  };
  // const ref = db.ref("/IO");
  // ref.on("value", snapshot => {
  // const data1 = snapshot.val()
  // console.log(data1)
  // });

  //write
  // const writeToDatabase = () => {
  //   const uuid = uid();
  //   set(ref(db, `/${uuid}`), {
  //     todo,
  //     uuid,
  //   });

  //   setTodo("");
  // };

  //update
  const handleUpdate = (todo) => {
    setIsEdit(true);
    // setTempUuid(todo.uuid);
    setTodo(todo.todo);
  };

  //delete
  const handleDelete = (todo) => {
    remove(ref(db, `/${todo.uuid}`));
  };

  //   const stop = () => {
  //     io1 = "stop";
  //     update(ref(db, `/IO`), {   //child
  //           io1,
  //     });

  // }

  return (
    <div>
      <Card style={{ height: "28.5rem", width: "100%" }}>
        <BsSun className="Sun" />

        <Card.Body>Drying</Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            <p style={{ textAlign: "left" }}> Weather in the Dried house</p>
            <ButtonGroup aria-label="Basic example" size="lg">
              <Button variant="outline-info">{InHum}%</Button>
              <Button variant="outline-danger">{InTem}C</Button>
              <Button variant="outline-warning">{InLux}L</Button>
            </ButtonGroup>
          </ListGroup.Item>
          <ListGroup.Item>
            <div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <td>Hum</td>
                    <td>Tem</td>
                    <td>Time</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{SetHum + "%"}</td>
                    <td>{SetTem + "C"}</td>
                    <td>
                      {SetHr + ":"}
                      {SetMin}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <Switch checked={GetSw} onClick={toggle1}
           checkedChildren="Start"
           unCheckedChildren="Stop"
          /> 
          <div style={{ textAlign: "right" }}>
              <button onClick={Reset_val}>Reset</button>
            </div>
          </ListGroup.Item>
        </ListGroup>
       
      </Card>
      <Post />
      <br/>
      <br/>
      <br/>
    </div>
  );
};

export default Home;
