import './App.css';
import Game from './components/Game'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Game of Life</h2>
      </header>
      <div className="app-body">
        <div id='left-column' className="column">
        </div>
        <div id='center-column' className="column">
          <Game></Game>
        </div>
        <div id='right-column' className="column">
        </div>
      </div>
    </div>
  );
}

export default App;
