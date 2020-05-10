import React, { useState, useEffect} from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { View, Text, Image, TouchableOpacity, FlatList, } from 'react-native'

import api from '../../services/api'
import logoImg from '../../assets/logo.png'
import styles from './styles'


export default function Incidents() {
    const [incidents, setIncidents] = useState([])
    const [total, setTotal] = useState(0)
    
    const [page, setPage] = useState(1)
    const [load, setLoad] = useState(false)

    const navigation = useNavigation()

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident })
    }

    async function loadIncidents() {
        if (load) {
            return
        }

        if(total > 0 && incidents.length == total){
            return
        }

        setLoad(true)

        const response = await api.get('incidents', { params: { page }})

        setIncidents([...incidents, ...response.data])
        setTotal(response.headers['x-total-count'])

        setPage(page + 1)
        setLoad(false)
    }

    useEffect(() => {
        loadIncidents()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                  Total {' '}
                  <Text styles={styles.headerTextBold}>
                      {total}
                      {' '}
                      cases
                  </Text>
                </Text>
            </View>
            <Text style={styles.title}>Welcome!</Text>
            <Text>
                Choose a case and be a hero
            </Text>

            <FlatList
                data={incidents}
                style={styles.incidentList}
                keyExtractor={(incident) => String(incident.id)}
                showsVerticalScrollIndicator
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident}) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG: </Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>
                        <Text style={styles.incidentProperty}>Case: </Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>
                        <Text style={styles.incidentProperty}>Value: </Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR',{
                                style: 'currency',
                                currency: 'BRL',
                            }).format(incident.value)}
                        </Text>

                        <TouchableOpacity
                          style={styles.detailButton}
                          onPress={()=> navigateToDetail(incident)}
                        >
                        
                        <Text style={styles.detailsButtonText}>See more details</Text>

                        <Feather name="arrow-right" size={16} color="#E04041" />
                        </TouchableOpacity>
                    </View>
                )} />
        </View>
    )
}