import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Exercise = (props) => {
  return (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0, 10)}</td>
      <td>
        <Link to={"/edit/" + props.exercise._id}>edit</Link> |{" "}
        <a href="#" onClick={() => props.deleteExercise(props.exercise._id)}>
          delete
        </a>
      </td>
    </tr>
  );
};

function ExercisesList() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises/")
      .then((response) => {
        setExercises(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  //console.log(exercises);

  const deleteExercise = (id) => {
    axios.delete("http://localhost:5000/exercises/" + id).then((response) => {
      console.log(response.data);
    });

    setExercises(exercises.filter((el) => el._id !== id));
  };

  const ListExercise = () => {
    return exercises.map((currExercise) => {
      return (
        <Exercise
          exercise={currExercise}
          deleteExercise={deleteExercise}
          key={currExercise._id}
        />
      );
    });
  };

  return (
    <div>
      <h3>Logged Exercies</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{ListExercise()}</tbody>
      </table>
    </div>
  );
}

export default ExercisesList;
