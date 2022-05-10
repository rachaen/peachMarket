/* const loadingReducer = (state = { containerName: '', isLoading: false }, action) => {
  switch (action.type) {
    case 'visibleSpinner':
      return { containerName: action.containerName, isLoading: true };
    case 'unvisibleSpinner':
      return { ...state, isLoading: false };
    default:
      return state;
  }
}; */
const loadingReducer = (state = { isLoading: false }, action) => {
  switch (action.type) {
    case 'visibleSpinner':
      return { isLoading: true };
    case 'unvisibleSpinner':
      return { isLoading: false };
    default:
      return state;
  }
};
export default loadingReducer;
