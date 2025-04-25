import React, { useEffect, useState } from "react";
import { authAxios } from "../authaxios/auth/authaxios";
import "../App.css";
const Main = () => {
  const [userData, setUserData] = useState([]);

  const [tableShow, setTableShow] = useState({
    show: false,
    id: null,
  });
  const [ref, setref] = useState(true);
  const [data, setdata] = useState({
    name: "",
    email: "",
  });

  const [udata, setUdata] = useState({
    name: "",
    email: "",
  });

  function GetData() {
    authAxios
      .get("GetData")
      .then((res) => {
        setUserData(res.data);
        //  let show_token  = jwt.decode(token)

        //  {role:"admin"}

        //    show_token.role === "admin" ? (setUserData(res.data)  setTimeout(()=>{
        //        Navigate("/anotherpage")
        //    }) ): (setUserData([])   setTimeout(()=>{navigate("/userpage ")}))
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    GetData();
  }, [ref]);

  const handle = (e) => {
    e.preventDefault();
    console.log(data.name, data.email);

    if (data.name === "" || data.email === "") {
      alert("please fill the data");
    } else {
      // const formData = new FormData();

      // formData.append("name", data.name);
      // formData.append("img", data.img);
      // formData.append("email", data.email);

      let UserdataObject = {
        name: data.name,
        email: data.email,
      };

      authAxios
        .post("createData", UserdataObject)
        .then((res) => {
          console.log(res);
          setref(!ref);
        })
        .catch((err) => {
          console.log(err);
        });
      setdata({ ...data, name: "", email: "" });

      // authAxios
    }
  };

  function deletData(id) {
    authAxios
      .delete(`deleteData/${id}`)
      .then((res) => {
        let userMsg = res.data.msg;
        let userName = res.data.deleted.name;
        alert(`${userName}, ${userMsg}`);
        setref(!ref);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function editData(userValue) {
    console.log(userValue._id, userValue.name, userValue.email);

    setUdata({ ...udata, name: userValue.name, email: userValue.email });
    setTableShow({ ...tableShow, show: true, id: userValue._id });
  }

  function Uhandle(e) {
    e.preventDefault();

    console.log(tableShow.id);

    let updatedata = {
      name: udata.name,
      email: udata.email,
    };

    console.log(updatedata);

    authAxios
      .put(`updateData/${tableShow.id}`, updatedata)
      .then((res) => {
        console.log(res.data);
        setref(!ref);
      })
      .catch((err) => {
        console.log(err);
      });

    setTableShow({ ...tableShow, show: false, id: null });
  }

  return (
    <div>
      <form onSubmit={handle}>
        <input
          type="text"
          placeholder="name"
          value={data.name}
          onChange={(e) => {
            setdata({ ...data, name: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="email"
          value={data.email}
          onChange={(e) => {
            setdata({ ...data, email: e.target.value });
          }}
        />
        <button>click</button>
      </form>

      <table>
        <thead>
          <th>S.no</th>
          <th>Name</th>
          <th>Email</th>
          <th>actions</th>
        </thead>
        <tbody>
          {userData &&
            userData.map((v, i) => {
              let { email, name, _id } = v;

              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>
                    <button
                      onClick={() => {
                        editData(v);
                      }}
                    >
                      edit
                    </button>{" "}
                    <button
                      onClick={() => {
                        deletData(_id);
                      }}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {tableShow.show ? (
        <div>
          <h1> Update Form </h1>
          <form onSubmit={Uhandle}>
            <input
              type="text"
              value={udata.name}
              placeholder="name"
              onChange={(e) => {
                setUdata({ ...udata, name: e.target.value });
              }}
            />
            <input
              type="text"
              value={udata.email}
              placeholder="email"
              onChange={(e) => {
                setUdata({ ...udata, email: e.target.value });
              }}
            />
            <button>Update</button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default Main;
