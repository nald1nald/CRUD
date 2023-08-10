import React from 'react'
import "../app.css"
import { AiOutlineClose } from 'react-icons/ai'

const Form = ({handleSubmit, handleOnChange, handleClose, rest}) => {
  
  return (
    <div className="addContainer">
                <form onSubmit={handleSubmit}>
                  <div className="close-btn" onClick={(handleClose)}>
                    <AiOutlineClose />
                    </div>

                  <label htmlFor="firstName">First Name: </label>
                  <input type="text" name="firstName" id="firstName" onChange={handleOnChange} value={rest.firstName}/>

                  <label htmlFor="lastName">Last Name: </label>
                  <input type="text" name="lastName" id="lastName" onChange={handleOnChange} value={rest.lastName}/>

                  <label htmlFor="email">Email: </label>
                  <input type="email" name="email" id="email" onChange={handleOnChange} value={rest.email}/>

                  <button className="btn">Submit</button>
                </form>
              </div>
  )
}

export default Form
