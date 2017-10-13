import {
  withState,
  withHandlers,
  compose,
} from 'recompose';

export default compose(
  withState('removeRatingDialogOpen', 'setRemoveRatingDialogState', false),
  withHandlers({
    openRemoveRatingDialog: ({ setRemoveRatingDialogState }) => (e) => setRemoveRatingDialogState(true),
    closeRemoveRatingDialog: ({ setRemoveRatingDialogState }) => (e) => setRemoveRatingDialogState(false),
    toggleRemoveRatingDialog: ({ removeRatingDialogOpen, setRemoveRatingDialogState }) => (e) => setRemoveRatingDialogState(!removeRatingDialogOpen),
  }),
);
