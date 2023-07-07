import "./App.css";
import AppHeader from "./component/AppHeader";
import SideMenu from "./component/SideMenu";
import Footer from "./component/AppFooter";
import PageContent from "./component/PageContent";
import React, { useEffect } from "react";
import { actions, useStore } from "./store";
import Service from "./service";
function App() {
  const [state, dispatch] = useStore();
  const { orders } = state;
  useEffect(() => {
    async function getApi() {
      const service = new Service("cart");
      const data = await service.getAll();
      dispatch(actions.setOrders(data));
    }
    getApi();
  }, [dispatch, orders]);
  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent ">
        <SideMenu />
        <PageContent />
      </div>
      <Footer />
    </div>
  );
}

export default App;
