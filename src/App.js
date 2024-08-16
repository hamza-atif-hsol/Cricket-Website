import './App.css';
import {BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Teams from "./Components/Teams";
import Players from "./Components/Players";
import Umpires from "./Components/Umpires";
import Matches from "./Components/Matches";
import Venue from "./Components/Venue";
import Shop from './Components/Shop';


function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/players" element={<Players />} />
        <Route path="/umpires" element={<Umpires />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/venue" element={<Venue />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
      
    </div>
  );
}

export default App;
