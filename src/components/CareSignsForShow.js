import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from 'react-native'

import { APP_COLORS } from '../enums/APP_COLORS'

export const CareSignsForShow = ({ careSign }) => {  

    return (        
        <TouchableOpacity activeOpacity={0.7} >
            <View style={styles.post}>
                <ImageBackground style={styles.image} source={{ uri: careSign.img }}>
                    <View />
                </ImageBackground>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  post: {
    paddingHorizontal: '6%',
    paddingVertical: 4
  },
  image: {
    width: 60,
    height: 60,
  },
  itemPressed: {
    opacity: 0.3,
    backgroundColor: APP_COLORS.ORANGE,
    paddingVertical: 5,
    alignItems: 'center',
    width: '100%',
    height: '100%'
  }
})