import { useState } from 'react';

const useFormStatus = (successText) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const handleSuccess = () => {
    setSuccess(false);
    setError(null);
    setSuccess(true);
  };
  const handleError = (e) => {
    setError(e);
    setSuccess(false);
  };
  return {
    error,
    setError,
    success,
    setSuccess,
    successText,
    handleSuccess,
    handleError,
  };
};

export default useFormStatus;
