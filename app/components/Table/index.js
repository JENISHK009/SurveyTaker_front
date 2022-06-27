import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

function filterCaseInsensitive(filter, row) {
  const id = filter.pivotId || filter.id;
  return row[id] !== undefined
    ? String(row[id].toLowerCase()) === filter.value.toLowerCase()
    : true;
}

const TableComponent = ({
  data,
  filterable,
  defaultPageSize = 10,
  pages,
  // eslint-disable-next-line no-unused-vars
  defaultFilterMethod = filterCaseInsensitive,
  onFilterChange,
  manual,
  minRows = 0,
  ...rest
}) => (
  <Fragment>
    <style>{`
        .rt-resizable-header:focus {
          outline:0;
        }
        .tableHeaderSearch > .input{
            width: 100%;
          }
      `}</style>
    <ReactTable
      data={data && data}
      pages={manual && pages}
      manual={manual}
      defaultPageSize={
        data && data.length < defaultPageSize ? data.length : defaultPageSize
      }
      minRows={minRows}
      showPagination
      onFilteredChange={column => {
        if (onFilterChange) onFilterChange(column);
      }}
      {...rest}
      className={data.length <= 0 ? 'no_data_found' : 'tableContain'}
    />
  </Fragment>
);

TableComponent.propTypes = {
  data: PropTypes.array,
  pages: PropTypes.number,
  defaultPageSize: PropTypes.number,
  defaultFilterMethod: PropTypes.func,
  manual: PropTypes.bool,
  minRows: PropTypes.number,
  filterable: PropTypes.object,
  onFilterChange: PropTypes.func,
};

export default TableComponent;
