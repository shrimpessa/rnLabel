export const parseCareSignsString = caresignsString => {
    let array = caresignsString.split('#')
    let uniqueArray = array.filter(function(item, pos) {
        return array.indexOf(item) == pos
    })
    return uniqueArray
}