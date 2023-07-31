import './App.css';
import Product from './components/products';
import Create from './components/create';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                 <Route path='/' element={<Product/>}/>
                 <Route path='/products' element={<Product/>}/>
                 <Route path='/create' element={<Create/>}/>
             </Routes>
        </BrowserRouter>
    </div>
   );
   
}
//exporting the route
export default App;
