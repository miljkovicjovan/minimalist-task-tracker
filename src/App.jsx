import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'
import Home from './pages/Home';
import "./styles.scss";
import Archive from './pages/Archive';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/archive" element={<Archive/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;