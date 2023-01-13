import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Products from './Pages/Products';
import Add from './Pages/Add';
import Update from './Pages/Update';
import './style.css';

function App() {
  return (

    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:Item" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
