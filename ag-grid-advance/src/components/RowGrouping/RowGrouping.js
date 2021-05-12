import React, {useEffect, useState} from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
const RowGrouping = () => {
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
				<h2>Row Grouping</h2>
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
                        minWidth: 100,
                        filter: true,
                        sortable: true,
                        resizable: true,
                    }}
                    autoGroupColumnDef={{ minWidth: 200 }}
                    enableRangeSelection={true}
                    animateRows={true}
                    onGridReady={onGridReady}
                    rowData={rowData}
                    >
                        <AgGridColumn field="country" rowGroup={true} />
                        <AgGridColumn field="year" rowGroup={true} />
                        <AgGridColumn field="sport" />
                        <AgGridColumn field="athlete" />
                        <AgGridColumn field="total" />
                    </AgGridReact>
            </div>
    </div>
				</div>
			</section>
		</div>
    )
}
export default RowGrouping;