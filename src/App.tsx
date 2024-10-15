import "./App.css";
import DynamicScreen from "./components/DynamicScreen";
import { DynamicComponent } from "./DataInterface";
import componentsData from "./data.json";

function App() {
  return (
    <>
      <DynamicScreen componentsData={componentsData as DynamicComponent[]} />,
    </>
  );
}

export default App;
