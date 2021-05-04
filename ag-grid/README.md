## AG-GRID Demo POC for React App

ag-Grid is javascript library to Provide Grid feature on UI components. ag-Grid has zero dependencies such as Angular or React, we don’t even use JQuery, Underscore or LoDash. The foundations of ag-Grid is a custom made framework designed specifically for ag-Grid. Having no dependency means ag-Grid will work with any framework — we call this framework agnostic

- ag-Grid works well with React or any other framework
- ag-Grid has both free and commercial versions. This allows everyone to benefit from ag-Grid even if their budget is limited.
- ag-Grid free version provided basic level of Grid feature which are enough to satisfy core grid requirments but when we have complex set of design for Grid then we can go for commercial one, its purely open source and bening properly managed by community.

### Basic introduction and APIs

- ag-Grid Provided column, row and Grid APIs to access and play with row column data structure
- https://www.ag-grid.com/react-grid/
- basic demo example https://stackblitz.com/edit/ag-grid-react-hello-world

### Installing Dependancies for ag-Grid

```
"ag-grid-community": "^20.2.0",
"ag-grid-enterprise": "^20.2.0",
"ag-grid-react": "^20.2.0"
```

## Styles and Theming

```
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
```

# Basic Grid Component Design with Column and grid APIs

```
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
```
