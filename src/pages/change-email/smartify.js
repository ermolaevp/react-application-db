import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { actions } from 'react-redux-form';
import connectForm from 'utils/connect-form';
import { compose } from 'redux';
import lifecycle from 'recompose/lifecycle';

const selector = createStructuredSelector({
  email: state => state.currentUser.email,
});

const mapDispatchToProps = (dispatch, props) => ({
  change: (model, data) => dispatch(actions.change(model, data)),
});

const translates = {
  'invalid password': 'Неверный пароль',
  'new row for relation "users" violates check constraint "users_email_check"': 'Неверный формат email',
};

export default compose(
  connect(selector, mapDispatchToProps),
  connectForm({
    form: 'changeEmail',
    action: 'changeEmail',
    after: ({ dispatch }) => dispatch(actions.reset('changeEmail')),
    errorTransform: (err) => Promise.reject({
      commonErrors: translates[err.message] || err.message,
    }),
  }),
  lifecycle({
    componentDidMount() {
      this.props.change('changeEmail.email', this.props.email);
    },
  }),
);
