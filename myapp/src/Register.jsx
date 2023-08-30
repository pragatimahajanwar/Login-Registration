


// import React, { useState } from 'react';
// import { Form ,Button} from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function Register() {
//   const [values, setValues] = useState({
//     name: "",
//     email: "",
//     password: ""
//   });

 

//   const navigate= useNavigate()
//   const handleSubmit=(event)=>{
//     event.preventDefault();
//     axios.post('http://localhost:4000/reg',values)
//     .then(res=>{
//       if(res.data.status==='success'){
//         navigate('/login')
//       }
//       else{
//         alert('error')
//       }
//     })
//     .then (err=>console.log(err))
//   }

//   return (
//     <>
//     <h1>Sign in</h1>
//        <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3" controlId="formBasicsName">
//             <Form.Label>name</Form.Label>
//             <Form.Control type="text" placeholder="Enter name" />
//             <Form.Text className="text-muted" onChange={e=>setValues({...values,name:e.target.value})}>
              
              
//             </Form.Text>
            
//           </Form.Group>
    
//           <Form.Group className="mb-3" controlId="formBasicPassword">
//             <Form.Label>email</Form.Label>
//             <Form.Control type="email" placeholder="email" />
//             <Form.Text className="text-muted" onChange={e=>setValues({...values,email:e.target.value})}>
//               We'll never share your email with anyone else.
//             </Form.Text>
//           </Form.Group>
          
//           <Form.Group className="mb-3" controlId="formBasicPassword">
//             <Form.Label>password</Form.Label>
//             <Form.Control type="password" placeholder="Password" />
//             <Form.Text className="text-muted" onChange={e=>setValues({...values,password:e.target.value})}>
//               We'll never share your password with anyone else.
//             </Form.Text>
//           </Form.Group>
    
//           <Form.Group className="mb-3" controlId="formBasicCheckbox">
//             <Form.Check type="checkbox" label="Check me out" />
//           </Form.Group>
//           <Button variant="primary" type="submit">
//             Sign up
//           </Button>
//           <Link to='/login'>login</Link>
//        </Form> 

//         </>
        
//       )
//     }

// export default Register;


import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: ""
  });
  const Navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:4000/reg', values)
      .then(res => {
        if (res.data.Status === "Success") {
          Navigate('/login');
        } else {
          alert("success");
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
          <h2>Sign-Up</h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor="name"><strong>Name</strong></label>
              <input
                type="text"
                placeholder='Enter Name'
                name='name'
                onChange={e => setValues({ ...values, name: e.target.value })}
                className='form-control rounded-0'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor="email"><strong>Email</strong></label>
              <input
                type="email"
                placeholder='Enter Email'
                name='email'
                onChange={e => setValues({ ...values, email: e.target.value })}
                className='form-control rounded-0'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor="password"><strong>Password</strong></label>
              <input
                type="password"
                placeholder='Enter Password'
                name='password'
                onChange={e => setValues({ ...values, password: e.target.value })}
                className='form-control rounded-0'
              />
            </div>
            <button type='submit' className='btn btn-primary w-100 rounded-0'>Sign up</button>
            <p>You agree to our terms and policies</p>
            <Link to='/login' className='btn btn-info border w-100 bg-info rounded-0'>Login</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;