import {
  withState,
  withHandlers,
  compose,
} from 'recompose';

export default compose(
  withState('dialogOpen', 'setDialogState', false),
  withHandlers({
    openDialog: ({ setDialogState }) => (e) => setDialogState(true),
    closeDialog: ({ setDialogState }) => (e) => setDialogState(false),
    toggleDialog: ({ dialogOpen, setDialogState }) => (e) => setDialogState(!dialogOpen),
  }),
);
