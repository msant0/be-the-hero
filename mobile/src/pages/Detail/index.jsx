import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import * as MailComposer from 'expo-mail-composer'
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native'

import logoImg from '../../assets/logo.png'
import styles from './styles'

export default function Detail () {
  const navigation = useNavigation()
  const route = useRoute()

  const { incident } = route.params

  const incidentValue = Intl.NumberFormat
  ('pt-BR',
    {
      style: 'currency',
      currency: 'BRL',  
    }).format(incident.value)

  const message = `Hello ${incident.name}, I'm getting in touch because I would like to help in the case "${incident.title}", with value of ${incidentValue}.`;

  function navigateBack () {
    navigation.goBack()
  }

  function sendMail () {
    MailComposer.composeAsync({
      sender: [incident.email],
      to: [incident.email],
      subject: `Hero the case: ${incident.title}`,
      recipients: [incident.email],
      body: message
    });
  }

  function sendZap () {
    Linking.openURL(
      `whatsapp://send?phone=${incident.whatsapp}&text=${message}`
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={navigateBack}>
          <Feather name='arrow-left' size={28} color='#E02041' />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text
          style={[
            styles.incidentProperty,
            {
              marginTop: 0
            }
          ]}
        >
          ONG:{' '}
        </Text>
        <Text style={styles.incidentValue}>
          {incident.name} from {incident.city}/{incident.UF}
        </Text>

        <Text style={styles.incidentProperty}> Case: </Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}> Value: </Text>
        <Text style={styles.incidentValue}>
          {' '}
          {incidentValue}
        </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>
          Save the day
        </Text>
        <Text style={styles.heroTitle}>
          Be the hero of this case
        </Text>
        <Text style={styles.heroDescription}>
          Contact
        </Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendZap}>
            <Text style={styles.actionText}>
                WhatsApp
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>
                E-mail
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
