import React, { useEffect, useState } from "react";
import { Divider, Box, Grid } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import { baseAPI, apiKey } from "../config";
import { MovieCard } from "../components/MovieCard";
import { IMovie } from "../types/Movie";

interface IProps {
  onShowLoader: (value: boolean) => void;
}

export const SearchingPage: React.FC<IProps> = ({
  onShowLoader: showLoader,
}) => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [pagesNum, setPagesNum] = useState(0);
  const [text, setText] = useState("");

  const movieList = (): JSX.Element[] => {
    return movies.map((movie) => {
      return (
        <Grid item xs={12} md={6} key={movie.id}>
          <MovieCard {...movie} />
        </Grid>
      );
    });
  };

  useEffect(() => {
    const moviesUrl =
      text === ""
        ? `${baseAPI}movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
        : `${baseAPI}search/movie?api_key=${apiKey}&language=en-US&query=${text}&page=${page}`;

    showLoader(true);

    fetch(moviesUrl)
      .then((response) => response.json())
      .then((json) => {
        setMovies(
          json.results.sort((a: any, b: any) =>
            a.title < b.title ? -1 : a.title > b.title ? 1 : 0
          )
        );
        setPagesNum(json.total_pages);
      })
      .finally(() => showLoader(false));
    // eslint-disable-next-line
  }, [page, text]);

  return (
    <Box>
      <Box sx={{ width: "100%" }}>
        <TextField
          onChange={(e: {
            target: { value: React.SetStateAction<string> };
          }) => {
            setText(e.target.value);
          }}
          value={text}
          fullWidth
          label="Search"
          id="fullWidth"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Grid container rowSpacing={1}>
        {movieList()}
      </Grid>
      <Box mt={4}>
        <Divider />
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
