import { useState } from 'react';

const useEditMode = (initial = false) => {
  const [edit, setEdit] = useState(initial);
  return { edit, setEdit };
};

export default useEditMode;
