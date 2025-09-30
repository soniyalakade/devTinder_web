import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Body from './Body'
import Login from './Login'
import Profile from './Profile'

function App() {

  return (
    <>
    <BrowserRouter baseName="/" >
      <Routes>
        <Route path="/" element={<Body />} >
          <Route path ="/login" element = {<Login />}/>
          <Route path ="/profile" element = {<Profile />}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
};0

export default App;
