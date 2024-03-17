import { BrowserRouter } from "react-router-dom";
import Home from "./vsharee";
import { ContextProviderComp } from "./context";

function App() {
  return (
    <ContextProviderComp>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </ContextProviderComp>
  );
}

export default App;
