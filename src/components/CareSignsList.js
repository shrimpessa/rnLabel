import React from 'react'
import { View, FlatList } from 'react-native'
import { CareSign } from './CareSign'

export const CareSignsList = ({ data, onCareSignPress }) => {

    let numColumns = 4
    return (
        <View>
        <FlatList
            numColumns={numColumns}
            data={data}
            keyExtractor={careSign => careSign.id.toString()}
            renderItem={({ item }) => <CareSign careSign={item} onCareSignPress={onCareSignPress} />}
        />
        </View>
    )
}