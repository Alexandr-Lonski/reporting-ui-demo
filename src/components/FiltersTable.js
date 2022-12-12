import { Form } from "@formio/react"
import {Utils} from "formiojs";

const FiltersTable = ({filtersTableRef, setLoading, filtersObj, setFiltersQuery, createFiltersQuery, setColumns }) => {
  return (
    <Form id='api-driven-data-source' src="https://qxrqjwqmwurwxqy.form.io/filters" formReady={(form) => {
      filtersTableRef.current = form;
      if (filtersObj) {
        Utils._.forEach(form.submission.data.filters, function (value, key) {
          form.submission.data.filters[key] = filtersObj[key]
        });
      }
      form.on('filter', () => {
        setLoading(true);
        const query = createFiltersQuery(form.data.filters)
        setFiltersQuery(query ? `?${query}` : '');
        localStorage.setItem("filters", JSON.stringify(form.submission.data.filters))
        setTimeout(() => {
          setLoading(false);
        }, )
      })
      form.on('clear', () => {
        setLoading(true);
        setFiltersQuery('');
        form.setSubmission({data: {...form.submission.data, filters: {}}});
        localStorage.setItem('filters', JSON.stringify([]));
        setTimeout(() => {
          setLoading(false);
        }, )
      })
      form.on('apply', () => {
        setLoading(true);
        localStorage.setItem("columns", JSON.stringify(form.submission.data.displayedColumns.map((column)=> column.label)));
        setColumns(localStorage.getItem("columns"));
        setTimeout(() => {
          setLoading(false);
        }, 100)
      })

    }}/>
  )
}

export default FiltersTable;