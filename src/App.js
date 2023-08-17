import logo from './logo.svg';
import './App.css';
import { Home } from './Home/Home';
import { Book } from './Book/Book';
import { Login } from './Login/Login';
import {Header } from './Header/Header';
import { Navigate } from './Navigate';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { headerStyle } from './style';
import { Register } from './Register/Register';
import { TextField } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AuthWrapper } from './context/auth';
import { CartWrapper } from './context/cart';

function App() {
const UserName = "Swati";

  return (
    
    <BrowserRouter>
    <AuthWrapper>
      <CartWrapper>
    <ToastContainer/>
      <Header />
      
      
      <div className="App-route">
      <Navigate/>
     
      </div>
      <footer className="App-footer"><h2>ReadSpot</h2>
      <p>Copyright 2023 ReadSpot.Inc</p></footer>
      </CartWrapper>
    </AuthWrapper>
    </BrowserRouter>
    
  );
}

export default App;
