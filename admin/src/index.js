import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";


//React18
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <Provider store={store}>
        <PersistGate loading="null" persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </DarkModeContextProvider>
  </React.StrictMode>
)

//React 17
// ReactDOM.render(
//   <React.StrictMode>
//     <DarkModeContextProvider>
//       <Provider store={store}>
//         <PersistGate loading="null" persistor={persistor}>
//           <App />
//         </PersistGate>
//       </Provider>
//     </DarkModeContextProvider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
