import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Lista } from "./components/Lista"
import { NuevoTarea } from "./components/NuevaTareaScreen"

function App() {

  return (
     <BrowserRouter>
          <Routes>
             <Routes>
          <Route path="/" element={<Lista />} />
            <Route path="/NuevoTarea" element={<NuevoTarea />} />
            </Routes>
          </Routes>
     </BrowserRouter>
  )
}

export default App


