import Paper from '@mui/material/Paper'
import { SearchBar } from "../components/SearchBar"
import {PaginationComponent} from "../components/PaginationComponent"

export const SearchingPage: React.FC = () => {

    return(
        <Paper elevation={3}>
            <SearchBar/>
            <PaginationComponent/>
        </Paper>
    )
}