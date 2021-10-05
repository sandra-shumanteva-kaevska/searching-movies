import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Divider, Grid } from "@mui/material";

import { MovieCard } from "../components/MovieCard";
import { baseAPI, apiKey } from "../config";
import { IMovie } from "../types/Movie";

interface IProps {
  onShowLoader: (value: boolean) => void;
}

export const OverviewPage: React.FC<IProps> = ({ onShowLoader }) => {
  const { id } = useParams<any>();

  const [movieInfo, setMovieInfo] = useState<IMovie>({
    backdrop_path: "",
    poster_path: "",
    title: "",
    id: 0,
    vote_average: 0,
    overview: "",
  });

  const [similarMovies, setSimilarMovies] = useState<IMovie[]>([]);

  const similarMoviesList = (): JSX.Element[] => {
    return similarMovies.map((similarMovie) => {
      return (
        <Grid item xs={12} md={6} key={similarMovie.id}>
          <MovieCard {...similarMovie} />
        </Grid>
      );
    });
  };

  useEffect(() => {
    const moviesUrlInfo = `${baseAPI}movie/${id}?api_key=${apiKey}&language=en-US`;
    const similarMoviesUrl = `${baseAPI}movie/${id}/similar?api_key=${apiKey}&language=en-US&page=1`;

    onShowLoader(true);

    fetch(moviesUrlInfo)
      .then((response) => response.json())
      .then((json) => setMovieInfo(json))
      .finally(() => onShowLoader(false));

    fetch(similarMoviesUrl)
      .then((response) => response.json())
      .then((json) => setSimilarMovies(json.results))
      .finally(() => onShowLoader(false));

    // eslint-disable-next-line
  }, [id]);

  return (
    <>
      <Box>
        <Typography variant="h4">Overview</Typography>
        <img
          src={`https://image.tmdb.org/t/p/w1280${movieInfo.backdrop_path}`}
          alt={movieInfo.title}
          style={{ objectFit: "cover", maxHeight: "400px", width: "100%" }}
        />
        <Typography variant="h5" style={{ color: "red" }}>
          Rating {movieInfo.vote_average}/10
        </Typography>
        <Typography paragraph={true}>{movieInfo.overview}</Typography>
      </Box>
      <Divider />
      <Typography variant="h4">Similar movies</Typography>
      <Grid container rowSpacing={1}>
        {similarMoviesList()}
      </Grid>
    </>
  );
};
