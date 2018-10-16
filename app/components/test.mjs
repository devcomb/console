export default () => {
  console.log('Hi from the default export8!');
};

export const doStuff = () => new Promise((resolve, reject) => {
    var rates="$1";
    if (rates) {
        resolve(rates);
    } else {
        reject("No rates");
    }
});