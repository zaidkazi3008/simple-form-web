import { Routes, Route } from 'react-router-dom';
import Homepage from './components/HomePage';
import FormPage from './components/FormPage';
import ResultPage from './components/ResultPage';


const App = () => {
  return (
    <Routes>
    <Route exact path={"/"} element={<Homepage/>} />
    <Route path={"/form"} element={<FormPage />} />
    <Route path={"/result"} element={<ResultPage/>} />
    </Routes>
  );
};

export default App;
