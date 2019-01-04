

export const prodLambda = (event, context, callback) => {
  callback(null, 'Prod only');
};

export const normalLambda = (event, context, callback) => {
  callback(null, 'Normal Lambda');
};
