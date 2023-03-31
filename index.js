// Your code here
function createEmployeeRecord(empArr) {
    return {
      firstName: empArr[0],
      familyName: empArr[1],
      title: empArr[2],
      payPerHour: empArr[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(empArrs) {
    return empArrs.map(empArr => createEmployeeRecord(empArr));
  }
  
  function createTimeInEvent(empRec, dateTimeStr) {
    let [date, hour] = dateTimeStr.split(' ');
    empRec.timeInEvents.push({
      type: 'TimeIn',
      hour: parseInt(hour),
      date: date
    });
    return empRec;
  }
  
  function createTimeOutEvent(empRec, dateTimeStr) {
    let [date, hour] = dateTimeStr.split(' ');
    empRec.timeOutEvents.push({
      type: 'TimeOut',
      hour: parseInt(hour),
      date: date
    });
    return empRec;
  }
  
  function hoursWorkedOnDate(empRec, dateStr) {
    let timeInEvent = empRec.timeInEvents.find(event => event.date === dateStr);
    let timeOutEvent = empRec.timeOutEvents.find(event => event.date === dateStr);
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
  }
  
  function wagesEarnedOnDate(empRec, dateStr) {
    let hours = hoursWorkedOnDate(empRec, dateStr);
    return hours * empRec.payPerHour;
  }
  
  function allWagesFor(empRec) {
    let datesWorked = empRec.timeInEvents.map(event => event.date);
    return datesWorked.reduce((totalWages, date) => totalWages + wagesEarnedOnDate(empRec, date), 0);
  }
  
  function calculatePayroll(empRecs) {
    return empRecs.reduce((totalWages, empRec) => totalWages + allWagesFor(empRec), 0);
  }
  
