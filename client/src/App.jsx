import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Editor from './components/Editor'  
export default function App() {
  return (
   <BrowserRouter>
   <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/write" element={<Editor/>}/>
    </Routes>
   </BrowserRouter>  )
}