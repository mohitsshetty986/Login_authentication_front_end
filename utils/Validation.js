export const updateError = (error, stateUpdater) => {
  stateUpdater(error);
  setTimeout(() => {
    stateUpdater("");
  }, 2500);
};

export const isValidEmail = (value) => {
  const regex = /^([A-Za-z0-9_\-\.])+\@([A_Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return regex.test(value);
};
