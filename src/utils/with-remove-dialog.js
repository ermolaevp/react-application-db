import {
  withState,
  withHandlers,
  compose,
} from 'recompose';

export default compose(
  withState('removeDialogOpen', 'setRemoveDialogState', false),
  withHandlers({
    openRemoveDialog: ({ setRemoveDialogState }) => (e) => setRemoveDialogState(true),
    closeRemoveDialog: ({ setRemoveDialogState }) => (e) => setRemoveDialogState(false),
    toggleRemoveDialog: ({ removeDialogOpen, setRemoveDialogState }) => (e) => setRemoveDialogState(!removeDialogOpen),
  }),
);
