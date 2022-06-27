import * as actions from '../actions/host-ui';

const initialState = {
  host_ui: {
    chat_expand: false,
    scale_view: true,
    layout_view: 'POD',
    selected_screen: 1,
  },
};
const hostUI = (state = initialState, action) => {
  switch (action.type) {
    case actions.HOST_UI:
      return { ...state, host_ui: action.payload };
    default:
      return state;
  }
};

export default hostUI;

export const getHostUI = state => state.host_ui;
