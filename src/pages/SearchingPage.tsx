import React from "react"
import Paper from '@mui/material/Paper'

import { SearchBar } from "../components/SearchBar"

export const SearchingPage = () => {
    return(
        <Paper elevation={3}>
            <SearchBar/>
        </Paper>
    )
}