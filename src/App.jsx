import { Routes, Route, useLocation } from 'react-router-dom';

import Footer from './components/Footer';
import NotFound from './pages/NotFound';

import './App.css'
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
    const location = useLocation();

	return (
		<>
			<Routes location={location}>
				{/* <Route path="/" element={ <Home /> } /> */}

				<Route element={ <ProtectedRoute />}>
				</Route>

				<Route path="*" element={ <NotFound /> } />
			</Routes>

			<Footer />
		</>
	)
}

export default App
