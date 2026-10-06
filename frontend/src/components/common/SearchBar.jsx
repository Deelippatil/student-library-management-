import React, { useState, useEffect } from 'react';

export const SearchBar = ({
  placeholder = 'Search by title, author, ISBN, category...',
  value: initialValue = '',
  onSearch,
  delay = 300,
  className = '',
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (onSearch) {
        onSearch(searchTerm);
      }
    }, delay);

    return () => clearTimeout(handler);
  }, [searchTerm, delay]);

  const handleClear = () => {
    setSearchTerm('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%' }} className={className}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="input"
        style={{ paddingRight: searchTerm ? '2.5rem' : '1rem' }}
      />
      {searchTerm && (
        <button
          type="button"
          onClick={handleClear}
          title="Clear search"
          style={{
            position: 'absolute',
            right: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            fontSize: '1.1rem',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            lineHeight: 1,
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBar;

