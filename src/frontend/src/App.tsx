import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Lista } from "./components/Lista";
import { NuevoTarea } from "./components/NuevoTarea";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lista />} />
        <Route path="/nuevotarea" element={<NuevoTarea />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;





