import React from 'react'
import { View, FlatList } from 'react-native'
import { CareSignsForShow } from './CareSignsForShow'

export const CareSignsForShowList = ({ data }) => {

    let numColumns = 4
    return (
        <View>
        <FlatList
            numColumns={numColumns}
            data={data}
            keyExtractor={careSign => careSign.id.toString()}
            renderItem={({ item }) => <CareSignsForShow careSign={item}/>}
        />
        </View>
    )
}