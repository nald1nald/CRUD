import React from 'react';
import '../app.css';
import { AiOutlineClose } from 'react-icons/ai';

const CarForm = ({ handleCarSubmit, handleCarOnChange, handleClose, rest }) => {

    
  
  return (
    <div className="addContainer">
      <form onSubmit={handleCarSubmit}>
        <div className="close-btn" onClick={handleClose}>
          <AiOutlineClose />
        </div>
        
        <h3>Customer: {rest._id}</h3>
        <label htmlFor="brand">Brand: </label>
        <input type="text" name="brand" id="brand" onChange={handleCarOnChange} value={rest.brand} />

        <label htmlFor="model">Model: </label>
        <input type="text" name="model" id="model" onChange={handleCarOnChange} value={rest.model} />

        <label htmlFor="year">Year: </label>
        <input type="number" name="year" id="year" onChange={handleCarOnChange} value={rest.year} />

        <button className="btn" type="submit">
            Add Car
        </button>
      </form>
    </div>
  );
};

export default CarForm;
