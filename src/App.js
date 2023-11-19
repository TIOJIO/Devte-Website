
import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";


  
const  App=()=>(
    <BrowserRouter>
      <Routes>
          <Route  path="/" element={<HomePage/>}/>
        </Routes>
    </BrowserRouter>
 
  )
  
export default App;

 


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA