import React, {useEffect,useState} from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import api from '../../services/api'
import './styles.css'
import logoImg from '../../assets/logo.svg';

export default function Profile () { 
   const history = useHistory()
   const [incidents, setIncidents] = useState([])
   const ongName = localStorage.getItem('ongName')
   const ongId = localStorage.getItem('ongId')

   useEffect(() =>{
      api.get('/profile', {
         headers: {
            Authorization: ongId
         }
      })
      .then(response => {
         setIncidents(response.data)
      })
   }, [ongId])

   function handleLogOut(){
      localStorage.clear()
      
      history.push('/')
   }

   return (
      <div className='profile-container'>
         <header>
            <img src={logoImg} alt='logo'/>
            <span>Welcome, {ongName}</span>
            
            <Link className='button' to='/incidents/new'>
               Register new case
            </Link>
            <button type='button' onclick={handleLogOut}>
               <FiPower size={18} color='#E02041' />
            </button>
         </header>

         <h1>Registered Cases</h1>

         <ul>
            {incidents.map(incident => (
               <li key={incident.id}>
                  <strong>Case: </strong>
                  <p>{incident.title}</p>

                  <strong>Description: </strong>
                  <p>{incident.description}</p>
               </li>
            ))}
         </ul>
      </div>
   )
}