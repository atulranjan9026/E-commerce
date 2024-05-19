import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js"; // Add .js extension
import reportWebVitals from "./reportWebVitals.js"; // Add .js extension
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.js"; // Add .js extension
import { SearchProvider } from "./context/search.js"; // Add .js extension
import { CartProvider } from "./context/cart.js"; // Add .js extension

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <React.StrictMode>
      <AuthProvider>
        <SearchProvider>
          <CartProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </CartProvider>
        </SearchProvider>
      </AuthProvider>
    </React.StrictMode>
  </>
);

reportWebVitals();
