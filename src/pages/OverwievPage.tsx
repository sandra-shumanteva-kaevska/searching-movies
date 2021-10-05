import React, { useEffect, useState } from "react"
import { useParams} from "react-router-dom"
import {Box, Typography, Divider, Grid} from "@mui/material"
import ListItemButton from "@mui/material/ListItemButton"

import { MovieCard } from "../components/MovieCard"
import { baseAPI, apiKey } from "../config"

interface IShowLoader {
    showLoader:(value: boolean) => void
  }
  
  interface IMovieInfo {
    backdrop_path: string,
    title: string,
    id: number,
    vote_average: number,
    overview:string
  }

  interface ISimilarMovies {
    similarMovie:{
        poster_path: string,
        title: string,
        id: number
      }[]
  }

export const OverwievPage: React.FC<IShowLoader> = ({ showLoader }) => {
    const { id } = useParams<any>()

    const [movieInfo, setMovieInfo] = useState<IMovieInfo>
    ({backdrop_path: "", title: "", id: 0, vote_average: 0, overview:""})
    const [similarMovies, setSimilarMovies] = useState<ISimilarMovies["similarMovie"]>([])

    const similarMoviesList = () : JSX.Element[] =>{
        return similarMovies.map((similarMovie) => {
            return(
                <Grid item xs={6}>
                    <ListItemButton>
                        <MovieCard key={similarMovie.id} {...similarMovie}/>
                    </ListItemButton>
                </Grid>
                )
        })
    }
    
    useEffect(() => {
        const moviesUrlInfo = `${baseAPI}movie/${id}?api_key=${apiKey}&language=en-US`
        const similarMoviesUrl = `${baseAPI}movie/${id}/similar?api_key=${apiKey}&language=en-US&page=1`
        
        showLoader(true)

        fetch(moviesUrlInfo)
            .then(response => response.json())
            .then(json => setMovieInfo(json))
            .finally(() => showLoader(false))

        fetch (similarMoviesUrl)
            .then(response => response.json())
            .then(json => setSimilarMovies(json.results))
            .finally(() => showLoader(false))

        // eslint-disable-next-line 
    }, [id])
    return(
        <>
            <Box>
                <MovieCard poster_path={movieInfo.backdrop_path} title={movieInfo.title} id={movieInfo.id}/>
                <Typography variant="h5" style={{color:"red"}}>
                    Rating {movieInfo.vote_average}/10
                </Typography>
                <Typography paragraph={true}>
                    {movieInfo.overview}
                </Typography>
            </Box>
            <Divider/>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {similarMoviesList()}
            </Grid>
        </>
    )
}

