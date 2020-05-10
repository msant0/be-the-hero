import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'
import './style.css'
import api from '../../services/api'

export default function NewIncident() {
    const history = useHistory()
    const ongId = localStorage.getItem('ongId')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')

    return (
        <div className='new-incident-container'>
            <div className='content'>
                <section>
                    <img src={logoImg} alt='logo'/>

                    
                    <h1>Register new case</h1>
                    <p>Describe the case in detail to find a hero to solve this</p>

                    <Link className='back-link' to='/profile'>
                        <FiArrowLeft size={16} color='#E02041' />
                        Back to home
                    </Link>
                </section>
            </div>
        </div>
    )
}