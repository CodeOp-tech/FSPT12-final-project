import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
//import "./index.css";
/* import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBSelect
}
from 'mdb-react-ui-kit'; */

function Register() {
  const [user, setUser] = useState({
    username: "test",
    password: "test",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const login = async () => {
    try {
      const { data } = await axios("/users/register", {
        method: "POST",
        data: user,
      });
      //redirect the user to the login page
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Signup</h1>

{/*     <MDBContainer fluid className='h-custom'>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12' className='m-5'>

          <MDBCard className='card-registration card-registration-2' style={{borderRadius: '15px'}}>

            <MDBCardBody className='p-0'>

              <MDBRow>

                <MDBCol md='6' className='p-5 bg-white'>

                  <h3 className="fw-normal mb-5" style={{color: '#4835d4'}}>General Infomation</h3>
                  <MDBSelect
                    className='mb-4'
                    size='lg'
                    data={[
                      { text: 'Titile', value: 1 },
                      { text: 'Two', value: 2 },
                      { text: 'Three', value: 3 },
                      { text: 'Four', value: 4 }
                    ]}
                    />

                  <MDBRow>

                    <MDBCol md='6'>
                      <MDBInput wrapperClass='mb-4' label='First Name' size='lg' id='form1' type='text'/>
                    </MDBCol>

                    <MDBCol md='6'>
                      <MDBInput wrapperClass='mb-4' label='Last Name' size='lg' id='form2' type='text'/>
                    </MDBCol>

                  </MDBRow>

                  <MDBSelect
                    className='mb-4'
                    size='lg'
                    data={[
                      { text: 'Position', value: 1 },
                      { text: 'Two', value: 2 },
                      { text: 'Three', value: 3 },
                      { text: 'Four', value: 4 }
                    ]}
                    />
                  <MDBInput wrapperClass='mb-4' label='Position' size='lg' id='form3' type='text'/>

                  <MDBRow>

                    <MDBCol md='6'>
                      <MDBInput wrapperClass='mb-4' label='Bussines Arena' size='lg' id='form4' type='text'/>
                    </MDBCol>

                    <MDBCol md='6'>
                      <MDBSelect
                        className='mb-4'
                        size='lg'
                        data={[
                          { text: 'Employees', value: 1 },
                          { text: 'Two', value: 2 },
                          { text: 'Three', value: 3 },
                          { text: 'Four', value: 4 }
                        ]}
                        />
                    </MDBCol>

                  </MDBRow>

                </MDBCol>


                <MDBCol md='6' className='bg-indigo p-5'>

                  <h3 className="fw-normal mb-5 text-white" style={{color: '#4835d4'}}>Contact Details</h3>
                  <MDBInput wrapperClass='mb-4' labelClass='text-white' label='Street + Nr' size='lg' id='form5' type='text'/>
                  <MDBInput wrapperClass='mb-4' labelClass='text-white' label='Additional Information' size='lg' id='form6' type='text'/>

                  <MDBRow>

                    <MDBCol md='5'>
                      <MDBInput wrapperClass='mb-4' labelClass='text-white' label='Zip Code' size='lg' id='form6' type='text'/>
                    </MDBCol>

                    <MDBCol md='7'>
                      <MDBInput wrapperClass='mb-4' labelClass='text-white' label='Place' size='lg' id='form7' type='text'/>
                    </MDBCol>

                  </MDBRow>

                  <MDBInput wrapperClass='mb-4' labelClass='text-white' label='Country' size='lg' id='form8' type='text'/>

                  <MDBRow>

                    <MDBCol md='5'>
                      <MDBInput wrapperClass='mb-4' labelClass='text-white' label='Code +' size='lg' id='form9' type='text'/>
                    </MDBCol>

                    <MDBCol md='7'>
                      <MDBInput wrapperClass='mb-4' labelClass='text-white' label='Phone Number' size='lg' id='form10' type='text'/>
                    </MDBCol>
                  </MDBRow>

                  <MDBInput wrapperClass='mb-4' labelClass='text-white' label='Your Email' size='lg' id='form8' type='email'/>
                  <MDBCheckbox name='flexCheck' id='flexCheckDefault' labelClass='text-white mb-4' label='I do accept the Terms and Conditions of your site.' />
                  <MDBBtn color='light' size='lg'>Register</MDBBtn>

                </MDBCol>
              </MDBRow>

            </MDBCardBody>

          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
} */}


      <form>
  <div className="form-row">
    <div className="form-group col-md-6">
      <label for="inputEmail4">Email</label>
      <input value={user.email}
          onChange={handleChange} type="email" className="form-control" id="inputEmail4" placeholder="Email"/>
    </div>
    <div className="form-group col-md-6">
      <label for="inputPassword4">Password</label>
      <input value={user.password}
          onChange={handleChange} type="password" className="form-control" id="inputPassword4" placeholder="Password"/>
    </div>
  </div>
  <div className="form-row">
    <div className="form-group col-md-6">
      <label for="inputEmail4">First name</label>
      <input value={user.firstname}
          onChange={handleChange} type="text" className="form-control" id="firstname" placeholder="firstname"/>
    </div>
    <div className="form-group col-md-6">
      <label for="inputPassword4">Last name</label>
      <input value={user.lastname}
          onChange={handleChange} type="text" className="form-control" id="lastname" placeholder="Last name"/>
    </div>
  </div>
  <div className="form-group">
    <label for="inputAddress2">Profile image URL</label>
    <input value={user.profile_pic}
          onChange={handleChange} type="url" className="form-control" id="profilepic" placeholder="Profile image URL"/>
  </div>
  <div className="form-group">
    <label for="inputAddress">Address</label>
    <input value={user.address}
          onChange={handleChange} type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"/>
  </div>
  <div className="form-row">
    <div className="form-group col-md-6">
      <label for="inputCity">City</label>
      <input value={user.city}
          onChange={handleChange} type="text" className="form-control" id="inputCity"/>
    </div>
    <div className="form-group col-md-2">
      <label for="inputZip">Zip</label>
      <input value={user.zipcode}
          onChange={handleChange} type="text" className="form-control" id="inputZip"/>
    </div>
  </div>
  <button type="submit" className="btn btn-primary">Signup</button>
</form>
{/*       <div>
        <input
          value={user.username}
          onChange={handleChange}
          name="username"
          type="text"
          className="form-control mb-2"
        />
        <input
          value={user.password}
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control mb-2"
        />
        <button className=" btn btn-primary" onClick={login}>
          Sign up
        </button>
      </div> */}
    </div>
  );
}

export default Register;