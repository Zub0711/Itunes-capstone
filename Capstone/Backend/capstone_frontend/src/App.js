import "./App.css";
import Homepage from "./components/Homepage";
import Search from "./components/Searchpage";
import { Route, Routes } from "react-router-dom";
// I start of by importing my components homepage & search.I then import route & routes from react-router-dom

function App() {
  // I then add my routes and return the path to my components
  return (
    <div className="App" data-testid="componentTest">
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/search" element={<Search />}></Route>
      </Routes>
    </div>
  );
}

export default App;
