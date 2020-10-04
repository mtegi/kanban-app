const handleError = (e) => {
  let msg = 'error:other';
  if (e.response === undefined) {
    throw new Error(msg);
  } else if (e.response.status !== undefined && e.response.status >= 400) {
    msg = e.response.data.message || 'error:other';
  }
  throw new Error(msg);
};

export default handleError;
