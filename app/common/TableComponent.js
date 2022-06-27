/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import { Button, Form, Image, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import HoverMenu from '../components/AdminPortal/Survey/HoverMenu';

const TableComponent = ({
  cols,
  data,
  hasHoverMenu,
  tableClassName,
  checkedCount,
  setCheckedCount,
  headerActions,
  totalCount,
  setCheckedFolderCount,
  checkedFolderCount,
  // bordered,
  // hoverable,
  // striped,
  // isDark,
}) => {
  const pathname = useLocation();
  return (
    <div className="table-responsive" style={{ minHeight: '300px' }}>
      <Table className="table">
        <thead>
          <tr>
            {cols &&
              cols.length > 0 &&
              cols.map((headerItem, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <>
                  <th
                    className="text-capitalize"
                    width={checkedCount && index === 0 ? 80 : 'auto'}
                  >
                    {headerItem.title}
                  </th>
                </>
              ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.length > 0 &&
            data.map((item, index) => (
              <tr className={`${tableClassName}`}>
                {cols &&
                  cols.length > 0 &&
                  cols.map((col, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <td key={i}>
                      {col.render(item)}

                      <HoverMenu itemId={item.id} />
                    </td>
                  ))}
              </tr>
            ))}
          {(!data || data.length === 0) && (
            <tr className={`${tableClassName}`}>
              <td className="text-center" colSpan={cols && cols.length}>
                No Records Exists
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

TableComponent.propTypes = {
  cols: PropTypes.array,
  data: PropTypes.array,
  tableClassName: PropTypes.string,
  hasHoverMenu: PropTypes.object,
  checkedCount: PropTypes.array,
  setCheckedCount: PropTypes.func,
  headerActions: PropTypes.func,
  totalCount: PropTypes.number,
  setCheckedFolderCount: PropTypes.func,
  checkedFolderCount: PropTypes.array,
  // bordered: PropTypes.bool,
  // hoverable: PropTypes.bool,
  // striped: PropTypes.bool,
  // isDark: PropTypes.bool,
};

export default TableComponent;
