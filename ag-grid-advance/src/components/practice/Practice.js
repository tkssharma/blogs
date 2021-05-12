import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import './Practice.scss';
import 'ag-grid-enterprise';


const Practice = () => {

	const [tableData, setTableData ] = useState();
	useEffect(() => {
		fetch('https://www.ag-grid.com/example-assets/small-row-data.json')
			.then(resp => resp.json())
			.then(data => setTableData(data))
			.catch(error => alert('some error occured: ', error));
	}, []);

	const columns = [
		{
			headerName: 'Make',
			field: 'make'
		},
		{
			headerName: 'Model',
			field: 'model'
		},
		{
			headerName: 'Price',
			field: 'price'
		}
	]

	return (
		<div className="practice-page">
			<section className="ag-grid-table-section">
				<h2>AG Grid Table</h2>
				<div className="ag-theme-alpine" style={{width: '100%', height: '600px'}}>
				<AgGridReact
					rowData={tableData}
					columnDefs={columns}
				/>
				</div>
			</section>
		</div>
	)
}

export default Practice;