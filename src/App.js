import {BrowserRouter,Route} from 'react-router-dom'
import {AuthContextProvider} from './contexts/AuthContext'

import {Home} from './pages/Home.js'
import {NewRoom} from './pages/NewRoom.js'

function App() {
  return (
      <BrowserRouter>
        <AuthContextProvider>
            <Route component={Home} path='/' exact/>
            <Route component={NewRoom} path='/roons/new'/>
        </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
