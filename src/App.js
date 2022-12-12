import './App.scss';
import { Formio} from '@formio/react';
import FormioContrib from '@formio/contrib';
import Navigation from './components/Navigation';
import { Route, Routes } from 'react-router-dom';
import Components from './components/Components';
Formio.use(FormioContrib);

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Routes basename={'/data-table-demo'}>
        <Route path='/' element={<Components />}></Route>
      </Routes>      
    </div>
  );
}

export default App;
