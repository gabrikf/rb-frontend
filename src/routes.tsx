import { BrowserRouter, Route, Switch } from "react-router-dom";
import { EditPerson } from "./pages/EditPerson";
import { FrontPage } from "./pages/FrontPage";
import { Index } from "./pages/Index";
import { MyPeople } from "./pages/Mypeople";
import { NewPerson } from "./pages/NewPerson";

export function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={"/"} exact component={Index} />
        <Route path={"/profile"} exact component={MyPeople} />
        <Route path={"/peoples"} exact component={FrontPage} />
        <Route path={"/create"} exact component={NewPerson} />
        <Route path={"/edit/:id"} component={EditPerson} />
      </Switch>
    </BrowserRouter>
  );
}
