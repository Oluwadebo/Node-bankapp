import logo from './logo.svg';
import './App.css';
import {Routes,Route,Navigate} from 'react-router-dom'
import Home from './component/MiniPOS';
import Won from './component/Won';
import NotFound from './component/NotFound';
import AboutDe from './component/signIn';
import Sign from './component/SignUp';
import Dashboard from './component/Dashboard';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<Won/>}/>
        <Route path='/SignIn' element={<AboutDe/>}/>
        <Route path='/Signup' element={<Sign/>}/>
        <Route path='/Dashboard' element={<Dashboard/>}/>
        <Route path='/home' element={<Navigate to='/'/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
