import { Routes, Route, useLocation } from 'react-router-dom';

import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';

import Footer from './components/Footer';

import './App.css'
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
    const location = useLocation();

	return (
		<>
			<Routes location={location}>
				<Route path="/login" element={ <LoginPage /> } />

				<Route element={ <ProtectedRoute />}>
				</Route>

				<Route path="*" element={ <NotFound /> } />
			</Routes>

			<Footer />
		</>
	)
}

export default App
