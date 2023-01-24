import './App.css';
import { DATA } from './constants';
import Tree from './Tree';

function App() {
  return (
    <div className="App">
      <header >
        <h2> React js Tree  </h2>
      </header>

      <div className="tree">
        <Tree data={DATA} />
      </div>
    </div>
  );
}

export default App;
