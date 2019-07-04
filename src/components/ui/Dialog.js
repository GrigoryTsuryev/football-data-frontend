import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import DialogItem from '../item/dialogitem'
import axios from 'axios'

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
     
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

class CustomizedDialogs extends React.Component {

    
  state = {
    open: false,
    data: []
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
    axios.get(`http://localhost:8000/api/competitions/${this.props.id}/standings/`)
    .then(res=>{ 
    
      if (res.data.standings !=null) {
        this.setState({data: res.data.standings[0].table})
      } else {
        this.setState({data: []})
      }
     
    })
      
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {name} = this.props

    return (

      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Explore
        </Button>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
           {name}
          </DialogTitle>
          <DialogContent dividers>
                <div id="mainContent" className="container" style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridGap: '10px', gridAutoRows: 'minMax(100px, auto)'}}>
                    { 
                      this.state.data.map((el,index) => 
                        <DialogItem
                           key={index}
                           draw={el.draw}
                           lost={el.lost}
                           points={el.points}
                           position={el.position}
                           won={el.won}
                           teamname={el.team.name}
                        ></DialogItem>)
                    }
                </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CustomizedDialogs;