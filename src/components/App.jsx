/* eslint-disable react/prop-types */
import "../style/App.css";
import MainTitle from "./global_components/MainTitle";
import Calculator from "./Calculator";

function App() {
  return (
    <div className="container_fluid">
      <MainTitle title="Calculator" />
      <Calculator />
    </div>
  );
}

export default App;
