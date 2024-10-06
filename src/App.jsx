import { Route, Routes, Navigate } from 'react-router-dom'
import routes from './config/routes'
import './App.less';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element=<Navigate to="/login" /> />
        {
          routes.map(routeObj => <Route {...routeObj} key={routeObj.path}/>)
        }
      </Routes>
    </div>
  );
}

export default App;
