/* eslint-disable */
function upload(formData) {
  const files = formData.getAll("csvFiles");
  const promises = files.map(x =>
    getCSV(x).then(csv => ({
      id: csv,
      originalName: x.name,
      fileName: x.name,
      url: csv
    }))
  );
  return Promise.all(promises);
}

function getCSV(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.readAsText(file, 'UTF-8');
    });
}


export { upload }
