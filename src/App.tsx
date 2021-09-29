import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Box from '@mui/material/Box'

import { SearchingPage } from "./pages/SearchingPage";
import { OverwievPage } from "./pages/OverwievPage";

const App = ()=> {
  return (
    <BrowserRouter>
      <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row'}}>
        <Box >
          <Link to="/:id">Overwiev page</Link>
        </Box>
      Bilo sto e tuka sto ne se menuva 
        <Box>
          <Switch>
            <Route path="/" exact >
              <SearchingPage />
            </Route>

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
