import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import PrevPageIcon from 'material-ui/svg-icons/navigation/chevron-left';
import NextPageIcon from 'material-ui/svg-icons/navigation/chevron-right';
import FirstPageIcon from 'material-ui/svg-icons/navigation/first-page';
import LastPageIcon from 'material-ui/svg-icons/navigation/last-page';

const itemsOnPage = 15;

function pagesArray(total, first) {
  const pagesQty = Math.ceil(total / itemsOnPage);
  const arr = [];
  for (let i = 1; i <= pagesQty; i++) {
    const offset = itemsOnPage * (i - 1);
    arr.push({
      page: i,
      limit: itemsOnPage,
      offset,
      current: offset === first,
    });
  }
  return arr;
}

const Pagination = ({ endpoint, first, last, total }) => {
  const pArray = pagesArray(total, first);
  const currentIndex = pArray.findIndex(p => p.current);
  let firstElemIndex = (currentIndex - 2) < 0 ? 0 : currentIndex - 2;
  let lastElemIndex = (currentIndex + 2) > (pArray.length - 1) ? pArray.length - 1 : currentIndex + 2;
  if (pArray.length > itemsOnPage) {
    if (currentIndex === 0) lastElemIndex += 2;
    if (currentIndex === 1) lastElemIndex += 1;
    if (currentIndex === pArray.length - 1) firstElemIndex -= 2;
    if (currentIndex === pArray.length - 2) firstElemIndex -= 1;
  }
  let prevOffset = first - itemsOnPage;
  if (prevOffset <= 0) prevOffset = 0;
  let nextOffset = first + itemsOnPage;
  const lastOffset = pArray[pArray.length - 1].offset;
  if (nextOffset >= total) nextOffset = lastOffset;
  return (
    <div style={{ margin: '.5rem auto', display: 'flex', justifyContent: 'center' }}>
      <RaisedButton
        icon={<FirstPageIcon />}
        containerElement={<Link to={`/${endpoint}?limit=${itemsOnPage}&offset=0`} />}
        disabled={currentIndex === 0}
      />
      <RaisedButton
        icon={<PrevPageIcon />}
        containerElement={<Link to={`/${endpoint}?limit=${itemsOnPage}&offset=${prevOffset}`} />}
        disabled={currentIndex <= firstElemIndex}
      />
      {pArray.slice(firstElemIndex, lastElemIndex + 1).map(p =>
        <RaisedButton
          key={p.page}
          label={p.page}
          containerElement={<Link to={`/${endpoint}?limit=${p.limit}&offset=${p.offset}`} />}
          backgroundColor={p.current ? 'rgb(207, 216, 220)' : 'white'}
        />
      )}
      <RaisedButton
        icon={<NextPageIcon />}
        containerElement={<Link to={`/${endpoint}?limit=${itemsOnPage}&offset=${nextOffset}`} />}
        disabled={currentIndex >= lastElemIndex}
      />
      <RaisedButton
        icon={<LastPageIcon />}
        containerElement={<Link to={`/${endpoint}?limit=${itemsOnPage}&offset=${lastOffset}`} />}
        disabled={currentIndex === pArray.length - 1}
      />
    </div>
  );
};

Pagination.propTypes = {
  endpoint: PropTypes.string.isRequired,
  first: PropTypes.number.isRequired,
  last: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default Pagination;
