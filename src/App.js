import {BrowserRouter,Route, Switch} from 'react-router-dom'
import {AuthContextProvider} from './contexts/AuthContext'

import {Home} from './pages/Home.js'
import {NewRoom} from './pages/NewRoom.js'
import {Room} from './pages/Room.js'
import {AdminRoom} from './pages/AdminRoom.js'

function App() {
  return (
      <BrowserRouter>
        <AuthContextProvider>
            <Switch>
                <Route component={Home} path='/' exact/>
                <Route component={NewRoom} path='/rooms/new' exact/>
                <Route component={Room} path='/rooms/:id'/>
                <Route component={AdminRoom} path='/admin/rooms/:id'/>
            </Switch>
        </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
