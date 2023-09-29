import{BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar';
import Search from './components/Search';
import Home from './Home';
import Charts from './Charts';
import Download from './Download';
import Results from './Results';
import Events from './Events';
import Event from './Event';
import Artist from './Artist';
import QRCodeScanner from './components/QRCodeScanner';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <div className="App">
      <main id="mainContent" className="col-12">
        <Navbar/>
        <Search/>
        <Switch>
          <Route exact path="/">
              <Home/>
          </Route>

          <Route path="/charts"><Charts/></Route>
          <Route path="/search/:search"><Results/></Route>
          <Route path="/song/:playlist/:id"><Download/></Route>
          <Route exact path="/events">
            <Events/>
          </Route>

          <Route path="/events/:id"><Event/></Route>
          
          <Route path="/artists"><Artist /></Route>

          <Route path="/scan"><QRCodeScanner /></Route>

          <Route>
            <NotFound path="*"/>
          </Route>
        </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
