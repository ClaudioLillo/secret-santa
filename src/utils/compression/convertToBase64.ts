export const convertToBase64 = (file: Blob) => {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = () => {
      resolve(fr.result);
    };

    fr.onerror = (error) => {
      reject(error);
    };
  });
};
