/* eslint-disable no-extend-native */
import { useEffect, useState } from 'react';
import './App.css';

// Returns the ISO week of the date.
Date.prototype.getWeek = function () {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
};

// Returns the four-digit year corresponding to the ISO week of the date.
Date.prototype.getWeekYear = function () {
  var date = new Date(this.getTime());
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  return date.getFullYear();
};

function App() {
  const currentWeek = new Date().getWeek();
  const [firstStudyWeek, setFirstStudyWeek] = useState(
    Number(localStorage.getItem('@firstStudyWeek'))
  );
  const [weekInput, setWeekInput] = useState();
  const [tapCount, setTapCount] = useState(0);

  useEffect(() => {
    localStorage.setItem('@firstStudyWeek', `${firstStudyWeek}`);
  }, [firstStudyWeek]);

  const handleFirstWeekSubmit = (e) => {
    setFirstStudyWeek(weekInput);
    setTapCount(0);
  };

  console.log(currentWeek, firstStudyWeek);

  if (firstStudyWeek === null || tapCount === 10) {
    return (
      <div className="App">
        <h1>Semester started in week:</h1>
        <input
          onChange={(e) => setWeekInput(e.target.valueAsNumber)}
          value={weekInput}
          type="number"
        />
        <button onClick={handleFirstWeekSubmit}>Submit</button>
      </div>
    );
  }
  return (
    <div className="App" onClick={() => setTapCount((current) => current + 1)}>
      <h1>Week {currentWeek - (firstStudyWeek - 1)}</h1>
    </div>
  );
}

export default App;
