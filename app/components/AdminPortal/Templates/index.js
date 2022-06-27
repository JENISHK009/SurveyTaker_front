import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Dropdown, Image, Form, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import { toast } from 'react-toastify';
import trashIcon from '../../../assets/images/trash.svg';
import moreHZIcon from '../../../assets/images/more-horizontal.svg';
import TemplateHeader from './TemplateHeader';
import preview from '../../../assets/images/preview.svg';
import editIcon from '../../../assets/images/edit.svg';
// for templates
import reducer, {
  getTemplate,
  templateFetching,
} from '../../../store/reducers/templates';
import saga from '../../../store/sagas/templates';
import injectReducer from '../../../utils/injectReducer';
import injectSaga from '../../../utils/injectSaga';

import { templatesRequest } from '../../../store/actions/templates';
import TableComponent from '../../../common/TableComponent';
import { CONSTANT } from '../../../enum';
import DeleteModal from '../../../common/DeleteModal';
import {
  requestDeleteTemplate,
  resetApi,
} from '../../../store/actions/meetings';
import {
  apiMessage,
  apiSuccess,
  removeTemplate,
} from '../../../store/reducers/meetings';
import CustomToaster from '../CustomToaster';

const Templates = props => {
  const [templateData, setTemplateData] = useState([]);
  const [deleteModal, setDeleteModal] = useState({
    val: false,
    removeId: '',
  });
  const [search, setSearch] = useState(false);
  const { TEMPLATE_URL } = CONSTANT;

  const token = sessionStorage.getItem('userToken');

  // eslint-disable-next-line no-shadow
  const { apiSuccess, apiMessage } = props;

  if (!apiSuccess && apiMessage) {
    toast.error(apiMessage);
  }
  if (apiSuccess && apiMessage) {
    toast.success(apiMessage);
  }

  const handleTemplatePreview = (id, str) => {
    if (str === 'preview') {
      window.open(
        `${TEMPLATE_URL}?templateId=${id}&authURI=${token}`,
        '_blank',
      );
    } else if (str === 'edit') {
      window.open(
        `${TEMPLATE_URL}?templateId=${id}&authURI=${token}&isEdit=${true}`,
        '_blank',
      );
    }
  };

  const tableConstants = () => [
    {
      title: 'ID',
      render: () => (
        <span>
          {' '}
          <Form.Check className="checkbox">
            <Form.Check.Input id="checkbox" className="checkbox-input" />
            <Form.Check.Label htmlFor="checkbox" className="checkbox-label" />
          </Form.Check>
        </span>
      ),
    },
    {
      title: 'Name',
      render: rowData => <span>{rowData.type_name}</span>,
    },
    {
      title: 'Creation Date',
      render: rowData => (
        <span>
          {`${moment(rowData.createdAt).format('L')}${', '}${moment(
            rowData.createdAt,
          ).format('LT')}`}
        </span>
      ),
    },
    {
      title: '',
      render: rowData => (
        // <button
        //   type="button"
        //   className="btn btn-warning"
        //   onClick={() => handleEdit(rowData)}
        // >
        //   Edit
        // </button>

        <Dropdown className="d-inline mx-2" align="end">
          <Dropdown.Toggle className="p-0">
            <Image src={moreHZIcon} />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => handleTemplatePreview(rowData.id, 'edit')}
            >
              <Image className="me-2" src={editIcon} />
              Edit
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleTemplatePreview(rowData.id, 'preview')}
            >
              <Image className="me-2" src={preview} />
              Preview
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              className="text-red"
              onClick={() =>
                setDeleteModal({ val: true, removeId: rowData.id })
              }
            >
              <Image className="me-2" src={trashIcon} /> Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];

  useEffect(() => {
    props.templatesRequest();
  }, []);

  useEffect(() => {
    if (!search) {
      setTemplateData(props.templateData);
    }
  }, [props.templateData]);

  const handleEdit = () => {};

  const onSearch = event => {
    let newList = [];
    if (event.target.value !== '') {
      setSearch(true);
      newList =
        props.templateData &&
        props.templateData.length > 0 &&
        // eslint-disable-next-line camelcase
        props.templateData.filter(({ type_name }) => {
          const first = type_name.toLowerCase() || '';
          const filter = event.target.value.toLowerCase().trim();
          return first.includes(filter);
        });
      setTemplateData(newList);
    } else {
      setSearch(false);
      setTemplateData(props.templateData);
    }
  };

  const handleDelete = () => {
    props.requestDeleteTemplate(deleteModal.removeId);
  };

  useEffect(() => {
    if (props.removeTemplate && props.removeTemplate.success) {
      setDeleteModal({ val: false });
      props.templatesRequest();
      props.resetApi();
    }
  }, [props.removeTemplate]);

  useEffect(() => {
    if (apiMessage) {
      props.resetApi();
    }
  }, [apiMessage]);
  return (
    <>
      <CustomToaster />
      <TemplateHeader handleSearch={onSearch} />
      {props.templateFetching ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="grow" />
        </div>
      ) : (
        <TableComponent
          cols={tableConstants(handleEdit)}
          data={templateData || []}
          striped
        />
      )}
      <DeleteModal
        title="Are you sure?"
        isActive={deleteModal.val}
        handleClose={() => setDeleteModal({ val: false })}
        buttonBottomTitle="Cancel"
        buttonTitle="Delete"
        handleDelete={handleDelete}
        isHandleCloseSpinner={props.removeTemplate.fetching}
      >
        <p className="text-bismark mb-1">
          This Template Will be Deleted immidiately.{' '}
        </p>
        {/* <p className="text-bismark mb-0">You {"can't"} undo this action</p> */}
      </DeleteModal>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  templatesRequest: () => dispatch(templatesRequest()),
  requestDeleteTemplate: payload => dispatch(requestDeleteTemplate(payload)),
  resetApi: () => dispatch(resetApi()),
  dispatch,
});

function mapStateToProps(state) {
  const { templates, meetings } = state;
  return {
    templateData: getTemplate(templates),
    templateFetching: templateFetching(templates),
    removeTemplate: removeTemplate(meetings),
    apiMessage: apiMessage(meetings),
    apiSuccess: apiSuccess(meetings),
  };
}

Templates.propTypes = {
  templatesRequest: PropTypes.func,
  templateData: PropTypes.object,
  requestDeleteTemplate: PropTypes.func,
  removeTemplate: PropTypes.object,
  templateFetching: PropTypes.bool,
  resetApi: PropTypes.func,
  apiSuccess: PropTypes.bool,
  apiMessage: PropTypes.string,
};

const withReducer = injectReducer({ key: 'templates', reducer });
const withSaga = injectSaga({ key: 'templates', saga });

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Templates);
