import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { db } from "../firebase";
import { set, ref, onValue, update, remove } from "firebase/database";

const Dry = () => {
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
  const Swh= true;
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
      Swh
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
      Swh
    });
  };
  return (
    <>
      <div>
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
              <Button variant="primary" onClick={Day_banana}>Drying</Button>
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
              <Button variant="primary" onClick={Dry_Pig}>Drying</Button>
            </Card.Body>
          </Card>
        </button>
      </div>
      <br />
      <br />
      <br />
    </>
  );
};

export default Dry;
