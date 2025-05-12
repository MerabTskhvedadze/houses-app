import React, { useState, useEffect, ChangeEvent } from 'react';
import { TextField, InputAdornment, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { SearchComponentProps } from '@/app/types';

export default function SearchComponent({
  initialValue = '',
  placeholder = 'Search...',
  onSearch,
  debounceDelay = 300,
  showClearButton = true,
}: SearchComponentProps) {
  const [searchValue, setSearchValue] = useState<string>(initialValue);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  useEffect(() => {
    if (searchValue === initialValue && !isTyping) {
      return;
    }

    const debounceTimer = setTimeout(() => {
      onSearch(searchValue);
      setIsTyping(false);
    }, debounceDelay);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchValue, debounceDelay, onSearch, initialValue, isTyping]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setIsTyping(true);
  };

  const handleClear = () => {
    setSearchValue('');
    setIsTyping(true);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        fullWidth
        variant='outlined'
        placeholder={placeholder}
        value={searchValue}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: showClearButton && searchValue && (
            <InputAdornment position='end'>
              <IconButton
                edge='end'
                onClick={handleClear}
                aria-label='clear search'
                size='small'
              >
                <ClearIcon fontSize='small' />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
