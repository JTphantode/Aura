import React from 'react'
import {useState} from 'react'
import Onboard from './components/Onboard/Onboard.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import './App.css'
const App = () => {
const [getData, setGetData] = useState(null)
const handleSubmitedData=(submitedData) => {
setGetData(submitedData)
}
  return (
    <div>
{!getData ?  <Onboard onFormSubmit={handleSubmitedData}/> :    (  <div>
<Navbar name={getData.name} tier={getData.tier} logoUrl={getData.logo} />
 </div> )}
   </div>
  )
}

export default App
