import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Outlet, Route, Routes} from 'react-router-dom';

import {Details, Home, Navigation} from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}> {/* Calls the Layout Function from below, and displays the things in it */}
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Details />} />
        </Route>
    </Routes>
  </BrowserRouter>
);

export default function Layout() { {/* This gives components given in the return, having one ( <static Element /> ) and one ( <dynamic Element /> ) The Outlet Tag is swapped with the elements from the Routs above*/}
 return (
  <>
    <Navigation />
    <Outlet />
  </>
  );
}