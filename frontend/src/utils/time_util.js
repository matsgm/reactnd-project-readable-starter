// Based on the example here: https://docs.microsoft.com/en-us/scripting/javascript/calculating-dates-and-times-javascript
// TODO: More granular returns (a day, an hour, a minute)

export const timeSince = (timestamp) => {
  let msecPerMinute = 1000 * 60;  
  let msecPerHour = msecPerMinute * 60;  
  let msecPerDay = msecPerHour * 24;  

  let msecNow = Date.now()

  let interval = msecNow - timestamp

  var days = Math.floor(interval / msecPerDay );  
  var hours = Math.floor(interval / msecPerHour );  
  var minutes = Math.floor(interval / msecPerMinute );  
  //var seconds = Math.floor(interval / 1000 );  

  if (days >= 2) {
    return `${days} days ago`
  } else if(hours >= 2) {
    return `${hours} hours ago`
  } else if(minutes >= 1) {
    return `${minutes} mins ago`
  } else {
    return `Under 1 minute ago`
  }
}