import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import Footer from "./components/Footer";
import "./styles.scss";

function App() {
  return (
    <div className="vh-100 pt-4 bg-dark text-white">
      <Header/>
      <AddTask/>
      <Tasks/>
      <Footer/>
    </div>
  );
}

export default App;
