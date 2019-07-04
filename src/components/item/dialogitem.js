import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function DialogItem(props) {
  const classes = useStyles();
  const {teamname, draw, lost, points, position, won }=props
  
  return (   
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {teamname}
        </Typography> {
            console.log(props == null)
        }
        <Typography variant="body2" component="p" >
      Draw  - {draw}, 
      Lost  - {lost},
      Poinst  - {points},
      Position  - {position},
      Won  - {won}
       </Typography> 
      </CardContent>
      
    </Card>
  );
}