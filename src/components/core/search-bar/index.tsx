import React from 'react';

import iconSearch from '../../../assets/images/search-14x14-grey.svg';

import { clsxm } from '../../../lib';

interface Props {
  className?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const SearchBar: React.FC<Props> = ({
  className = '',
  placeholder = 'Search...',
  value: initialValue,
  onChange
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [value, setValue] = React.useState('');

  function handleChange(value: string) {
    setValue(value ?? '');

    onChange(value);
  }

  return (
    <div
      className={clsxm(
        'search-bar',
        'p-2 inline-flex items-center border-[1px] rounded-[8px]',
        className
      )}
      tabIndex={0}
    >
      <img className="search-icon" src={iconSearch} alt="" />
      <input
        ref={inputRef}
        className={clsxm('outline-none px-2')}
        placeholder={placeholder}
        value={value}
        onChange={(event) => handleChange(event.target.value)}
      />
    </div>
  );
};
