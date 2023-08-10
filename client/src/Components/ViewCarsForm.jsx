import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';

const ViewCarsForm = ({ handleClose, carData }) => {
    const [editedCarData, setEditedCarData] = useState({
        brand: '',
        model: '',
        year: '',
      });
    
      useEffect(() => {
        async function fetchCarRecord() {
          try {
            const response = await axios.get(`/cars/${carData._id}`);
            const responseData = response.data;
    
            if (responseData.success) {
              const carRecord = responseData.data;
              setEditedCarData({
                brand: carRecord.brand,
                model: carRecord.model,
                year: carRecord.year,
              });
            } else {
              alert('Error fetching car record');
            }
          } catch (error) {
            alert('Error fetching car record');
          }
        }
    
        fetchCarRecord();
      }, [carData._id]);

  console.log(carData)

  const handleCarDelete = async () => {
    try {
      const response = await axios.delete(`/cars/${carData._id}`);
      const responseData = response.data;

      if (responseData.success) {
        alert(responseData.message);
        handleClose();
      } else {
        alert("Error deleting car record");
      }
    } catch (error) {
      alert("Error deleting car record");
    }
  };

  const handleCarEdit = async () => {
    try {
      const response = await axios.put(`/cars/${carData._id}`, editedCarData);
      const responseData = response.data;

      if (responseData.success) {
        alert(responseData.message);
        handleClose();
      } else {
        alert("Error editing car record");
      }
    } catch (error) {
      alert("Error editing car record");
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="addContainer">
      <form>
        <div className="close-btn" onClick={handleClose}>
          <AiOutlineClose />
        </div>

        <label htmlFor="CustomerID">Name: {carData.firstName} {carData.lastName}</label>
        <label htmlFor="CustomerID">Email: {carData.email}</label>
        <label htmlFor="CustomerID" style={{marginBottom:"10px"}}>Car ID: {carData._id}</label>

        <label htmlFor="brand">Brand: </label>
        <input type="text" name="brand" id="brand" value={editedCarData.brand} onChange={handleEditChange} />

        <label htmlFor="model">Model: </label>
        <input type="text" name="model" id="model" value={editedCarData.model} onChange={handleEditChange} />

        <label htmlFor="year">Year: </label>
        <input type="number" name="year" id="year" value={editedCarData.year} onChange={handleEditChange} />

        <button className="btn btn-edit" type="button" onClick={handleCarEdit}>
          Save Edit
        </button>
        <button className="btn btn-delete" type="button" onClick={handleCarDelete}>
          Delete
        </button>
      </form>
      
    </div>
  );
};

export default ViewCarsForm;
