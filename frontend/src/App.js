import { Form } from "formik";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Register1 from "./components/users/register/Register1";
import Login from "./components/users/login/Login"

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/register" component={Register1} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
