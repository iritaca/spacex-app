import Header from "./components/Header/Header";
import MainBody from "./containers/MainBody/MainBody";

function App() {
  return (
    <div className="flex flex-col h-screen max-w-[1440px] mx-auto">
      <Header />
      <MainBody />
    </div>
  );
}

export default App;
