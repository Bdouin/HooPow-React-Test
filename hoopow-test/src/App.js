import './App.css';
import ContextProvider from './context/context';
import Sidebar from './Components/Sidebar/Sidebar';
import MainContent from './Components/MainContent/MainContent';

function App() {
  return (
    <ContextProvider>
      <div className="global-wrapper">
        <div className="global-container">
          <Sidebar />
          <MainContent />
        </div>
      </div>
    </ContextProvider>
  );
}

export default App;
