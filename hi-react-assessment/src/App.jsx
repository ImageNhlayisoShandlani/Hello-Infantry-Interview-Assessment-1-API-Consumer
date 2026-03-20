import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';


const Home = lazy(() => import('./pages/Home/Home'));
const Detail = lazy(() => import('./pages/Detail/Detail'));

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Pokemons</h1>
      </header>

      <main>
        {/* Suspense boundary is provided — use it with lazy-loaded routes */}
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
