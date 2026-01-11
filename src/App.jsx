import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Programs from './pages/Programs'
import Donate from './pages/Donate'
import Events from './pages/Events'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import Game from './pages/Game'
import './App.css'
import './game.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
