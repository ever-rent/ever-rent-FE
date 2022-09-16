import { BrowserRouter } from "react-router-dom";
import { Router } from "./router/Router";
import { Layout } from "./components/layout/Layout";

export const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Router />
      </Layout>
    </BrowserRouter>
  );
};
