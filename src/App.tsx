import Header from "./components/Header/Header";
import MainBody from "./containers/MainBody/MainBody";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <MainBody />
    </div>
  );
}

export default App;
