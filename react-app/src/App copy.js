import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from './Navbar';
import Listuser from './Listuser';
import Createuser from './Createuser'
import Updateuser from './Updateuser'
import Minio from './minio'
import Showminio from './showminio'

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
          <Route path='/' element={<Listuser />} />
          <Route path='/creates' element={<Createuser />} />
          <Route path='/updateuser/:id' element={<Updateuser />} />
          <Route path='/createminio' element={<Minio />} />
          <Route path='/showminio' element={<Showminio />} />
        </Routes>
    </div>
  );
}