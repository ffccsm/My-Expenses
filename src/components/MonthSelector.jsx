import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const MonthSelector = ({ currentDate, updateMonth }) => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    updateMonth(newDate);
  };

  return (
    <div className="month-selector">
      <button onClick={() => changeMonth('prev')}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <h2>{`${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}</h2>
      <button onClick={() => changeMonth('next')}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default MonthSelector;