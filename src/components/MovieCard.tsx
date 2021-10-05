import * as React from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { CardActionArea } from "@mui/material"
import { NavLink } from "react-router-dom"
import { makeStyles } from "@mui/styles"

interface Props {
  poster_path: string,
  title: string,
  id: number
}

const useStyles = makeStyles({
  root: {
      margin: '20px',
      width: '300px',
      height: '350px'
  },
  media: {
      height: '200px',
      width: '342px',
  },
  title: {
      padding: '15px'
  },
});

export const MovieCard: React.FC <Props> = ({ poster_path, title, id }) => {
  const classes = useStyles()

  return (
    <NavLink to={`/${id}`} 
      activeStyle={{
      color: "red"
      }}
    >
      <Card
        className={classes.root}
      >
        <CardActionArea>
          <CardMedia
            className={classes.media}
            component="img"
            height="140"
            image={`https://image.tmdb.org/t/p/w1280${poster_path}`} 
            alt={title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" className={classes.title}>
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </NavLink>
  )
}