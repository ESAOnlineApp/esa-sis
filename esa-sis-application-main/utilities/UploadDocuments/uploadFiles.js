async function UploadFiles({ data, dispatch, saveaction, file_name }) {
  // get the files from the fileList as an array
  let files = data.fileList;
  // files.forEach((file) => { // console.log('file.name==', file.name);file.name= file_name})

  // console.log('files in uploadFiles File=', files);
  // initialize formData object
  try {
    const formData = new FormData();
    // loop over files and add to formData
    files.forEach((file) => formData.append("files", file));
    // // console.log('formData=', formData);
    formData.append("file_name", file_name);
    // // console.log('formData=', formData);
    // Upload the files as a POST request to the server using fetch
    const response = await fetch(`/api/uploaddoc/upload`, {
      method: "POST",
      body: formData,
      // enctype: 'multipart/form-data',
    });

    const { data, error } = await response.json();
    // console.log('data=', data);
    if (error || !data) {
      alert(error || "Error uploading files");
      return;
    }
    // console.log('Files was uploaded successfylly:', data);
    // if it is not from save or autosave don't delete the document file list, of course in our case it does not make sense because after submit we route to another page....
    if (!saveaction) dispatch({ type: "REMOVE_ALL_FILE_FROM_LIST", data });
  } catch (error) {
    console.error(error);
    alert("Error uploading files");
  }
}
export default UploadFiles;
