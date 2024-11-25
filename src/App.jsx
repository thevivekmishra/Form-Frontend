import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Form from './Components/Form';
import toast, { Toaster } from 'react-hot-toast';
import AllFormData from './Components/AllFormData';
import EditForm from './Components/EditForm';

const App = () => {
  return (
    <Router>
      <Header /> 

      <div>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/all" element={<AllFormData />} />
          <Route path="/edit/:id" element={<EditForm />} />

        </Routes>
      </div>

      <Toaster />
    </Router>
  );
};

export default App;
