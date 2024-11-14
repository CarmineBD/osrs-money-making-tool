// eslint-disable-next-line
import React, { useState } from 'react';
import Osrs from './pages/Osrs/Osrs';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import './App.css';

// const App = () => {
//   return (
//     <div>
//       <div>
//         <ReservedProducts />
//         {/* <Osrs /> */}
//       </div>

//     </div>
//   );
// };

function App() {
  return (
    <Router>
      <div>
        <div>
          <Routes>
            <Route path="/" element={<Osrs />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
