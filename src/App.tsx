import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Box from '@mui/material/Box'

import { SearchingPage } from "./pages/SearchingPage";
import { OverwievPage } from "./pages/OverwievPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row'}}>
        <Box >
          <Link to="/:id">Overwiev page</Link>
        </Box>
        <SearchingPage />
        <Box>
          <Switch>
            <Route path="/" exact />
            <Route path="/:id">
              <OverwievPage />
            </Route>
          </Switch>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;
