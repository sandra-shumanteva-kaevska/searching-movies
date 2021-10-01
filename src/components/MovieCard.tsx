import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

interface Props {
  poster_path: string,
  title: string,
  id: number
}

export const MovieCard: React.FC <Props> = ({ poster_path, title, id }) => {
  return (
    <Card sx={{ maxWidth: 345 }} >
      <CardActionArea href ={`/movie/${id}`}>
        <CardMedia
          component="img"
          height="140"
          image={`https://image.tmdb.org/t/p/w1280${poster_path}`} 
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}