export const checkMobile = (rule, value, callback) => {
  if (value == "") {
    throw new Error("请填写信息");
  } else {
    callback();
  }
};

export const checkCode = (rule, value, callback) => {
  if (value == "") {
    throw new Error("请填写信息");
  } else {
    callback();
  }
};
export const checkAccount = (rule, value, callback) => {
  if (value == "") {
    throw new Error("请填写信息");
  } else {
    callback();
  }
};
export const checkPassword = (rule, value, callback) => {
  if (value == "") {
    throw new Error("请填写信息");
  } else {
    callback();
  }
};
