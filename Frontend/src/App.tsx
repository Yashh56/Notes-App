import { Routes, Route, } from 'react-router-dom'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import PostDetails from './Pages/PostDetails'
import CreatePost from './Pages/CreatePost'
import { useContext } from 'react'
import { UserContext } from './context/UserContext'
import EditPost from './Pages/EditPost'


const App = () => {
  const { user } = useContext(UserContext)
  return (
    <>
      <Routes>
        {user ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<Login />} />
        )}
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/posts/post/:id' element={<PostDetails />} />
        <Route path='/createpost' element={<CreatePost />} />
        <Route path='/edit/:id' element={<EditPost />} />
      </Routes>
    </>
  )
}

export default App