import { Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Dashboard}/>
      </Switch>      
    </div>
  );
}

export default App;
