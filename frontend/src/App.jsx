import Home from './components/HomePage';
import Layout from './components/Layout';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Starter from './components/Starter';
import ContactUs from './components/ContactUs';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const App = () => {
	return (
		<Provider store={store}>
			<Layout>
				<BrowserRouter>
					<Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/starter' element={<Starter/>} />
            <Route path='/contact' element={<ContactUs/>} />
          </Routes>
				</BrowserRouter>
			</Layout>
		</Provider>
	);
};

export default App;
