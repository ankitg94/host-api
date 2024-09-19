import React, { Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loader from './components/Loader';
import PrivateRoute from './PrivateRoute.js';
import PageNotFound from './PageNotFound.js';

const LazyRegister = React.lazy(() => import('./Pages/Register'));
const LazyLogin =React.lazy(()=>import("./Pages/Login.js"));
const LazyTask =React.lazy(()=>import("./Pages/TaskPage.js"));
const LazyDetails =React.lazy(()=>import("./Pages/TaskDetails.js"));
const LazyHeader =React.lazy(()=>import("./Layout/Header.js"));

const App = () => {
  useEffect(() => {
    localStorage.removeItem('token');
  }, []);
  return (
    <>
     <Router>
     <Suspense fallback={<Loader/>}>
      <Routes>
      <Route path='/' element={<LazyHeader/>}/>  
      <Route path='/register' element={<LazyRegister/>}/>
      <Route path="/login"  element={<LazyLogin/>} />

      <Route path="/task"   element={<PrivateRoute><LazyTask/></PrivateRoute>}/>
      <Route path ="/taskDetails/:id" element={<PrivateRoute><LazyDetails/></PrivateRoute>}/>
      <Route path ="*" element ={<PageNotFound/>}/>

      </Routes>
      </Suspense>
     </Router>
    </>
  )
}

export default App
