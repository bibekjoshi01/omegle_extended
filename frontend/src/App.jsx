import Home from "./components/HomePage";
import Layout from "./components/Layout";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Starter from "./components/Starter";

const App = () => {
  return (
    <Provider store={store}>
      <Layout>
        {/* <Home /> */}
        <Starter/>
      </Layout>
    </Provider>
  );
};

export default App;
