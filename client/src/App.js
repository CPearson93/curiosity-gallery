import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Home from './components/Home';
import Create from './components/Create';
import Detail from './components/Detail';
import Update from './components/Update';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={ <Home/>}/>
          <Route path='/api/art/create' element={<Create/>}/>
          <Route path='/api/art/:id' element={<Detail/>}/>
          <Route path='/api/art/edit/:id' element={<Update/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
