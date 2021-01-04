import './App.css';
import Game from './components/Game'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Game of Life</h2>
      </header>
      <div className="app-body">
        <Game></Game>
      </div>
    </div>
  );
}

export default App;
