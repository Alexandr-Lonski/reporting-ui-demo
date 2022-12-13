import {Col, Row} from "react-bootstrap"
import {useRef, useState} from "react";
import '../styles/ApiDrivenDatatable.scss'
import {Utils} from 'formiojs'
import Spinner from 'react-bootstrap/Spinner';
import DataTable from "./DataTable";
import FiltersTable from "./FiltersTable";

const ApiDrivenDataTable = () => {
  const dataTableRef = useRef();
  const filtersTableRef = useRef();
  const [loading, setLoading] = useState(false);
  const [selectedColumns, setColumns] = useState(localStorage.getItem('columns') ? JSON.parse(localStorage.getItem('columns')) : []);
  const filtersObj = localStorage.getItem('filters') ? JSON.parse(localStorage.getItem('filters')) : {};
  const queryParam = createFiltersQuery(JSON.parse(localStorage.getItem('filters')));
  const [filtersQuery, setFiltersQuery] = useState(`?${queryParam}`);

  function createFiltersQuery(queryArray) {
    return Utils._.chain(queryArray)
      .map((val, key) => {
        if (val) {
          if (Utils._.isNumber(val)) {
            return `data.${key}=${encodeURIComponent(val)}`;
          } else {
            if (key === "dateFrom") {
              return `created__gt=${new Date(val)}`
            }
            if (key === "dateTo") {
              return `created__lt=${new Date(val)}`
            }
            return `data.${key}__regex=/${encodeURIComponent(val)}/i`;
          }
        }
      })
      .filter((val) => !!val)
      .join('&').value();
  }

  return (
    <>
      <Row>
        <Col>
          <h2>API-driven Data Table</h2>
          <p>Allows populating a Data Table with data from a custom endpoint.</p>
          <h5>Distinctive features of the API-driven Data Table:</h5>
          <ul>
            <li>only displays the data received from the endpoint;</li>
            <li>populated data cannot be modified or deleted;</li>
            <li>data is excluded from the form submission;</li>
            <li>not displayed in read-only mode;</li>
            <li>supports lazy-loading and requests data from the endpoint for every operation like sorting, filtering
              and pagination.
            </li>
          </ul>
          <p><a href='https://help.form.io/userguide/forms/premium-components#api-driven-data-table' target="_SEJ"
                rel="noreferrer">Api driven Data Table documentation</a></p>
     
          <div className='api-driven-data-source'>
              <FiltersTable createFiltersQuery={createFiltersQuery} filtersObj={filtersObj}
                            filtersTableRef={filtersTableRef} setFiltersQuery={setFiltersQuery} setLoading={setLoading}
                            setColumns={setColumns} />
          </div>
          <div className="data-table">
            {loading && <Spinner animation="grow"/>}
            {!loading &&
               <DataTable filtersQuery={filtersQuery} dataTableRef={dataTableRef} selectedColumns={selectedColumns}/>
            }
          </div>
        </Col>
      </Row>
    </>
  )
}
export default ApiDrivenDataTable