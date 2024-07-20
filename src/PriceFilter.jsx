import React, { useState, useEffect, useRef } from 'react';

const PriceFilter = (props) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const refInput = useRef();

  useEffect(() => {
    props.filterChangedCallback();
  }, [minPrice, maxPrice]);

  const isFilterActive = () => {
    return minPrice !== '' || maxPrice !== '';
  };

  const doesFilterPass = (params) => {
    const value = params.data.price;
    return (!minPrice || value >= minPrice) && (!maxPrice || value <= maxPrice);
  };

  const getModel = () => {
    return isFilterActive() ? { minPrice, maxPrice } : null;
  };

  const setModel = (model) => {
    setMinPrice(model ? model.minPrice : '');
    setMaxPrice(model ? model.maxPrice : '');
  };

  return (
    <div style={{ padding: 4 }}>
      <input
        ref={refInput}
        type="number"
        placeholder="Min price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        style={{ marginBottom: 4 }}
      />
      <input
        type="number"
        placeholder="Max price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
    </div>
  );
};

export default PriceFilter;
