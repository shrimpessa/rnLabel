import React from 'react'
import { Platform } from 'react-native'
import { HeaderButton } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'
import { APP_COLORS } from '../../enums/APP_COLORS'

export const AppHeaderIcon = props => (
    <HeaderButton 
        {...props}
        iconSize={24} 
        IconComponent={Ionicons}
        color={Platform.OS === 'android' ? APP_COLORS.WHITE : APP_COLORS.CYPRUS}
    />
)