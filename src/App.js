import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css'

import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'
import UserProfile from './components/UserProfile'
import ProtectedRoute from './components/ProtectedRoute'
import MyProfile from './components/MyProfile'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/users/:userId" component={UserProfile} />
        <ProtectedRoute exact path="/my-profile" component={MyProfile} />
        <Route component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    )
  }
}
export default App
