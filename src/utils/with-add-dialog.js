import {
  withState,
  withHandlers,
  compose,
} from 'recompose';

export default compose(
  withState('addDialogOpen', 'setAddDialogState', false),
  withHandlers({
    openAddDialog: ({ setAddDialogState }) => (e) => setAddDialogState(true),
    closeAddDialog: ({ setAddDialogState }) => (e) => setAddDialogState(false),
    toggleAddDialog: ({ addDialogOpen, setAddDialogState }) => (e) => setAddDialogState(!addDialogOpen),
  }),
);
