import "./App.css";
import AppHeader from "./component/AppHeader";
import SideMenu from "./component/SideMenu";
import Footer from "./component/AppFooter";
import PageContent from "./component/PageContent";

function App() {
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
