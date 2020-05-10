import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'
import logoImg from '../../assets/logo.svg'
import './style.css'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsApp] = useState('')
    const [city, setCity] = useState('')
    const [UF, setUF] = useState('')
    const history = useHistory('')

    async function handleRegister(event) {
        event.preventDefault()
        const data = {
            name,
            email,
            whatsapp,
            city,
            UF
        }

        try {
            const response = await api.post('ongs', data);

            alert(`Acess ID ${response.data.id}`)
            history.push('/')
        }catch (err) {
            alert('error, try again later!')
            console.log('Reason for the error is: ', err)
        }
    }

    return(
        <div className='register-container'>
            <div className='content'>
                <section>
                    <img src={logoImg} alt="logo"/>

                    <h1>Register</h1>
                    <p>Make your registration, enter the platform and help people find your ONG's cases.</p>
                    <Link className='back-link' to='/'>
                        <FiArrowLeft size={16} color='#E02041' />
                        I already have registration
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input
                      type='text'
                      placeholder='Name from ONG'
                      value={name}
                      onChange={event => setName(event.target.value)}
                    />
                    <input
                      type='email'
                      placeholder='E-mail'
                      value={email}
                      onChange={event => setEmail(event.target.value)}
                    />
                    <input
                      type='text'
                      placeholder='WhatsApp'
                      value={whatsapp}
                      onChange={event => setWhatsApp(event.target.value)}
                    />
                    <div className="input-group">
                      <input
                        type='text'
                        placeholder='City'
                        value={city}
                        onChange={event => setCity(event.target.value)}
                      />
                      <input
                        type='text'
                        placeholder='UF'
                        value={UF}
                        onChange={event => setUF(event.target.value)}
                      />
                    </div>

                    <button className='button' type='submit'>Register</button>
                </form>
            </div>
        </div>
    )
}

