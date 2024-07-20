import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise'; // Import AG Grid Enterprise
import moment from 'moment';
import PriceFilter from './PriceFilter';

const App = () => {
  const gridApiRef = useRef(null);


  const [columnDefs, setColumnDefs] = useState([
    { field: 'id' },
    { field: 'name' },
    { field: 'category' },
    { field: 'subcategory' },
    { field: 'createdAt', filter: 'agDateColumnFilter', filterParams: { buttons: ['apply', 'reset'] } ,
    valueFormatter: params => moment(params.value).format('DD-MMM-YY')
  },
    { field: 'updatedAt', filter: 'agDateColumnFilter', filterParams: { buttons: ['apply', 'reset'] } ,
    valueFormatter: params => moment(params.value).format('DD-MMM-YY')
   },
    { field: 'price', filter: 'agNumberColumnFilter', filterParams: { buttons: ['apply', 'reset'], inRangeInclusive: true } ,
    filterFramework: PriceFilter},
    { field: 'sale_price', filter: 'agNumberColumnFilter', filterParams: { buttons: ['apply', 'reset'], inRangeInclusive: true },
    filterParams: {
      filterOptions: ['equals', 'notEqual', 'lessThan', 'lessThanOrEqual', 'greaterThan', 'greaterThanOrEqual', 'inRange'],
      defaultOption: 'inRange', // Set the default filter option to 'inRange'
      suppressAndOrCondition: true, // Simplify the filter UI
    }, },
  ]);
  const [rowData, setRowData] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [quickFilterText, setQuickFilterText] = useState("");

  useEffect(() => {
    // Fetch data and set rowData
    fetch('https://file.notion.so/f/f/ca71608c-1cc3-4167-857a-24da97c78717/b041832a-ec40-47bb-b112-db9eeb72f678/sample-data.json?id=ce885cf5-d90e-46f3-ab62-c3609475cfb6&table=block&spaceId=ca71608c-1cc3-4167-857a-24da97c78717&expirationTimestamp=1721556000000&signature=vudcRaCRQG38IWClUuTpKEtnSxRrW4-W08gW6Cvb1Z0&downloadName=sample-data.json')
      .then(response => response.json())
      .then(data => setRowData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);



  const onQuickFilterTextChange = (e) => {
    setQuickFilterText(e.target.value);
  };

  return (
    <div>
         <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'px' }}>
        <input
          type="text"
          placeholder="Search..."
          onChange={onQuickFilterTextChange}
          style={{ padding: '8px', width: '300px', marginRight: '10px' }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
      
      </div>
      <div className="ag-theme-alpine" style={{ height: 550, width: '100%' }}>
        <AgGridReact
          columnDefs={columnDefs}
          quickFilterText={quickFilterText}
          rowData={rowData}
          pagination={true}
          paginationPageSize={10}
          sideBar={{
            toolPanels: [
              {
                id: 'filters',
                labelDefault: 'Filters',
                iconKey: 'filter',
                toolPanel: 'agFiltersToolPanel',
              },
              {
                id: 'columns',
                labelDefault: 'Columns',
                iconKey: 'columns',
                toolPanel: 'agColumnsToolPanel',
              },
            ],
            defaultToolPanel: '',
          }}
        />
      </div>
    </div>
  );
};

export default App;
