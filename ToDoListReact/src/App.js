import React from 'react';
import { Nav } from './components/Nav';
import { Routing } from './components/routing';
import { BrowserRouter } from 'react-router';


function App() {
  return (
        <BrowserRouter>
          <Nav></Nav>
          <div className='container'>
            <Routing></Routing>
          </div>
        </BrowserRouter>
  );
}

export default App;
