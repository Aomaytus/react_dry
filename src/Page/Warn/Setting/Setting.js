import React, { useState, useEffect } from "react";
import { Switch } from "antd";
import { Card } from "antd";
import { db } from "../../firebase";
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

const Setting = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUuid, setTempUuid] = useState("");
  const [GetSw1, setGetSw1] = useState([]);
  const [GetSw2, setGetSw2] = useState([]);
  const [GetSw3, setGetSw3] = useState([]);
  const [GetSw4, setGetSw4] = useState([]);
  const [GetSw5, setGetSw5] = useState([]);
  const [GetSw6, setGetSw6] = useState([]);
  const START_IO = "START_IO";
  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  };
  //read
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setTodos([]);
      const data = snapshot.val();
      setGetSw1(data.START_IO.Swh1);
      setGetSw2(data.START_IO.Swh2);
      setGetSw3(data.START_IO.Swh3);
      setGetSw4(data.START_IO.Swh4);
      setGetSw5(data.START_IO.Swh5);
      setGetSw6(data.START_IO.Swh6);
      if (data !== null) {
        Object.values(data).map((todo) => {
          setTodos((oldArray) => [...oldArray, todo]);
        });
      }
    });
  }, []);
  const [Swh1, setDisabled1] = useState(GetSw1);
  const [Swh2, setDisabled2] = useState(GetSw2);
  const [Swh3, setDisabled3] = useState(GetSw3);
  const [Swh4, setDisabled4] = useState(GetSw4);
  const [Swh5, setDisabled5] = useState(GetSw5);
  const [Swh6, setDisabled6] = useState(GetSw6);

  const toggle1 = () => {
    var getStateSw1;
    if (Swh1 == true) {
      getStateSw1 = 1;
      update(ref(db, `/${START_IO}`), {
        getStateSw1,
      });
    } else {
      getStateSw1 = 0;
      update(ref(db, `/${START_IO}`), {
        getStateSw1,
      });
    }
    setDisabled1(!GetSw1);
    update(ref(db, `/${START_IO}`), {
      Swh1,
      // getStateSw1,
    });
  };
  const toggle2 = () => {
    var getStateSw2;
    if (Swh2 == true) {
      getStateSw2 = 1;
      update(ref(db, `/${START_IO}`), {
        getStateSw2,
      });
    } else {
      getStateSw2 = 0;
      update(ref(db, `/${START_IO}`), {
        getStateSw2,
      });
    }
    setDisabled2(!GetSw2);
    update(ref(db, `/${START_IO}`), {
      Swh2,
    });
  };
  const toggle3 = () => {
    var getStateSw3;
    if (Swh3 == true) {
      getStateSw3 = 1;
      update(ref(db, `/${START_IO}`), {
        getStateSw3,
      });
    } else {
      getStateSw3 = 0;
      update(ref(db, `/${START_IO}`), {
        getStateSw3,
      });
    }
    setDisabled3(!GetSw3);
    update(ref(db, `/${START_IO}`), {
      Swh3,
    });
  };
  const toggle4 = () => {
    var getStateSw4;
    if (Swh4 == true) {
      getStateSw4 = 1;
      update(ref(db, `/${START_IO}`), {
        getStateSw4,
      });
    } else {
      getStateSw4 = 0;
      update(ref(db, `/${START_IO}`), {
        getStateSw4,
      });
    }
    setDisabled4(!GetSw4);
    update(ref(db, `/${START_IO}`), {
      Swh4,
    });
  };
  const toggle5 = () => {
    var getStateSw5;
    if (Swh5 == true) {
      getStateSw5 = 1;
      update(ref(db, `/${START_IO}`), {
        getStateSw5,
      });
    } else {
      getStateSw5 = 0;
      update(ref(db, `/${START_IO}`), {
        getStateSw5,
      });
    }
    setDisabled5(!GetSw5);
    update(ref(db, `/${START_IO}`), {
      Swh5,
    });
  };
  const toggle6 = () => {
    var getStateSw6;
    if (Swh6 == true) {
      getStateSw6 = 1;
      update(ref(db, `/${START_IO}`), {
        getStateSw6,
      });
    } else {
      getStateSw6 = 0;
      update(ref(db, `/${START_IO}`), {
        getStateSw6,
      });
    }
    setDisabled6(!GetSw6);
    update(ref(db, `/${START_IO}`), {
      Swh6,
    });
  };
  const gridStyle = {
    width: "25%",
    textAlign: "center",
  };
  return (
    <div>
      <Card title="Setting">
        <Card.Grid style={gridStyle}>
          Heater1
          <Switch checked={GetSw1} onClick={toggle1} />
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          Heater2 <Switch checked={GetSw2} onClick={toggle2} />
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          Heater3 <Switch checked={GetSw3} onClick={toggle3} />
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          Heater4 <Switch checked={GetSw4} onClick={toggle4} />
        </Card.Grid>
      </Card>
      <Card>
        <Card.Grid style={gridStyle}>
          Fan heat 
          {/* dissipation */}
           <Switch checked={GetSw5} onClick={toggle5} />
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          Fan ventilate <Switch checked={GetSw6} onClick={toggle6} />
        </Card.Grid>
      </Card>
      <br />

      <br />
      <br />
      <br />
    </div>
  );
};

export default Setting;
