import * as Types from '../action.types';
const initialState = {
  language: "ita",
  user: null,
  loadingLoader: false,
  errorLoader: false,
  successLoader: false,
  errorMessage: '',
  successMessage: '',
  chatMessages:[]
};
const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.Language: {
      return {
        ...state,
        language: action.payload,
      };
    }
    case Types.USER_AUTH: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case Types.USER_LOADER: {
      return {
        ...state,
        loadingLoader: action.payload,
      };
    }
    case Types.ERROR_MODAL: {
      return {
        ...state,
        errorLoader: action.payload,
      };
    }

    case Types.SUCCESS_MODAL: {
      return {
        ...state,
        successLoader: action.payload,
      };
    }
    
    case Types.ERROR_MESSAGE: {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }
    case Types.SUCCESS_MESSAGE: {
      return {
        ...state,
        successMessage: action.payload,
      };
    }
    case Types.Messages: {
      return {
        ...state,
        chatMessages: action.payload,
      };
    }

    default:
      return state;
  }
};

export default AuthReducer;
