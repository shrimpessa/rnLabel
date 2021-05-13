import { LOAD_CARE_SIGNS } from "../types"

const initialState = {
    allCareSigns: []
}

export const careSignsReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_CARE_SIGNS:
          return {
              ...state,
              allCareSigns: action.payload
          }
      default:
          return state
    }
  }