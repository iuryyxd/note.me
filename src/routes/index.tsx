import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';
import Login from '~/screens/Login';
import Home from '~/screens/Home';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Switch>
    </Router>
  );
}
