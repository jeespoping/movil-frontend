import { Provider } from "react-redux";
import "./App.scss";
import AppRouter from "./routes/AppRouter";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
