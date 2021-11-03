import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { EditPerson } from "./pages/EditPerson";
import { FrontPage } from "./pages/FrontPage";
import { Index } from "./pages/Index";
import { MyPeople } from "./pages/Mypeople";
import { NewPerson } from "./pages/NewPerson";
import { useAuth } from "./Hooks/useAuth";
export function Routes() {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      <Switch>
        <Route path={"/"} exact component={Index} />
        {user && (
          <>
            <Route path={"/profile"} exact component={MyPeople} />
            <Route path={"/peoples"} exact component={FrontPage} />
            <Route path={"/create"} exact component={NewPerson} />
            <Route path={"/edit/:id"} component={EditPerson} />
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
}
