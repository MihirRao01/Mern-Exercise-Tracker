import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function EditExercise() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([""]);

  let temp_array = [];

  const { id } = useParams();

  useEffect(() => {
    axios.get("http://localhost:5000/exercises/" + id).then((response) => {
      setUserName(response.data.username);
      setDescription(response.data.description);
      setDuration(response.data.duration);
      setDate(new Date(response.data.date));
    });

    axios.get("http://localhost:5000/users/").then((res) => {
      if (res.data.length > 0) {
        temp_array = res.data.map((user) => user.username);
        setUsers(temp_array);
      }
    });
  }, []);

  const onChangeUsername = (e) => {
    setUserName(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onChangeDuration = (e) => {
    setDuration(e.target.value);
  };

  const onChangeDate = (newDate) => {
    setDate(newDate);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username: username,
      description: description,
      duration: duration,
      date: date,
    };

    console.log(id);

    axios
      .post("http://localhost:5000/exercises/update/" + id, exercise)
      .then((res) => console.log(res.data));

    console.log(exercise);

    navigate("/");
  };

  return (
    <div>
      <h3>Edit Exercie Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            name="userInput"
            required
            className="form-control"
            value={username}
            onChange={onChangeUsername}
          >
            {users.map(function (user) {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={description}
            onChange={onChangeDescription}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={duration}
            onChange={onChangeDuration}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div style={{ marginBottom: 10 }}>
            <DatePicker selected={date} onChange={onChangeDate} />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default EditExercise;
