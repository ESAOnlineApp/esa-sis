const uploadDocReducer = (state, action) => {
  switch (action.type) {
    case "SET_IN_DROP_ZONE":
      return { ...state, inDropZone: action.inDropZone };
    case "ADD_FILE_TO_LIST":
      return {
        ...state,
        fileList: state.fileList.concat(action.files),
      };
    case "CHANGE_TOTALSIZE":
      return {
        ...state,
        totalSize: action.totalDocumentSize,
      };
    case "REMOVE_FILE_FROM_LIST":
      // // console.log('action=', action);
      // // console.log('action.name=', action.f.name);
      return {
        ...state,
        fileList: state.fileList.filter((ans) => ans.name !== action.f.name),
      };
    case "REMOVE_ALL_FILE_FROM_LIST":
      return {
        ...state,
        fileList: state.fileList.splice(0, state.fileList.length),
      };

    default:
      return state;
  }
};

export default uploadDocReducer;
