import React, {useState} from 'react';
import './App.css';


function App() {
  const [state, setState] = useState({
      username: '',
      email: '',
      items: []
    });

  const formSubmit = (e) => {
    e.preventDefault();
    let newItems = [...state.items, {
      username: state.username, 
      email: state.email
    }]

    setState({
      newItems,
      username: '',
      email: ''
    });
  };

  const inputChange = (e) => {
    let { name, value } = e.target

    setState({
    [name]: value
    })
  };

    return (
      <div className="App">
        <Form formSubmit={ formSubmit } inputChange={ inputChange } newUsername={ state.username } newEmail={ state.email }/>
        <Table items={ state.items }/>
      </div>
    );
}

function Table(props) {
    let {items} = props
    
    return (
      <div className="Table">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

function Form(props) {
    return (
      <div id="Form">
        <h3>Add user data:</h3>  
        <form onSubmit={props.formSubmit}>
          <input value={props.newUsername} type="text" name="username" onChange={props.inputChange} placeholder="Name" />
          <input value={props.newEmail} type="email" name="email" onChange={props.inputChange} placeholder="Email" />
          <button type="submit" value="Submit">Send</button>
        </form>
      </div>
    );
}



export default App;
