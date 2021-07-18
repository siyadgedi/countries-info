import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Weather from './Weather'
var emojiFlags = require('emoji-flags');
function App() {
  const [countries, setCountries] = useState([])
  const [newName, setNewName] = useState('');
  const [list, setlist] = useState([])
  const indivinfo = [];
  const filtercountries = (event) => { console.log(event.target.value); setNewName(event.target.value) };
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data)
    })
  }, [])
  const search = (sename) => {
    const result = [];
    countries.map((country) => {
      const { numericCode, name, population, region, capital, flag } = country
      let string = name.toLowerCase();
      let subs = sename.toLowerCase();
      if (string.indexOf(subs) !== -1) {

        result.push(name);
      }

    })
    if (result.length > 10) {
      return ["too long"];
    }
    return result;
  }

  return (
    <div className='background'>
      <div className='App'>
        <h1><b>🌍 Countries Around the World 🌍</b></h1>
        <p>Search for the name of any country below, and learn more about it!</p>
        <input value={newName} onChange={filtercountries} />
        <Names results={search(newName)} namer={newName} countries={countries}></Names>
      </div>
    </div>


  );
}
// const Name = (props) => {
//   return (
//     <div>
//       {props.name}
//     </div>
//   )
// }

const Names = (props) => {
  const llist = props.results;
  if (props.namer === "") {
    return (
      <div></div>
    )
  }
  else if (llist[0] === "too long") {
    return (
      <div>Too many matches, specify query</div>
    )
  }
  else if (llist.length === 1) {
    const getIndex = () => {
      let j = 0;
      for (var i = 0; i < props.countries.length; i++) {
        if (props.countries[i]['name'].toLowerCase() === llist[0].toLowerCase()) {
          j = i;
        }
      }
      return j;
    }
    const getLanguages = (items) => {
      for (var i = 0; i < props.countries[getIndex()]['languages'].length; i++) {
        const name = props.countries[getIndex()]['languages'][i]['name'];
        items.push(name);

      }
    }
    const index = getIndex();
    const items = [];
    getLanguages(items);
    
    return (
      <div className="country">
        <h2 style={{paddingTop: "0.5rem"}}>{llist[0]}</h2>
    <div><b>Capital: </b>{props.countries[index]['capital']}</div>
    <div><b>Population: </b>{props.countries[index]['population'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
        <ul style={{marginLeft: "-25px"}}><b>Languages: </b>
      {items.map((item, index) => {
          return <li key={index}>{item}</li>
        })}
        </ul>
        <img className="image" src={props.countries[index]['flag']} />
        <Weather index={index} countries={props.countries} />
      </div>

    )


  }
  else {
    const getFlag = (n) => {
      let j = 0;
      for (var i = 0; i < props.countries.length; i++) {
        if (props.countries[i]['name'].toLowerCase() === n.toLowerCase()) {
          j = i;
        }
      }
      return emojiFlags.countryCode(props.countries[j]["alpha2Code"]).emoji;
    }
    return (
      <div>
        <div>{llist.map((n) => (<div key={n}>{n + " " + getFlag(n)}</div>))}</div>
      </div>
    )
  }

}


export default App;
