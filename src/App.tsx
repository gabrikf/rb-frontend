import { Routes } from "./routes";
import "./global.css";
import { AuthProvider } from "./Hooks/useAuth";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
