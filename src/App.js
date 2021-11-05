import React, {useState} from 'react';
import './App.css';


function App() {

  const [state, setState] = useState({
      username: '',
      email: '',
      items: []
    });

  const [stateError, setStateError] = useState({
      userNameError: '',
      emailError: ''
  });


  let validate = () => {
    let userNameError = '';
    let  emailError = '';
    if (!state.username) {
      userNameError = 'Name cannot be blank';
    };
    if (!state.email.includes('@')) {
      emailError = 'Incorrect Email';
    };
    if (userNameError || emailError) {
      setStateError({userNameError, emailError});
      return false;
      
    };
    return true;
  };

  const formSubmit = (e) => {
  e.preventDefault();
  const isValid = validate();
    if (isValid) {
      let newItems = [...state.items, {
        username: state.username, 
        email: state.email
      }]
      setState({
        items: newItems,
        username: '',
        email: ''
      });
      setStateError({
        userNameError: '',
        emailError: ''
      })
    };
    
  };

  const inputChange = (e) => {
    let { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value 
    }));
    
  };

  const removeUserData = index => {
		const reducedItems = state.items.filter((item, itemIndex) => {
      return itemIndex !== index
    });
    setState({
      items: reducedItems,
      username: '',
      email: ''
    })
	}

    return (
      <div className="App">
        <Form formSubmit={ formSubmit } 
        inputChange={ inputChange } 
        newUsername={ state.username } 
        newEmail={ state.email }
        userNameErrorValue={ stateError.userNameError }
        emailErrorValue={ stateError.emailError } />
        
        <Table items={ state.items } 
          removeUserData={ removeUserData } />
      </div>
    );
};



function Table(props) {
    let {items} = props
    
    return (
      <div className="Table">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Del</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>
                    <button onClick={() => {props.removeUserData(index)}}>X</button>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

function Form(props) {
    return (
      <div id="Form">
        <h3>Add user data:</h3>  
        <form onSubmit={props.formSubmit}>
          <input value={props.newUsername} type="text" name="username" onChange={props.inputChange} placeholder="Name" />
          <div className="ErrorMessage">{props.userNameErrorValue}</div>
          <input value={props.newEmail} type="email" name="email" onChange={props.inputChange} placeholder="Email" />
          <div className="ErrorMessage">{props.emailErrorValue}</div>
          <button type="submit" value="Submit">Send</button>
          
        </form>
      </div>
    );
};



export default App;
