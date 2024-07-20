// SidebarComponent.jsx
import React, { useState } from 'react';

const SidebarComponent = ({ onApplyGrouping, onClearGrouping }) => {
  const [selectedColumn, setSelectedColumn] = useState('');

  const handleApplyGrouping = () => {
    onApplyGrouping(selectedColumn);
  };

  return (
    <div style={{ padding: '10px' }}>
      <h3>Create Groups</h3>
      <div>
        <label>Select a column</label>
        <select
          value={selectedColumn}
          onChange={(e) => setSelectedColumn(e.target.value)}
        >
          <option value="">Select a column</option>
          <option value="category">Category</option>
          <option value="subcategory">Subcategory</option>
        </select>
      </div>
      <button onClick={onClearGrouping}>Clear Grouping</button>
      <button onClick={handleApplyGrouping}>Apply Grouping</button>
    </div>
  );
};

export default SidebarComponent;
