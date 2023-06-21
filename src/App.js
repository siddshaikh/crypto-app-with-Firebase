import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Header from './components/Header';
import Home from './pages/Home';
import CoinPage from './pages/CoinPage';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(()=>({
  App:{
       backgroundColor:'#14161a',
       color:'white',
       minHeight:'100vh'
  }
}))
function App() {
  const classes = useStyles()
  return (
    <div className="App">
      <BrowserRouter>
      <div className={classes.App}>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/coins/:id' element={<CoinPage/>}/>
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
