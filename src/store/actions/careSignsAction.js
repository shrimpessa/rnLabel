import { CARE_SIGNS } from '../../careSignsPack'
import { LOAD_CARE_SIGNS } from '../types'

export const loadCareSigns = () => {
    return{
        type: LOAD_CARE_SIGNS,
        payload: CARE_SIGNS
    }
}