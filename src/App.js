import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import Login from "./pages/login";
import './assets/fontawesome/css/all.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/app.scss'
import React from "react";

function App() {

    const email = localStorage.getItem('email')

    return (
        <React.Fragment>
            {email ? <Main/> : <Login/>}
        </React.Fragment>
    );
}

export default App;
