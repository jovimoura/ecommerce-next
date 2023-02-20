export const toBase64 = (file: any) => {
  if (file !== undefined) {
    new Promise((resolve, reject) => {
      console.log("tobase64", file);
      console.log("tobase64 typeof", typeof file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  } else {
    return "";
  }
};
