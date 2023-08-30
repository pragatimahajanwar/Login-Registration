// import React, { useState,useEffect } from 'react'
// import { Link,useNavigate } from 'react-router-dom'
// import axios from 'axios';


// function Home() {
//   const navigate = useNavigate();
//   axios.defaults.withCredentials=true;
//   const handleSubmit=(event)=>{
//     event.preventDefault();
//   }
//   const [auth,setAuth]=useState(false);
//   const [message,setMessage]=useState('');
//   const [name,setName]=useState('')

//   useEffect(()=>{
//     axios.get('/')
//     .then(res=>{
//         if(res.data.status==="Success"){
//           setAuth(true)
//           setName(res.data.name)
//            navigate('/login')
//         }else{
//           setAuth(false)
//           setMessage(res.data.Error)
            
//         }
//     })
//     .then(err=>console.log(err));
// } ,[]) 

  
//   return (
    
//     <div className='container mt-4'>
//        {
//         auth?
//          <div>
//           <h3>you are Authorized---{name}</h3> 
//            <button className='btn btn-danger' onClick={handleSubmit}>Logout</button>
//         </div>
//         :
//      <div>
//           <h3>{message}</h3>
//           <h3>Login Now</h3>
//            <Link to='/login' className='btn btn-primary' >Login</Link>
//            </div>
       
// }
//      </div>
    
//   )
// }

// export default Home


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  // const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    axios.get('/')
      .then(res => {
        if (res.data.status === 'Success') {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .catch(error => {
        console.error(error);
        setMessage('An error occurred while checking authentication.');
      });
  }, []);

  return (
    <div className="container mt-4">
      {auth ? (
        <div>
          <h3>Welcome, {name}!</h3>
          <button className="btn btn-danger" onClick={() => setAuth(false)}>Logout</button>
        </div>
      ) : (
        <div>
          <h3>{message}</h3>
          <h3>Login Now</h3>
          <Link to="/login" className="btn btn-primary">Login</Link>
        </div>
      )}
    </div>
  );
}

export default Home;


