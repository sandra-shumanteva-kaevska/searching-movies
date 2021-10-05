import React, { useState } from "react"
import { BrowserRouter, Route, Switch} from "react-router-dom"
import {Box, Grid, Paper} from "@mui/material"
import LinearProgress from "@mui/material/LinearProgress"
import { styled } from "@mui/material/styles"
import Stack from "@mui/material/Stack"

import { SearchingPage } from "./pages/SearchingPage"
import { OverwievPage } from "./pages/OverwievPage"

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const App: React.FC = () => {
  const [loader, setLoader] = useState(false)

  return (
    <BrowserRouter>
      <Box sx={{ width: '100%' }}>
        {loader && 
        <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
          <LinearProgress color="secondary"/> 
        </Stack>}
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Item>
              <SearchingPage showLoader={setLoader} />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item> 
              <Switch>
                <Route path="/" exact />
                <Route path="/:id">
                  <OverwievPage showLoader={setLoader} />
                </Route>
              </Switch>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </BrowserRouter>
  );
}

export default App;
