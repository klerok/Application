import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageOne, PageTwo } from "./components/Pages/Pages";
import { RegisterPage } from "./pages/Register";

function App() {
  return (    
    <BrowserRouter>
      <Routes>
        <Route path="one" element={<PageOne />} />
        <Route path="two" element={<PageTwo />} />
        <Route path="auth" element={<RegisterPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
