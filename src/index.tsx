import ReactDOM from 'react-dom/client';
import './sass/index.sass';
import App from './App';
import {createContext} from "react"
import IStoreState from "./interfaces/IStoreState";
import Store from "./store/store";

export const store = new Store()

export const Context  = createContext<IStoreState>({
  store
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Context.Provider value={{
    store
  }}>
    <App />
  </Context.Provider>
);
