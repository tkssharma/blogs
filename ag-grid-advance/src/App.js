import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Practice from './components/practice/Practice';
import RowGrouping from './components/RowGrouping/RowGrouping'
import Filtering from './components/Filtering/Filtering';
import Selections from './components/Selections/Selections';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Header} />
          <Route path="/practice" component={Practice} />
          <Route path="/row-grouping" component={RowGrouping} />
          <Route path="/filter" component={Filtering} />
          <Route path="/selections" component={Selections} />
        </Switch>
      </BrowserRouter>

      
    </div>
  );
}

export default App;