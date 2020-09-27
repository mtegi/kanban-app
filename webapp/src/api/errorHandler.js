const handleError = (e) => {
  let msg;
  if (e.response === undefined) {
    msg = 'error:other';
  } else {
    if (
      e.response.status !== undefined &&
      (e.response.status === 403 || e.response.status === 401)
    ) {
      return;
    }
    if (
      e.response.status === 500 &&
      e.response.data.message === 'error:other'
    ) {
      return;
    }
    msg = e.response.data.message;
  }
  throw new Error(msg);
};

export default handleError;
