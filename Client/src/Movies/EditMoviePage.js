import useStyles from '../Style/styles';
import { withStyles } from '@material-ui/core/styles';
import { PureComponent } from 'react';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import utils from '../AuthService/moviesUtils';
import moment from 'moment';

class EditMovieComp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isEdited : true,
      changed : false,
      name: this.props.location.state.Name,
      genres: this.props.location.state.Genres,
      img: this.props.location.state.Image,
      premiered: moment(this.props.location.state.Premiered).format("YYYY-MM-DD")
    }
  }

  componentDidUpdate(previousState, currentProps){
    this.setState({isEdited : (this.state !== currentProps && !this.state.changed? false : true)});    
  }

  updateMovie = async (e) => {
    e.preventDefault();
    let obj ={
      Name: this.state.name,
      Genres: this.state.genres,
      Image: this.state.img,
      Premiered: this.state.premiered
    };

    let resp = await utils.editMovie(this.props.location.state._id,obj);
    this.setState({ changed : resp });
  }

  render() {
    const { classes } = this.props;
    return (
        <Container component="main" maxWidth="xs" item xs='auto'>
        <form className={classes.form} onSubmit={e => this.updateMovie(e)}>
          <Typography component="h1" variant="h6" style={{ textAlign: 'center' }}>
            Edit Movie : {!this.state.changed? this.props.location.state.name : this.state.name}
          </Typography>
          {this.state.changed && <Typography variant="body1" gutterBottom style={{ textAlign: 'center', 
           backgroundColor: "#a5d6a7" }}> The data updated successfully!</Typography>}
         <TextField
            variant="outlined"
            margin="dense"
            label="Name"
            name="name"
            required
            value={this.state.name}
            autoFocus
            onChange={e => this.setState({ name: e.target.value })}
          />
          <TextField
            variant="outlined"
            margin="dense"
            label="Geners"
            name="geners"
            required
            value={this.state.genres}
            inputProps={{pattern:"[0-9a-zA-Z]+(,[0-9a-zA-Z]+)*" ,title:"gener,gener"}}
            onChange={e => this.setState({ genres: e.target.value.split(',') })}
          />
          <TextField
            variant="outlined"
            margin="dense"
            label="Image URL"
            name="img"
            required
            type="url"
            value={this.state.img}
            onChange={e => this.setState({ img: e.target.value })}
          />
          <TextField
            variant="outlined"
            margin="dense"
            name="date"
            label="Date"
            type="date"
            required
            value={this.state.premiered}
            onChange={e => this.setState({ premiered: e.target.value})}
            InputLabelProps={{shrink: true}}
          />
          <Grid container spacing={3} item xs>
            <Button
              type="submit"
              variant="contained"
              color="default"
              startIcon={<CloudUploadIcon />}
              size="small"
              disabled={this.state.isEdited}
              className={classes.btn}
            >
              Update
          </Button>
            <Button
              type="button"
              variant="contained"
              color="default"
              onClick={() => this.props.history.push('/MainPage/MoviesPage/AllMovies')}
              startIcon={<ClearOutlinedIcon />}
              size="small"
              className={classes.btn}
              style ={{marginLeft : "-10px"}}
            >
              Cancel
          </Button>
          </Grid>
        </form>
        </Container>
    )
  }
}
//HOC
export default withStyles(useStyles)(EditMovieComp);
