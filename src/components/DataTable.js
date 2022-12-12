import { Form } from "@formio/react"
import {Utils} from "formiojs";

const DataTable = ({filtersQuery, dataTableRef, selectedColumns}) => {

  return (
  <Form src="https://qxrqjwqmwurwxqy.form.io/datatable"
        formReady={(form) => {
          const dataTable = form.getComponent('dataTable');
          dataTableRef.current = dataTable;
          Utils._.forEach(dataTable.component.components, function (column) {
            if (selectedColumns.includes(column.label)) {
              column.tableView = true;
            }
            if(!selectedColumns.includes(column.label) && !Utils._.isEmpty(selectedColumns)) {
              column.tableView = false;
            }
          });
        }} options={{filters: filtersQuery}}
  />
  )
}

export default DataTable;