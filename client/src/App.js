import { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [carName, setcarName] = useState("");
  const [description, setDescription] = useState("");
  const [carList, setCarList] = useState([]);
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:8000/api/get").then((response) => {
      setCarList(response.data);
    });
  }, []);

  const submitCarReview = () => {
    Axios.post("http://localhost:8000/api/insert", {
      carName: carName,
      carDescription: description,
    });

    setCarList([...carList, { carName: carName, carDescription: description }]);
  };

  const deleteCar = (car) => {
    Axios.delete(`http://localhost:8000/api/delete/${car}`);
    alert("Deleted refhresh page");
  };

  const updateCar = (car) => {
    Axios.put("http://localhost:8000/api/update", {
      carName: car,
      carDescription: newDescription,
    });
  };

  return (
    <div className="App">
      <h1>CRUD with React Node MySql</h1>
      <div className="form">
        <label>Car Name</label>
        <input
          type="text"
          name="carName"
          onChange={(e) => {
            setcarName(e.target.value);
          }}
        />
        <label>Description</label>
        <input
          type="text"
          name="description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <button onClick={submitCarReview}>Submit</button>

        {carList.map((value) => {
          return (
            <div className="card">
              <h1>Car Name: {value.carName}</h1>
              <p>Car Description: {value.carDescription}</p>

              <button
                onClick={() => {
                  deleteCar(value.carName);
                }}
              >
                Delete
              </button>
              <input
                type="text"
                onChange={(e) => {
                  //    setNewDescription(e.target.value);
                }}
              />
              <button /*onClick={updateCar(value.carName)}*/>Update</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
