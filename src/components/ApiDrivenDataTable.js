import { Col, Row } from "react-bootstrap"
import { useEffect, useRef, useState } from "react";
import '../styles/ApiDrivenDatatable.scss'
import { Utils } from 'formiojs'
import Spinner from 'react-bootstrap/Spinner';
import DataTable from "./DataTable";
import FiltersTable from "./FiltersTable";
import { Form, Formio } from "@formio/react";
import FileSaver from 'file-saver';
import { objToCsv } from 'csv-to-js-parser';

const ApiDrivenDataTable = () => {
  const dataTableRef = useRef();
  const [loading, setLoading] = useState(false);
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [selectedColumns, setColumns] = useState(localStorage.getItem('columns') ? JSON.parse(localStorage.getItem('columns')) : []);
  const filtersObj = localStorage.getItem('filters') ? JSON.parse(localStorage.getItem('filters')) : {};
  const queryParam = createFiltersQuery(JSON.parse(localStorage.getItem('filters')));
  const [filtersQuery, setFiltersQuery] = useState(`?${queryParam}`);
  const [submissions, setSubmissions] = useState([]);

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
          {/*<div className='api-driven-data-source'>*/}
          {/*  {loadingFilter && <Spinner animation="grow"/>}*/}
          {/*  {!loadingFilter &&*/}
          {/*    <FiltersTable createFiltersQuery={createFiltersQuery} filtersObj={filtersObj} submissions={submissions} setFiltersQuery={setFiltersQuery} setLoading={setLoading}*/}
          {/*                  setColumns={setColumns} setLoadingFilter={setLoadingFilter}/>*/}
          {/*  }*/}
          {/*</div>*/}
          {/*<div className="data-table">*/}
          {/*  {loading && <Spinner animation="grow"/>}*/}
          {/*  {!loading &&*/}
          {/*     <ReportingGrid ref={dataTableRef} filtersQuery={filtersQuery} dataTableRef={dataTableRef} selectedColumns={selectedColumns} setSubmissions={setSubmissions} setLoadingFilter={setLoadingFilter} />*/}
          {/*  }*/}
          {/*</div>*/}
          {loading && <Spinner className="action-loading" animation="grow"/>}
          <Form src='https://qxrqjwqmwurwxqy.form.io/filtertable1'
            formReady={(form) => {
              form.on('action', async () => {
                if (!Utils._.isEmpty(form.data?.selectedRows)) {
                  if (form.data.conditionTrigger === "pdf") {
                    setLoading(true);
                    const selectedSubmissions = [];
                    form.data?.selectedRows.forEach((row) => selectedSubmissions.push({data: row}));
                    const res = await fetch(`https://files.form.io/pdf/63bfd7159948633ff4b82523/download`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        form: {
                          title: "Submissions",
                          components: form._form.components[1].components
                        },
                        submission: selectedSubmissions
                      })
                    })
                    const blob = await res.blob();
                    window.open(URL.createObjectURL(blob), "_blank");
                    setLoading(false);
                  }
                  if (form.data.conditionTrigger === "csv") {
                    const csv = objToCsv(form.data?.selectedRows, ',');
                    const blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
                    FileSaver.saveAs(blob, `submissions.csv`);
                  }
                } else {
                  alert("You have no selected submissions")
                }
                })
              }}
          />
        </Col>
      </Row>
    </>
  )
}
export default ApiDrivenDataTable