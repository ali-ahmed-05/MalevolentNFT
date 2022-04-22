import logo from './logo.svg';
import './App.css';
import './assets/css/style.css';
import './assets/css/responsive.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/fontawesome/css/all.min.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Home from './screens/Home';
import MyNfts from './components/MyNfts';


function App() {
  return (

    <Router>


      <Routes>
  
        
          <Route path="/" element={<Home/>} />
          <Route path="/nft" element={<MyNfts />} />

      
    
      </Routes>

    </Router>
  );
}

export default App;
