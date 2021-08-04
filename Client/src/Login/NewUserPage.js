import useStyles from '../Style/styles';
import { withStyles } from '@material-ui/core/styles';
import { Component } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {Link} from 'react-router-dom'
import authSrv from '../AuthService/userAuth';

const baseUrl = "http://localhost:3000/api/cinema/users";

class NewAccComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName : '',
      password : '',
      failCreate : false
    }
  }

  createNewUser = async (e) =>
  {
    e.preventDefault();
    debugger;
    let resp = await authSrv.validateUser(this.state.userName);
    //user exist in db and first time register (empty password)
    if(resp.status === 200){
      await authSrv.register(resp.data, this.state.password);
      this.props.history.push('/');
    } 
    else this.setState({failCreate : true});
  }

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs" item xs='auto'>
      <CssBaseline />
      <div className={classes.paper}>
      { this.state.failCreate && 
       <p style ={{color : "red"}}>
        Your user name could not be verified, or you've already been registered.
        </p>}
        <Avatar className={classes.avatar}>
          <LockOpenIcon/>
        </Avatar>
        <Typography component="h1" variant="h5" >
          Create An Account
        </Typography>
        <form className={classes.form} onSubmit={e => this.createNewUser(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoFocus
            onChange={e => this.setState({userName : e.target.value})}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            onChange={e => this.setState({password : e.target.value})}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create
          </Button>
          <Link variant="body2" to="/">Back</Link>
        </form>
      </div>
    </Container>
   )
  }
}
//HOC
export default withStyles(useStyles)(NewAccComp);
