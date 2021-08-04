import useStyles from '../Style/styles';
import { withStyles } from '@material-ui/core/styles';
import { PureComponent } from 'react';
import { connect } from 'react-redux'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import WatchedComp from './SubsWatchedPage';
import utils from '../AuthService/moviesUtils';

class AllMoviesComp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userPermissions: this.props.data.permissions,
      filter: '',
      movies: [],
      filterMovies: [],
      page: 1,
      moviesPerPage: 3,
      msg: ''
    }
  }

  componentDidMount = async () => {
    const resp = await utils.getMovies();
    if (resp)
      this.setState({ movies: resp, filterMovies: resp });
  }

  componentDidUpdate(previousState, currentProps) {
    if (this.state.page !== currentProps.page || this.state.filter != currentProps.filter)
      this.setState({ msg: '' });
  }

  findMovie = () => {
    let res = this.state.movies.filter(item => (
      item.Name.toString().toLowerCase().startsWith(this.state.filter.toLowerCase()))
    );
    this.setState({ filterMovies: res, page: 1 });
  }

  deleteMovie = async (id, name) => {
    const resp = await utils.deleteMovie(id);
    if (resp.status === 200) {
      let sliceMovies = [...this.state.movies];
      let index = sliceMovies.map(movie => movie._id).indexOf(id);
      if (index > -1) {
        sliceMovies.splice(index, 1);
        if (this.state.filter) {
          let sliceFilterMovies = [...this.state.filterMovies];
          index = sliceFilterMovies.map(movie => movie._id).indexOf(id);
          if (index > -1) {
            sliceFilterMovies.splice(index, 1);
            this.setState({
              movies: sliceMovies,
              filterMovies: sliceFilterMovies,
              msg: "movie: " + name + " deleted succsfully!",
              page: (this.state.page > Math.ceil(sliceFilterMovies.length / this.state.moviesPerPage)
                && sliceFilterMovies.length > 0 ?
                Math.ceil(sliceFilterMovies.length / this.state.moviesPerPage) : this.state.page)
            });
          }
        }
        else {
          this.setState({
            movies: sliceMovies,
            filterMovies: sliceMovies,
            msg: "movie: " + name + " deleted succsfully!",
            page: (this.state.page > Math.ceil(sliceMovies.length / this.state.moviesPerPage)
              && sliceMovies.length > 0 ?
              Math.ceil(sliceMovies.length / this.state.moviesPerPage) : this.state.page)
          });
        }
      }
    }
  }

  handlePage = (event, value) => {
    this.setState({ page: Number.parseInt(value) });
  }

  render() {
    const { classes } = this.props;
    const moviesList = this.state.filterMovies.map((movie) => {
      const currentTime = new Date(movie.Premiered);
      return <div key={movie._id} style={{ border: "2px solid black" }}>
        <ListItem>
          <img src={movie.Image} style={{
            height: "70px", width: "60px", marginTop: "20px",
            marginRight: "15px"
          }} />
          <ListItemText
            primary={movie.Name + ", " + currentTime.getFullYear()}
            secondary={"genres: " + movie.Genres}
          />
        </ListItem>

        <Grid>
          <WatchedComp data={movie._id} />
        </Grid>

        <Button size="small" variant="contained" key={"edit" + movie._id}
          disabled={this.state.userPermissions.indexOf('Update Movies') == -1}
          onClick={() => this.props.history.push('/MainPage/MoviesPage/AllMovies/EditMovie/movie/' + movie._id, movie)}>
          <EditOutlinedIcon />
          Edit
        </Button>
        <Button size="small" variant="contained" key={"delete" + movie._id}
          disabled={this.state.userPermissions.indexOf('Delete Movies') == -1}
          onClick={() => this.deleteMovie(movie._id, movie.Name)}>
          <HighlightOffRoundedIcon />
          Delete
        </Button>
      </div>
    });

    // Logic for displaying movies
    const { page, moviesPerPage } = this.state;
    const indexOfLastMovie = page * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovie = moviesList.slice(indexOfFirstMovie, indexOfLastMovie);

    // Logic for displaying page numbers
    const pageNumbers = Math.ceil(moviesList.length / moviesPerPage);

    return (
      <div>
        {this.state.userPermissions.indexOf('View Movies') != -1 ? (
          <Container component="main" maxWidth="xs" item xs='auto'>
            <CssBaseline />
            <Grid container spacing={6}>
              <Grid item xs={1} style={{ marginTop: "-30px", marginLeft: "15px" }}>
                <label style={{ marginLeft: "40px" }} for="find" className={classes.btn}>Find A Movie:</label>
                <input name="find" type="search"
                  onChange={e => this.setState({ filter: e.target.value },
                    () => {
                      if (!this.state.filter)
                        this.setState({ filterMovies: this.state.movies });
                    })} />
                <Button size="small" variant="contained" onClick={this.findMovie} disabled={!this.state.filter}
                  style={{ marginTop: "-50px", marginLeft: "180px" }}> Find </Button>
              </Grid>
            </Grid>
            <Typography variant="body1" gutterBottom style={{
              textAlign: 'center',
              backgroundColor: "#a5d6a7"
            }}> {this.state.msg}</Typography>
            <List dense={true} className={classes.list}>
              {currentMovie}
            </List>
            <Typography>Page: {this.state.page}</Typography>
            <Pagination count={pageNumbers} page={this.state.page}
              onChange={this.handlePage} />
          </Container>
        ) :
          (
            <Typography style={{ textAlign: "center" }}>You don't have a permission to view this page!</Typography>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state
  }
}
//HOC
export default connect(mapStateToProps)((withStyles(useStyles)(AllMoviesComp)));
