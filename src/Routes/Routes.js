
import {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '../pages/Home';
import User from '../pages/User';

class Routes extends Component {
  render() {
    return <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/dashboard" component={User} />
    </Switch>;
  }
}

export default Routes;
