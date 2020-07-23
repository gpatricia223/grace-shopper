import React, { Component, useState } from 'react';
import axios from 'axios';
import { Input, Icon, Container, Dropdown, Button, Search } from 'semantic-ui-react';

const SearchBar = ({ results, setResults, setSearchTerm }) => {


  const [optionsValue, setOptionsValue] = useState('all');

  const options = [
    { key: 'all', text: 'All', value: 'all' },
    { key: 'clothing', text: 'clothing', value: 'clothing' },
    { key: 'climbing', text: 'climbing', value: 'climbing' },
    { key: 'hiking', text: 'hiking', value: 'hiking' },
    { key: 'sports', text: 'sports', value: 'sports' },
    { key: 'camping', text: 'camping', value: 'camping' },
  ]


  const handleInputChange = async (e, data) => {
    const value = e.target.value;

    let category = optionsValue;

    let srch = {};
    srch.value = value;
    if (optionsValue === 'all') {
      category = ''
    }

    if (category.length) {

      srch.category = category;
    }

    console.log('Search terms: ', srch.category, srch.value)
    setSearchTerm(srch)
  }

  const handleOptionSelect = (e, data) => {
    setOptionsValue(data.value);
  }

  return (

    <Input style={{ minWidth: '400px' }}
      label={<Dropdown defaultValue='all' options={options} onChange={handleOptionSelect} />}
      labelPosition='right'
      placeholder='Search...'
      onChange={handleInputChange}
    />

  )
}


export default SearchBar;