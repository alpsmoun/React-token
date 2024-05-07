import React from 'react';

import { File } from '../core/models';

interface DefaultValue {
  files: Array<File>;
  assignedFiles: Array<File>;
  setAssignedFiles: React.Dispatch<React.SetStateAction<Array<File>>>;
}

interface Props {
  children: React.ReactNode;
}

const FilesContext = React.createContext<DefaultValue>({
  files: [],
  assignedFiles: [],
  setAssignedFiles: (value) => {}
});

export const FilesProvider: React.FC<Props> = ({ children }) => {
  const [files, setFiles] = React.useState<Array<File>>([]);
  const [assignedFiles, setAssignedFiles] = React.useState<Array<File>>([]);

  React.useEffect(() => {
    loadFiles();
  }, []);

  async function loadFiles() {
    const files = await File.load();
    setFiles(files);
  }

  const memoedValue = React.useMemo(
    () => ({
      files,
      assignedFiles,
      setAssignedFiles
    }),
    [files, assignedFiles]
  );

  return (
    <FilesContext.Provider value={memoedValue}>
      {children}
    </FilesContext.Provider>
  );
};

export function useFiles() {
  return React.useContext(FilesContext);
}
