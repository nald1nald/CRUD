import { useEffect, useState } from "react"
import "./app.css"
import axios from 'axios'
import Form from "./Components/Form"
import CarForm from "./Components/CarForm"
import ViewCarsForm from "./Components/ViewCarsForm"
import LoginForm from "./Components/LoginForm"
import RegisterForm from "./Components/RegisterForm"



axios.defaults.baseURL = "http://localhost:5000/api"

function App() {

  const [addDetails, setAddDetails] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editDetails, setEditDetails] = useState(false)
  const [addCarDetails,  setAddCarDetails] = useState(false)
  const [selectedCar, setSelectedCar] = useState(null);
  const [addFormData, setAddFormData] = useState({
    firstName : "",
    lastName: "",
    email : "",
  })

  const [editFormData, setEditFormData] = useState({
    firstName : "",
    lastName: "",
    email : "",
    _id : ""
  })

  const [carFormData, setCarFormData] = useState({
    brand: "",
    model: "",
    year: "",
  });
  

  const [dataList, setDataList] =useState([])
  

  const handleOnChange = (e) => {
    const {value, name} = e.target
    setAddFormData ((prev)=> {
      return{
        ...prev,
        [name] : value
      }
    })
  }

  const handleCarOnChange = (e) => {
    const { name, value } = e.target;
    setCarFormData((prevCarFormData) => ({
      ...prevCarFormData,
      [name]: value
    }));
  };

  const handleAddCar = (cid) => {
    setAddCarDetails(true);
    setCarFormData({
      _id: cid,
      brand: "",
      model: "",
      year: "",
    });
  };

  const handleViewCars = (car) => {
    setSelectedCar(car);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data =  await axios.post('/create', addFormData)
    if(data.data.success){
      setAddDetails(false)
      alert(data.data.message)
      fetchData()
    }
    
  }

  const handleCarSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Car form data:", carFormData);
    try {
      const response = await axios.post(`/cars/${carFormData._id}`, carFormData);
      const responseData = response.data;
  
      if (responseData.success) {
        setAddCarDetails(false);
        alert(responseData.message);
        fetchData(); 
      } else {
        alert("Error creating car record");
      }
    } catch (error) {
      alert("Error creating car record"); 
    }
  };
  

  const fetchData = async() =>{
    const data =  await axios.get('/')
    if(data.data.success){
      setDataList(data.data.data)
    }
  }

  useEffect(()=>{
    fetchData()
  },[])

  useEffect(() => {
    // Check if a token exists in local storage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleDelete = async (id) => {
    const data =  await axios.delete('/delete/'+id)
    if(data.data.success){
      fetchData()
      alert(data.data.message)
    }
  }

  const handleUpdate = async(e) => {
    e.preventDefault()
    const data = await axios.put("/update", editFormData)
    console.log(data)
    if(data.data.success){
      fetchData()
      alert(data.data.message)
      setEditDetails(false)
    }
  }

  const handleEditOnChange = async (e)=> {
    const {value, name} = e.target
    setEditFormData ((prev)=> {
      return{
        ...prev,
        [name] : value
      }
    })
  }

  const handleEdit = (cl) => {
    setEditFormData(cl)
    setEditDetails(true)
  }

  const handleLogin = (token) => {
    // Store the token in local storage and update the isLoggedIn state
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  // console.log(dataList)

  return (
    <div className="app">
      {isLoggedIn ? (
        // Render the authenticated content
        <div className="container">
          <button className="btn btn-add" onClick={() => setAddDetails(true)}>Add Customer Record</button>
          <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
          {addDetails && (
            <Form
              handleSubmit={handleSubmit}
              handleOnChange={handleOnChange}
              handleClose={() => setAddDetails(false)}
              rest={addFormData}
            />
          )}
          {editDetails && (
            <Form
              handleSubmit={handleUpdate}
              handleOnChange={handleEditOnChange}
              handleClose={() => setEditDetails(false)}
              rest={editFormData}
            />
          )}
          {addCarDetails && (
            <CarForm
              handleCarSubmit={handleCarSubmit}
              handleCarOnChange={handleCarOnChange}
              handleClose={() => setAddCarDetails(false)}
              rest={carFormData}
            />
          )}
          {selectedCar && (
            <ViewCarsForm handleClose={() => setSelectedCar(null)} carData={selectedCar} />
          )}
          <div className="tableContainer">
          <table>
              <thead>
                <tr>
                  <th>First Name : </th>
                  <th>Last Name : </th>
                  <th>Email : </th>
                  <th>
                    Customer actions
                  </th>
                  <th>
                    Add Car
                  </th>
                  <th>
                    Edit/Delete Details
                  </th>
                </tr>
              </thead>
              <tbody>
                { dataList[0] ? (
                  dataList.map((cl)=>{
                    return(
                      <tr key={cl._id}>
                        <td>{cl.firstName}</td>
                        <td>{cl.lastName}</td>
                        <td>{cl.email}</td>
                        <td>
                        <button className="btn btn-edit" onClick={() => handleEdit(cl)}>Edit Customer</button>
                        
                        <button className="btn btn-delete" onClick={()=>handleDelete(cl._id)}>Delete</button>
                        </td>
                        <td>
                        <button className="btn btn-edit" onClick={() => handleAddCar(cl._id)}>Add Car Record</button>
                        </td>

                        <td>
                        <button className="btn btn-edit" onClick={() => handleViewCars(cl)}>Edit car</button>
                        </td>
                      </tr>
                    )
                  }))
                  : (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center" }}>No data available</td>
                      </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="login-container">
          <LoginForm handleLogin={handleLogin} />
        </div>
      )}
    </div>
  );
}


export default App