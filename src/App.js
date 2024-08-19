import {Switch, Route} from 'react-router-dom'
import Header from './components/Header'
import Main from './components/Main'
import DetailedView from './components/DetailedView'
import NotFound from './components/NotFound'
import './App.css'

// Replace your code here
const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/courses/:id" component={DetailedView} />
      <Route exact path="/bad-path" component={NotFound} />
      <NotFound />
    </Switch>
  </>
)

export default App
