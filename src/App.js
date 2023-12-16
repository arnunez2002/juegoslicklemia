import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SeleccionarParejas from './components/Seleccionarparejas';
import Juego from './components/Juego';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/juegoslicklemia/build" element={<SeleccionarParejas />} />
        <Route path="/juego" element={<Juego />} />
      </Routes>
    </Router>
  );
};

export default App;