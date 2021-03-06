import React, { Component } from "react"; 
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom'; // use to pass router history to authAction
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authAction';
import TextFieldGroup from '../common/TextFieldGroup.js';
import Dev from '../../img/Dev.png';
class Register extends Component {
    constructor(){
        super();
        this.state={
            name: '',
            email: '',
            password:'',
            password2:'',
            errors:{}
        }
     this.onChange=this.onChange.bind(this);   
     this.onSubmit=this.onSubmit.bind(this);   
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            })
        }
    }
    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }
    onSubmit=(e)=>{
        e.preventDefault();
        const newUser={
            name: this.state.name,
            email:this.state.email,
            password: this.state.password,
            password2:this.state.password2
        }
        this.props.registerUser(newUser,this.props.history); 
       
    }
  render() {
    const {errors}=this.state;
   // const {user}=this.props.auth;
    return (
        <div className="register">
            <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto text-center">
                <span className="display-4 peach-gradient" style={{color:'#1c2331'}}><img style={{height:'120px',width:'120px'}} alt="DevHub_logo" src={Dev} />Hub</span>
                <p className="lead text-center">Create your DevHub account</p>
                <form onSubmit={this.onSubmit} className="text-left">
                    <TextFieldGroup
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    errors={errors.name}
                    />
                    <TextFieldGroup
                    placeholder="Email Address"
                    name="email"
                    type="email"
                    info="This site uses Gravatar so if uoy want profile image use gravatar email"
                    value={this.state.email}
                    onChange={this.onChange}
                    errors={errors.email}
                    />
                    <TextFieldGroup
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    errors={errors.password}
                    />
                    <TextFieldGroup
                    placeholder="Confirm Password"
                    name="password2"
                    type="password"
                    value={this.state.password2}
                    onChange={this.onChange}
                    errors={errors.password2}
                    />
                    <input type="submit" value="SignUp" className="btn peach-gradient btn-rounded btn-block mt-4" />
                </form>
                </div>
            </div>
            </div>
        </div>
    );
  }
} 
// required to tel react about new props types,-- not necessary but good practice
Register.propTypes={
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStateToProps=(state)=>({
    auth: state.auth,
    errors: state.errors
});
export default connect(mapStateToProps ,{registerUser})(withRouter(Register));