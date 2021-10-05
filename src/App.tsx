import React, { useState } from "react"
import { BrowserRouter, Route, Switch} from "react-router-dom"
import {Box, Grid, Paper, Typography} from "@mui/material"
import LinearProgress from "@mui/material/LinearProgress"
import { styled } from "@mui/material/styles"
import Stack from "@mui/material/Stack"

import { SearchingPage } from "./pages/SearchingPage"
import { OverviewPage } from "./pages/OverviewPage"

const Panel = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const App: React.FC = () => {
  const [showLoader, setShowLoader] = useState(false)

  return (
    <BrowserRouter>
      <Box sx={{ width: '100%' }}>
        {showLoader && 
        <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
          <LinearProgress color="secondary"/> 
        </Stack>}
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Panel>
              <SearchingPage onShowLoader={setShowLoader} />
            </Panel>
          </Grid>
          <Grid item xs={6}>
            <Panel> 
              <Switch>
                <Route path="/" exact>
                  <Typography variant="h6">
                    No movie selected
                  </Typography>
                </Route>
                <Route path="/:id">
                  <OverviewPage onShowLoader={setShowLoader} />
                </Route>
              </Switch>
            </Panel>
          </Grid>
        </Grid>
      </Box>
    </BrowserRouter>
  );
}

export default App;
