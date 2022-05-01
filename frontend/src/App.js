import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./screens/Dashboard/Dashboard";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import NotFound from "./screens/NotFound/NotFound";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="App">
        <Route exact path="/" component={LoginScreen} />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/register" component={RegisterScreen} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/profile" component={ProfileScreen} />
        {/* <Route path="*" component={NotFound} exact /> */}
      </main>
    </Router>
  );
}

export default App;
