import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './pages/Home.js';
import PlayMatch from './pages/PlayMatch.js';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/playMatch">
            <PlayMatch />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
