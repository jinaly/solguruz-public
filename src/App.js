import { Provider } from "react-redux";
import "./App.css";
import RouterProvider from "./navigation/RouterProvider";
import store from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider />
      </Provider>
    </>
  );
}

export default App;
