import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import {FiLogIn} from 'react-icons/fi'
import api from '../../services/api'
import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'
import './styles.css'

export default function Logon () {
  const [id, setId] = useState('')
  const history = useHistory()

  async function handleSubmit (event){
    event.preventDefault()

    try {
      const response = await api.post('sessions', { id })

      localStorage.setItem('ongID', id)
      localStorage.setItem('ongName', response.data.name)

      history.push('/profile')
    } catch (err){
      window.alert('Login Failed, try again!')
      console.log('Reason for the error is: ', err)
    }
  }

  return (
    <div className='logon-container'>
      <section className='form'>
        <img src={logoImg} alt='logo' />

        <form onSubmit={handleSubmit}>
          <h1>Log In</h1>

          <input 
          placeholder='Your ID' onChange={e=> setId(e.target.value)} value={id}
          />
          <button className='button' type='submit'>Enter</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            I don't have a registration
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="heroes" />
    </div>
  )
}
