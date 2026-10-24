import { Route, Routes } from 'react-router'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Songs from './pages/Songs'
import PokemonGame from './pages/PokemonGame'
import ComponentTree from './pages/ComponentTree'
import Log from './pages/Log'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="integrantes/:id" element={<Profile />} />
        <Route path="canciones" element={<Songs />} />
        <Route path="pokemon" element={<PokemonGame />} />
        <Route path="arbol" element={<ComponentTree />} />
        <Route path="bitacora" element={<Log />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
