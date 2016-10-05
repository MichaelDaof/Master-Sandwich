import React, {Component} from 'react';
import {Text, View, TextInput, AsyncStorage, TouchableHighlight, AlertIOS, ActivityIndicator} from 'react-native';
import t from 'tcomb-form-native';
import AdventureSolution from './AdventureSolution';
import MyAdventures from './myAdventuresContainer';
import MenuButton from '../nav/MenuButton'
// Riddle Submission Form
var Form = t.form.Form;

var Solution = t.struct({solution: t.String});

//console.log('$$$$$$$$$', this.props.id);

// Submission Component
var Submission = React.createClass({


  componentWillMount() {
    this.setState({
      waiting: false
    });
  },

  setSpinner() {
    this.setState({
      waiting: !this.state.waiting
    })
  },

  clearForm() {
    this.setState({input: null});
  },

  toRiddles() {
    //this.props.nav.reset();
    // this.props.resetToRoute({
    //   name: "My Adventures",
    //   component: MyAdventures,
    //   leftCorner: MenuButton
    // });
    this.props.nav.toBack();
  },

  submitAnswer() {
    this.clearForm();
    var input = this.refs.form.getValue();
    console.log('PROPS: ', this.props)
    console.log('answer ', this.props.answer)
    console.log('input ', input.solution)
    var riddleNumber = this.props.num - 1 ;

    if (input.solution === this.props.answer) {
      this.setSpinner();
      AsyncStorage.getItem('id_token')
        .then(token=>{
          fetch("https://treasure-trek.herokuapp.com/api/updateProgress", {
            method: "PUT",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-access-token': token
            },
            body: JSON.stringify({
              adventureid: this.props.id,    //Adventure ID
              riddleNumber: riddleNumber, //Riddle # is zero index based
            })
          }).then(function(res){
            return res.json()
          }).then((data)=> {
            this.setSpinner();
            // Reroute Navigation To Home
            this.props.completion = true;
            this.props.updateCompletion();
            AlertIOS.alert( "CORRECT! \n \n " + {data} +" points!" );
            this.toRiddles();

            // console.log('Posted! Data Response: ', data);

          }).catch((error)=> {
            console.error("ERROR: ", error);
            this.handleError();
          }).done();
      });
    } else {
      AlertIOS.alert( "Nice guess, but wrong answer. Try again." );

    }
  },

 handleError () {
  AsyncStorage.removeItem('id_token')
    .then(()=>{
      this.errorRedirectToLogin("No Session - Redirecting");
    }).catch(error => {
      console.log('AsyncStorage error: ' + error.message);
      this.errorRedirectToLogin("Internal Error - Redirecting")
    });
  },

  errorRedirectToLogin (message) {
    AlertIOS.alert(message);
    this.props.resetToRoute({
      name: "Login",
      component: Auth
    });
  },

  showInputField () {
    return (
      <View>
        <View style={styles.row}>
          <Form
            ref="form"
            type={Solution}
            autoCorrect={false}
            autoCapitalize={'none'}
          />
        </View>
        {this.state.waiting ?
          <ActivityIndicator /> :
          <View style={styles.row}>
            <TouchableHighlight style={styles.button}
              onPress={this.submitAnswer}
              underlayColor='#99d9f4'
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableHighlight>
          </View>
        }
      </View>
    )
  },

  showAnswer () {
    return (
      <View>
        <Text style={styles.riddle}> Answer: </Text>
        <Text style={styles.riddle}> {this.props.answer} </Text>
      </View>
    )
  },

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.riddleContainer}>
          <Text style={styles.title}>Riddle Details</Text>
          <Text style={styles.riddle}> {this.props.riddle} </Text>
        </View>

        {this.props.completion ? this.showAnswer() : this.showInputField()}

      </View>
    );
  }
});


const styles = {
  viewStyle: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
    paddingTop: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2 },
    shadowOpacity: 0.9,
    elevation: 2,
    position: 'relative'
  },
  textStyle1: {
    fontSize: 12,
  },
  textStyle2: {
    fontSize: 8,
  },
  submitStyle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  },
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  riddleContainer: {
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  riddle: {
    fontSize: 16,
    alignSelf: 'center',
    marginBottom: 30,
    fontFamily: 'Helvetica',
    padding: 5
  },
  title: {
    fontSize: 32,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
}

// Make componenet available for other parts of the app
export default Submission;

