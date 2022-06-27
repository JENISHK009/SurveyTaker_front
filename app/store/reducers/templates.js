import * as actions from '../actions/templates';

const initialState = {
  templates: [],
  fetching: false,
  error: '',
  templateFetching: false,
};
const templates = (state = initialState, action) => {
  switch (action.type) {
    case actions.TEMPLATES_REQUEST:
      return { ...state, templateFetching: true };
    case actions.TEMPLATES_SUCCESS:
      return { ...state, templates: action.payload, templateFetching: false };
    case actions.TEMPLATES_FAILED:
      return {
        ...state,
        templateFetching: false,
        error: action.payload,
        templates: [],
      };
    default:
      return state;
  }
};

export default templates;

export const getIsMeetingFetching = state => state.fetching;
export const getTemplate = state => state.templates;
export const templateFetching = state => state.templateFetching;
