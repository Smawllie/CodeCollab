
export async function StoreSession(dispatch:any, data:any) {
  try {
    dispatch({ type: 'REQUEST_STORE' });
    if (data._id) {
      dispatch({ type: 'STORE_SUCCESS', payload: data });
      localStorage.setItem('currentUser', JSON.stringify(data._id));
      return data;
    }
    dispatch({ type: 'STORE_ERROR', error: data.error });
    return;
  } catch (error) {
    dispatch({ type: 'STORE_ERROR', error: error });
    console.log(error);
  }
};

export async function DeleteSession(dispatch:any) {
  dispatch({ type: 'DELETE_STORE' });
  localStorage.removeItem('currentUser');
}