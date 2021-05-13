import React from 'react'
import { ImageBackground } from "react-native"
import { parseCareSignsString } from "./parseCareSignsString"

export const getCareSignPicture = (caresigns, allCareSigns) => {
    let arrayOfCareSignsIDs = parseCareSignsString(caresigns)
    let pictureSet = []
    allCareSigns.map(item => {
        arrayOfCareSignsIDs.map(s =>
            { if (item.id == s) {pictureSet.push(item.img)} }
        )
    })        
    return (
        pictureSet.map(i => {
            return <ImageBackground key={i + 10} style={{width: 60, height: 60}} source={{ uri: i }} />
        })
    )
}