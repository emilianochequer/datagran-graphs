import React from 'react';
import "./App.css";
import 'semantic-ui-css/semantic.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Menu from './components/Menu';
import Home from "./pages/Home";
import Posts from "./pages/Posts";

function App() {
  return (
    <Router>
        <Menu />
        <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/posts">
          <Posts />
        </Route>
        </Switch>
    </Router>
  );
}

export default App;
