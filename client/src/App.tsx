import { Switch, Route } from "wouter";
import { Calendar } from "./components/calendar/Calendar";

function App() {
  return (
    <Switch>
      <Route path="/" component={Calendar} />
      <Route>404 Page Not Found</Route>
    </Switch>
  );
}

export default App;
