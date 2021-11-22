import * as Types from '../action.types';
import axios from 'axios';
import { SUCCESS_MESSAGE } from '../action.types';

export const Languageswitch = language => {
  return {
    type: Types.Language,
    payload: language,
  };
};
export const saveUser = user => {
  return {
    type: Types.USER_AUTH,
    payload: user,
  };
};
export const LoadingLoader = value => {
  return {
    type: Types.USER_LOADER,
    payload: value,
  };
};

export const ErrorLoader = value => {
  return {
    type: Types.ERROR_MODAL,
    payload: value,
  };
};
export const successModal = value => {
  return {
    type: Types.SUCCESS_MODAL,
    payload: value,
  };
};
export const errorModal = value => {
  return {
    type: Types.ERROR_MODAL,
    payload: value,
  };
};
export const errorMessage = message => {
  return {
    type: Types.ERROR_MESSAGE,
    payload: message,
  };
};
export const successMessage = message => {
  return {
    type: Types.SUCCESS_MESSAGE,
    payload: message,
  };
};
export const userMessages = message => {
  return {
    type: Types.Messages,
    payload: message,
  };
};
const login = (data) => {
  return async dispatch => {
      dispatch(LoadingLoader(true))
      await axios
        .post('login', data)
        .then(function (response) {
          if (response?.status == 200) {
            dispatch(saveUser(response.data));
            dispatch(LoadingLoader(false));
          }
        })
        .catch(function (error) {
          dispatch(LoadingLoader(false));
           dispatch(errorModal(true));
           dispatch(saveUser(null));
          dispatch(errorMessage(error?.response?.data?.message?error?.response?.data?.message:'Server error'));
        });
    
  };
};
const SignUp = (data) => {
  return async dispatch => {
      dispatch(LoadingLoader(true))
      await axios
        .post('register', data)
        .then(function (response) {
          if (response?.status == 200) {
            dispatch(saveUser(response.data));
            dispatch(LoadingLoader(false));
          
          }
        })
        .catch(function (error) {
          console.log("Error-->",error?.response?.data);
          dispatch(LoadingLoader(false));
           dispatch(errorModal(true));
           dispatch(saveUser(null));
          dispatch(errorMessage(error?.response?.data?.message));
        });
    
  };
};
const SocailLogin = (data) => {
  return async dispatch => {
      dispatch(LoadingLoader(true))
      await axios
        .post('socialMediaLogin', data)
        .then(function (response) {
          if (response?.status == 200) {
            dispatch(saveUser(response.data));
            dispatch(LoadingLoader(false));
          }
        })
        .catch(function (error) {
          console.log("Error-->",error?.response?.data);
          dispatch(LoadingLoader(false));
           dispatch(errorModal(true));
           dispatch(saveUser(null));
          dispatch(errorMessage(error?.response?.data?.message));
        });
    
  };
};
const updateUser = (data) => {
  return async dispatch => {
      dispatch(LoadingLoader(true))
      await axios
        .post('update', data)
        .then(function (response) {
          if (response?.status == 200) {
            console.log("response.data--->",response.data);
            dispatch(saveUser(response.data));
            dispatch(LoadingLoader(false));
            dispatch(successModal(true))
            dispatch(successMessage("User updated successfully"))
          
          }
        })
        .catch(function (error) {
          console.log("Error-->",error?.response?.data);
          dispatch(LoadingLoader(false));
           dispatch(errorModal(true));
          dispatch(errorMessage(error?.response?.data?.message));
        });
    
  };
};
const sendMail = (data) => {
  return async dispatch => {
      dispatch(LoadingLoader(true))
      await axios
        .post('sendEmail', data)
        .then(function (response) {
          if (response?.status == 200) {
            dispatch(LoadingLoader(false));
            dispatch(successModal(true))
            dispatch(successMessage(response?.data?.message))
          
          }
        })
        .catch(function (error) {
          dispatch(LoadingLoader(false));
           dispatch(errorModal(true));
          dispatch(errorMessage(error?.response?.data?.message));
        });
    
  };
};
const onlineConsultant = (data) => {
  console.log(
    'daete',data
  )
  return async dispatch => {
      dispatch(LoadingLoader(true))
      await axios
        .post('consultant', data)
        .then(function (response) {
          if (response?.status == 200) {
            console.log("response.data--->",response.data);
            dispatch(LoadingLoader(false));
            dispatch(successModal(true))
            dispatch(successMessage(response?.data?.message))
          
          }
        })
        .catch(function (error) {
          console.log("Error-->",error?.response?.data);
          dispatch(LoadingLoader(false));
           dispatch(errorModal(true));
          dispatch(errorMessage(error?.response?.data?.message));
        });
    
  };
};
const chatMessages = (data) => {

  return async dispatch => {
      dispatch(LoadingLoader(true))
      await axios
        .post('messages', data)
        .then(function (response) {
          if (response?.status == 200) {
            //console.log("response.data--->",response.data);
            dispatch(userMessages(response.data))
           
          }
        })
        .catch(function (error) {
          console.log("Error-->",error?.response?.data);
          dispatch(LoadingLoader(false));
           dispatch(errorModal(true));
          dispatch(errorMessage(error?.response?.data?.message));
        });
    
  };
};
export {
  login,
  SignUp,
  updateUser,
  sendMail,
  onlineConsultant,
  chatMessages,
  SocailLogin
}


