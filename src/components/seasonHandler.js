import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';
import { APP_COLORS } from '../enums/APP_COLORS';

export const seasonHandler = season => {
    switch(season) {     
        case "summer":
          return <Feather style={{paddingRight: 10}} name="sun" size={24} color={APP_COLORS.YELLOW} />;
        case "autumnSpring":
          return <Entypo style={{paddingRight: 10}} name="leaf" size={24} color={APP_COLORS.ORANGE} />;
        case "winter":
          return <FontAwesome5 style={{paddingRight: 10}} name="snowflake" size={24} color={APP_COLORS.MERMAID_BLUE} />;
        default:
          return <FontAwesome5 style={{paddingRight: 10}} name="snowflake" size={24} color={APP_COLORS.MERMAID_BLUE} />;
    }
}