import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Register';
import {BrowserRouter,Route,Routes}  from "react-router-dom"
import Home from './Home';
import Login from './Login';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/reg' element={<Register/>}/>
  <Route path='/login' element={<Login/>}/>
</Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
