import logo from './logo.svg';
import './App.css';
import Home from "./pages/home/home";
import LandingPage from "./pages/LandingPage/LandingPage";
import {
  Routes,
  Route
} from 'react-router-dom';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-resume" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
