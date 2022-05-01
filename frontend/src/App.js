import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./screens/Dashboard/Dashboard";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";

const App = () => {

  return (
    <Router>
      <Header />
      <main className="App">
        <Route path="/" component={LoginScreen} exact />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/dashboard" component={({ history }) => (<Dashboard history={history} /> )} />
        <Route path="/profile" component={ProfileScreen} />
      </main>
    </Router>
  );
}

export default App;
