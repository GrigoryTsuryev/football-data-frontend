import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CustomDialog from '../ui/Dialog'
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const MediaCard = (props) => {
    
  const classes = useStyles();

  const {name, country, id} = props
  
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
                 {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
                 {country}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <CustomDialog id={id} name={name}>
         
        </CustomDialog>
      </CardActions>
    </Card>
  );
}

export default MediaCard