import React, { useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const Filtering = () => {
    const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(null);
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const updateData = (data) => {
      setRowData(data);
    };

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  return (
    <div className="practice-page">
        <section className="ag-grid-table-section">
            <h2>Filtering</h2>
            <div className="ag-theme-alpine" style={{width: '100%', height: '600px'}}>
                <div style={{ width: '100%', height: '100%' }}>
                <div
                    id="myGrid"
                    style={{
                    height: '100%',
                    width: '100%',
                    }}
                    className="ag-theme-alpine"
                >
    <AgGridReact
          defaultColDef={{
            flex: 1,
            minWidth: 200,
            resizable: true,
            floatingFilter: true,
          }}
          onGridReady={onGridReady}
          rowData={rowData}
        >
          <AgGridColumn field="athlete" filter={true} />
          <AgGridColumn field="country" filter="agSetColumnFilter" />
          <AgGridColumn field="gold" filter="agNumberColumnFilter" />
          <AgGridColumn field="silver" filter="agNumberColumnFilter" />
          <AgGridColumn field="bronze" filter="agNumberColumnFilter" />
        </AgGridReact>
                    </div>
                </div>
            </div>
        </section>
	</div>
  );
}
export default Filtering;