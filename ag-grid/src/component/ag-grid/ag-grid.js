/* eslint-disable no-console */
import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community";
import { MockData } from "../mock/data";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

class GridAppComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: this.props.loading,
      sideBar: true,
      rowData: MockData,
      icons: {
        columnRemoveFromGroup: '<i class="fa fa-times"/>',
        filter: '<i class="fa fa-filter"/>',
        sortAscending: '<i class="fa fa-long-arrow-alt-down"/>',
        sortDescending: '<i class="fa fa-long-arrow-alt-up"/>',
        groupExpanded: '<i class="far fa-minus-square"/>',
        groupContracted: '<i class="far fa-plus-square"/>',
      },
      rowSelection: "multiple",
      sortingOrder: ["desc", "asc", null],
      defaultColDef: {
        width: 150,
        sortable: true,
        filter: true,
      },
      frameworkComponents: {
        // add framework component
      },
      columnDefs: [
        {
          checkboxSelection: true,
          headerName: "id",
          headerCheckboxSelection: true,
          headerCheckboxSelectionFilteredOnly: true,
          sortable: true,
          enablePivot: true,
          filter: true,
          resizable: true,
          rowDrag: true,
          field: "id",
          width: 140,
        },
        {
          headerName: "name",
          field: "first_name",
          filter: "agTextColumnFilter",
          width: 180,
          sortable: true,
          enablePivot: true,
          tooltipField: "first_name",
          enablePivot: true,
          resizable: true,
          editable: true,
        },
        {
          headerName: "last name",
          field: "last_name",
          tooltipField: "last_name",
          sortable: true,
          filter: "agTextColumnFilter",
          enablePivot: true,
          resizable: true,
          editable: true,
          width: 140,
        },
        {
          headerName: "Email",
          field: "email",
          resizable: true,
          sortable: true,
          enablePivot: true,
          filter: "agTextColumnFilter",
          enablePivot: true,
          editable: true,
          width: 180,
        },
        {
          headerName: "country",
          field: "country",
          filter: "agTextColumnFilter",
          cellEditor: "agRichSelectCellEditor",
          cellEditorParams: {
            values: ["China","test"],
          },
          onCellValueChanged: this.onCellValueChanged.bind(this),
          width: 185,
          resizable: true,
          sortable: true,
          enablePivot: true,
          editable: true,
        },
        {
          headerName: "company",
          field: "company",
          resizable: true,
          sortable: true,
          filter: "agTextColumnFilter",
          enablePivot: true,
          editable: true,
          width: 180,
        },
        {
          headerName: "city",
          field: "city",
          resizable: true,
          sortable: true,
          filter: "agTextColumnFilter",
          enablePivot: true,
          editable: true,
          width: 160,
        },
        {
          headerName: "state",
          field: "state",
          resizable: true,
          sortable: true,
          filter: "agTextColumnFilter",
          enablePivot: true,
          editable: true,
          width: 140,
        },
        {
          headerName: "street",
          field: "street",
          resizable: true,
          sortable: true,
          filter: "agTextColumnFilter",
          enablePivot: true,
          editable: true,
          width: 180,
        },
        {
          headerName: "ip_address",
          field: "ip_address",
          resizable: true,
          sortable: true,
          filter: "agTextColumnFilter",
          enablePivot: true,
          editable: true,
          width: 180,
        },
        {
          headerName: "gender",
          field: "gender",
          resizable: true,
          sortable: true,
          filter: "agTextColumnFilter",
          enablePivot: true,
          editable: true,
          width: 180,
        },
      ],
    };
  }

  onGridReady = (params) => {
    this.api = params.api;
    this.api.setSuppressRowDrag(true);
    this.columnApi = params.columnApi;
    this.columnApi.setPivotMode(false);

  };

  onSelectionChanged(event) {}

  onCellValueChanged(params, newValue) {}

  render() {
    return (
      <div id="grid-wrapper" style={{ width: "100%", height: "100%" }}>
        <div
          id="myGrid1"
          style={{
            height: "600px",
            width: "100%",
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            enableBrowserTooltips={true}
            allowContextMenuWithControlKey={true}
            columnDefs={this.state.columnDefs}
            onSelectionChanged={this.onSelectionChanged.bind(this)}
            rowSelection={this.state.rowSelection}
            animateRows={true}
            floatingFilter={true}
            onGridReady={this.onGridReady}
            pagination={true}
            paginationPageSize={100}
            sideBar={true}
            pivotMode={true}
            sideBar={this.state.sideBar}
            icons={this.state.icons}
            rowData={this.state.rowData}
            defaultColDef={{
              resizable: true,
              sortable: true,
              filter: true,
              editable: true,
            }}
          />
        </div>
      </div>
    );
  }
}

export default GridAppComponent;
