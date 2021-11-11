import logo from './logo.svg';
import './App.css';
import 'bulma/css/bulma.min.css';
import { Link, withRouter, useHistory } from "react-router-dom";
import axios from "axios";


function App() {

  let name ='';
  let email='';
  let phone='';
  let gender = '';
  let id='';
  let result;
  let loading_result;
  localStorage.setItem("isAuth", "false");
  localStorage.setItem("isAuth2", "false");

  const history = useHistory();

  function handleChange_name(event) {
    name = event.target.value
    console.log(event.target.value);
    // result = { "name": name, "email": email, "phone": phone, "gender": gender };
  }
  function handleChange_email(event) {
    email = event.target.value
    console.log(event.target.value);
    // result = { "name": name, "email": email, "phone": phone, "gender": gender };
  }
  function handleChange_phone(event) {
    phone = event.target.value
    console.log(event.target.value);
    // result = { "name": name, "email": email, "phone": phone, "gender": gender };
  }
  function handleChange_gender(event) {
    gender = event.target.value
    console.log(event.target.value);
    // result = { "name": name, "email": email, "phone": phone, "gender": gender };
  }

  function handleChange_id(event) {
    id = event.target.value
    console.log(event.target.value);
  }


  const handleGET = e => {
    e.preventDefault();

    const request = new Request('http://localhost:8080/api/contacts', {
      method: 'GET'
    });

    fetch(request)
    .then(response => {
      console.log("level1-check");
      if (response.status === 200) {
        loading_result = response.status;
        return response.json();
      } 
      else if (response.status === 400) {
        
        loading_result = response.status;
        console.log("err400-check");
      }
      else {
        console.log(response.status);
        throw new Error('Something went wrong on api server!');
      }
    })
    .then((json) => {
      if (loading_result === 200) {

        console.log("working normal-check");
        console.log(json);

        alert("GET Request Sent, here is the api feedback message: " + json.message);
        window.open("http://localhost:8080/api/contacts");
        return json.accessToken;
      } else if (loading_result === 400) {
        console.log("err400-check");
      }
      else {;
        throw new Error('Something went wrong on api server!');
      }
        
      }).catch((error) => {
        console.error(error);
      });

  }
  const handlePOST = e => {
    e.preventDefault();

   {

      const body = { "name": name, "email": email, "phone": phone, "gender": gender };

      axios.post('http://localhost:8080/api/contacts', body)
        .then(response => {
          console.log("level1-check");
          if (response.status === 200) {
            loading_result = response.status;
            console.log(response);
            alert("POST Request Sent, here is the api feedback message: " + response.data.message);
            window.open("http://localhost:8080/api/contacts");
          
          } else if (response.status === 400) {
        
            console.log("err400-check");
          }
          else {
            console.log(response.status);
            throw new Error('Something went wrong on api server!');
          }
        })
    }
  }
  const handleDELETE = e => {
    e.preventDefault();

    if (id.length == 0) {
      alert("please input an id first to indicate which employee detail you want to delete");
    } else {
      axios.delete(`http://localhost:8080/api/contacts/${id}`)
        .then(response => {
          console.log("level1-check");
          if (response.status === 200) {
            loading_result = response.status;
            console.log(response);
            alert("DELETE Request Sent, here is the api feedback message: " + response.data.message);
            window.open("http://localhost:8080/api/contacts");
          
          } else if (response.status === 400) {
        
            console.log("err400-check");
          }
          else {
            console.log(response.status);
            throw new Error('Something went wrong on api server!');
          }
        })
    }
  }
  const handlePUT = e => {
    e.preventDefault();

    if (id.length == 0) {
      alert("please input an id first to indicate which employee detail you want to update");
    } else {

      const body = { "name": name, "email": email, "phone": phone, "gender": gender };

      axios.put(`http://localhost:8080/api/contacts/${id}`, body)
        .then(response => {
          console.log("level1-check");
          if (response.status === 200) {
            loading_result = response.status;
            console.log(response);
            alert("PUT Request Sent, here is the api feedback message: " + response.data.message);
            window.open("http://localhost:8080/api/contacts");
          
          } else if (response.status === 400) {
        
            console.log("err400-check");
          }
          else {
            console.log(response.status);
            throw new Error('Something went wrong on api server!');
          }
        })
    }
  }
  return (
    <div className="App">
      <div className="container">
        
      <p className="title">My Employee Details Management App</p>
        <div className="columns">
          <div className="column">
            <form class="box">
            <button class="button is-success" onClick={handleGET}>GET</button><br /><br />
            </form>

            <form class="box">
            <input className="input" style={{marginBottom: "10px"}} autocomplete="false" type="text" placeholder="Name" onChange={handleChange_name}></input>
             <input className="input" style={{marginBottom: "10px"}} autocomplete="false" type="text" placeholder="Email" onChange={handleChange_email}></input>
             <input className="input" style={{marginBottom: "10px"}} autocomplete="false" type="text" placeholder="Phone Number (Optional)" onChange={handleChange_phone}></input>
             <input className="input" style={{marginBottom: "10px"}} autocomplete="false" type="text" placeholder="Gender (Optional)" onChange={handleChange_gender}></input>
            
            <button class="button is-info" onClick={handlePOST}>POST</button><br /><br />
            </form>
          </div>
          
            <div className="column">
            <form class="box">
            <input className="input" style={{marginBottom: "10px"}} autocomplete="false" type="text" placeholder="Employee Detail ID (For DELETE)" onChange={handleChange_id}></input>
            <button class="button is-danger" onClick={handleDELETE}>DELETE</button><br /><br />
            </form>
            
            
            <form class="box">
            <input className="input" style={{ marginBottom: "10px" }} autocomplete="false" type="text" placeholder="Employee Detail ID (For PUT)" onChange={handleChange_id}></input>
            <input className="input" style={{marginBottom: "10px"}} autocomplete="false" type="text" placeholder="Name" onChange={handleChange_name}></input>
             <input className="input" style={{marginBottom: "10px"}} autocomplete="false" type="text" placeholder="Email" onChange={handleChange_email}></input>
             <input className="input" style={{marginBottom: "10px"}} autocomplete="false" type="text" placeholder="Phone Number (Optional)" onChange={handleChange_phone}></input>
             <input className="input" style={{marginBottom: "10px"}} autocomplete="false" type="text" placeholder="Gender (Optional)" onChange={handleChange_gender}></input>
            
            <button class="button is-warning" onClick={ handlePUT}>PUT</button><br/><br/>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
