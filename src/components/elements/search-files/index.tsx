import React from 'react';
// import {
//   Droppable,
//   Draggable,
//   DroppableProvided,
//   DroppableStateSnapshot,
//   DraggableProvided,
//   DraggableStateSnapshot,
//   DropResult,
//   DragDropContext
// } from 'react-beautiful-dnd';
import { Container as DragDropContainer, Draggable } from 'react-smooth-dnd';

import './styles.scss';

import { SearchBar } from 'components';

import { File } from 'core';
import { useFiles } from 'context';
import { clsxm } from 'lib';

interface Props {
  className?: string;
}

export const SearchFilesEl: React.FC<Props> = ({ className = '' }) => {
  const { files } = useFiles();

  const [droppableId] = React.useState('file-item');
  const [searchKey, setSearchKey] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<Array<File>>(files);
  React.useEffect(() => {
    setSearchResults(files);
  }, [files]);
  const [showSearchResults, setShowSearchResults] = React.useState(false);

  function handleSearch(value: string) {
    setSearchKey(value);

    setSearchResults(
      files.filter((x) => x.path?.toLowerCase().includes(value))
    );
  }

  return (
    <div
      className={clsxm(
        'search-files-el',
        'text-center relative inline-flex self-center',
        className
      )}
      tabIndex={0}
      onFocus={() => setShowSearchResults(true)}
      onBlur={() => setShowSearchResults(false)}
    >
      <SearchBar
        className={clsxm('z-10')}
        value={searchKey}
        onChange={(value) => handleSearch(value)}
      />
      <div
        className={clsxm(
          'search-result-container',
          'absolute top-[100%] left-[50%] translate-x-[-50%] min-w-[25vw] bg-white border-[1px] rounded-[8px] border-black z-10',
          showSearchResults ? '' : 'hidden'
        )}
      >
        <DragDropContainer
          groupName="1"
          getChildPayload={(index) => searchResults[index]}
          getGhostParent={() => document.body}
          render={(ref) => (
            <div ref={ref} className={clsxm()}>
              {searchResults.map((file, index) => (
                <Draggable
                  key={`${droppableId}-${index}`}
                  render={() => (
                    <div>
                      <div className={clsxm('p-2 mt-2 cursor-pointer')}>
                        <span className={clsxm('ml-2')}>
                          {file.title}({file.path})
                        </span>
                      </div>
                    </div>
                  )}
                />
              ))}
            </div>
          )}
        />
      </div>
    </div>
  );
};
