let user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!).id:"";

export const initialState = {
    id: "" || user,
    loading: false,
    errorMessage: null
  };
   


  export const AuthReducer = (initialState:any, action:any) => {
    switch (action.type) {
      case "REQUEST_STORE":
        return {
          ...initialState,
          loading: true
        };
      case "STORE_SUCCESS":
        return {
          ...initialState,
          id: action.payload.id,
          loading: false
        };case "DELETE_STORE":
        return {
          ...initialState,
          user: "",
        };
   
      case "STORE_ERROR":
        return {
          ...initialState,
          loading: false,
          errorMessage: action.error
        };
   
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  };