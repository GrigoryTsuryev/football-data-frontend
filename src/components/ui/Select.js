import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const Filter = (props) =>{
   
    
  const {filterby, elements, onChange} = props

  
  const classes = useStyles();
  const [filter, setFilter] = React.useState('');
  const [open, setOpen] = React.useState(false);
  
  
  function handleClose(event) {
    setFilter(event.target.innerHTML.replace('<em>','').split('</em>')[0])
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  return (
    <form autoComplete="off">
      <Button className={classes.button} onClick={handleOpen}>
            Filter by {filterby}
      </Button>
      <FormControl className={classes.formControl} >
        <InputLabel htmlFor="open-select">{filterby}</InputLabel>
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={filter}
          onChange={onChange}
          inputProps={{
            name: filterby,
            id: 'open-select',
          }}
        >
        <MenuItem value="" key="none">
                    <em>None</em>
                </MenuItem>
        {
            elements.map((el, index) =>
                <MenuItem value={el} key={index} >
                 <em>{el}</em>
                </MenuItem>)          
        }
          
        </Select>
      </FormControl>
    </form>
  );
}

export default  Filter