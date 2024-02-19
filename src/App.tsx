import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import Favorites from "./pages/Favorites";
import NoPageFound from "./pages/NoPageFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe-details" element={<RecipeDetails />} />
        <Route path="/favorite" element={<Favorites />} />
        <Route path="/*" element={<NoPageFound />} />
      </Routes>
    </>
  );
}

export default App;
