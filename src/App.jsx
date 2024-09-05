import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './Login/Login.jsx'
import RegisterForm from './Register/RegisterForm.jsx'
import AlumniMain from './Alumni/AlumniMain.jsx';
import Posts from './Alumni/Alumni Components/Posts/Posts.jsx';
import MyNetwork from './Alumni/Alumni Components/MyNetwork/MyNetwork.jsx';
import AllInvitations from './Alumni/Alumni Components/MyNetwork/Invitations/AllInvitations.jsx';
import AllConnections from './Alumni/Alumni Components/MyNetwork/Connections/AllConnections.jsx';
import ChatFirebase from './AiChatBot/ChatFirebase.jsx';
import Profile from './Alumni/Alumni Components/Profile/Profile.jsx';
import Events from './Alumni/Alumni Components/More/Events.jsx';
import EventForm from './Alumni/Alumni Components/More/EventForm.jsx';
import Admin from './Admin/Admin.jsx';
import Users from './Admin/c/Content.jsx';
import Content from './Admin/c/Content.jsx';
import Usert from './Admin/c/Usert.jsx';
import Analytics from './Admin/c/Analytics.jsx';
// import UserManagement from './Admin/c/UserManagement.jsx';
// import Posts from './Alumni/Alumni Components/Posts/Posts.jsx';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/admin' element={<Admin />}>
            <Route path='' element={<Usert />} />
            <Route path='contentManagement' element={<Content />} />
            <Route path='analytics' element={<Analytics />} />

          </Route>
          <Route path='/alumni/' element={<AlumniMain />}>

            <Route path='' element={<Posts />} />
            <Route path='myNetwork' element={<MyNetwork />} />
            <Route path='myNetwork/invitations' element={<AllInvitations />} />
            <Route path='myNetwork/connections' element={<AllConnections />} />
            <Route path='msg' element={<ChatFirebase />} />
            <Route path='profile' element={<Profile />} />
            <Route path='eventOrganize' element={<Events />} />
            <Route path='eventOrganize/event-form' element={<EventForm />} />

          </Route>


        </Routes>
      </Router>
    </>
  )
}

export default App
