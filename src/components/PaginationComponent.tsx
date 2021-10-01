import React, {useEffect, useState} from "react";
import { List, Divider, Box } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import { baseAPI, apiKey } from "../config";
import { MovieCard } from "./MovieCard";

export const PaginationComponent = () => {
  const itemsPerPage = 3;
  const [page, setPage] = React.useState(1);
  const moviesUrl = `${baseAPI}movie/popular?api_key=${apiKey}&language=en-US&page=1`
  const [movies, setMovies] = useState<any[]>([]);
  const [pagesNum, setPagesNum]=React.useState(0)
  
  useEffect(() => {
    fetch(moviesUrl)
      .then(response => response.json())
      .then(json => {
        setMovies(json.results)
        setPagesNum(Math.ceil(json.results.length / itemsPerPage))
      })
        // eslint-disable-next-line 
  }, [])
  
  return (
    <Box>
      <List>
        <ListItem>
          <ListItemButton>
            {movies
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map(movie =>(
                  <MovieCard key={movie.id} {...movie}/>
              ))
            }
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <Box component="span">

        <Pagination
          count={pagesNum}
          page={page}
          onChange={(event: React.ChangeEvent<unknown>, page: number) => {
            setPage(page);
          }}
          defaultPage={1}
          color="primary"
          size="large"
          showFirstButton
          showLastButton
        />
      </Box>
    </Box>
  );
};