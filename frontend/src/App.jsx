import Home from "./components/HomePage";
import Layout from "./components/Layout";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Starter from "./components/Starter";
import ContactUs from "./components/ContactUs";
import { Routes, Route } from "react-router-dom";
import Searching from "./components/searching";
import ChatDashboard from "./components/ChatDashboard";
const App = () => {
  return (
    <Provider store={store}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/starter" element={<Starter />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/start-searching" element={<Searching />} />
          <Route path="/chat-dashboard" element={<ChatDashboard />} />
        </Routes>
      </Layout>
    </Provider>
  );
};

export default App;
