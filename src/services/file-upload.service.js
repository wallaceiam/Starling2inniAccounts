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

        fileReader.readAsText(file);
    });
}

function getImage(file) {
  return new Promise((resolve, reject) => {
    const fReader = new FileReader();
    const img = document.createElement("img");

    fReader.onload = () => {
      img.src = fReader.result;
      resolve(getBase64Image(img));
    };

    fReader.readAsDataURL(file);
  });
}

function getBase64Image(img) {
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  const dataURL = canvas.toDataURL("image/png");

  return dataURL;
}

export { upload }
