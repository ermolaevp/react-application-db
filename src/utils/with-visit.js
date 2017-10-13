import {
  withState,
  withHandlers,
  compose,
} from 'recompose';

export default compose(
  withState('visitLink', 'setVisitLink', null),
  withHandlers({
    visit: ({ setVisitLink }) => (visitLink) => (e) => setVisitLink(visitLink),
    resetVisitLink: ({ setVisitLink }) => setVisitLink(null),
  }),
);
