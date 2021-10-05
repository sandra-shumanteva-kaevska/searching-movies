import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";

interface IProps {
  poster_path: string;
  title: string;
  id: number;
}

const useStyles = makeStyles({
  root: {
    margin: "20px",
    width: "100%",
    height: "100%",
    textDecoration: "none",
  },
  card: {
    height: "100%",
  },
  media: {
    height: "250px",
  },
  title: {
    padding: "15px",
  },
});

export const MovieCard: React.FC<IProps> = ({ poster_path, title, id }) => {
  const classes = useStyles();

  return (
    <NavLink
      className={classes.root}
      to={`/${id}`}
      activeStyle={{
        color: "red",
        textDecoration: "underline",
      }}
    >
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            component="img"
            image={`https://image.tmdb.org/t/p/w1280${poster_path}`}
            alt={title}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className={classes.title}
            >
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </NavLink>
  );
};
