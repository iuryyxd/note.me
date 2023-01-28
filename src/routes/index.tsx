import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';
import Login from '~/screens/Login';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path='/login' element={<Login />} />
      </Switch>
    </Router>
  );
}
