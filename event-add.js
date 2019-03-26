var baseURL = "file:///Users/rsm5139/Git/eventAdd/page.html";

function eventAdd() {
  var startDate = document.getElementById("start-date").value;
  var endDate = document.getElementById("end-date").value;
  var allDay = document.getElementById("all-day").checked;
  var startTime = document.getElementById("start-time").value;
  var endTime = document.getElementById("end-time").value;
  var location = document.getElementById("location").value;
  var title = document.getElementById("title").value;
  var detail = document.getElementById("detail").value;
  var yahooString = "http://calendar.yahoo.com/?v=60&".concat(createYahooString(startDate, endDate, allDay, startTime, endTime, location, title, detail));
  var googleString = "https://calendar.google.com/calendar/render?action=TEMPLATE&".concat(createGoogleString(startDate, endDate, allDay, startTime, endTime, location, title, detail));
  var iCalendarString = baseURL.concat("?action=DOWNLOAD&", createiCalendarString(startDate, endDate, allDay, startTime, endTime, location, title, detail));
  document.getElementById("yahoo").value = encodeURI(yahooString);
  document.getElementById("google").value = encodeURI(googleString);
  document.getElementById("ical").value = encodeURI(iCalendarString);
}

function createGoogleString(startDate, endDate, allDay, startTime, endTime, location, title, detail) {
  formatted = formattedDates(startDate, endDate, allDay, startTime, endTime);
  return "".concat("text=",
    title,
    "&dates=",
    formatted[0],
    "/",
    formatted[1],
    "&location=",
    location,
    "&details=",
    detail
  );
}

function createYahooString(startDate, endDate, allDay, startTime, endTime, location, title, detail) {
  formatted = formattedDates(startDate, endDate, allDay, startTime, endTime);
  var duration = "";
  var dateTime = "&ST=" + formatted[0];
  if (! allDay) {
    var d1 = dateString(startDate, startTime);
    d1 = new Date(d1);
    var d2 = dateString(endDate, endTime);
    d2 = new Date(d2);
    var hrs = twoDigits(Math.floor((d2 - d1) / 1000 / 60 / 60));
    var mins = twoDigits((d2 - d1) / 1000 / 60 % 60);
    duration = hrs + mins;
    dateTime = dateTime.concat("&DUR=", duration);
  } else {
    var dateTime = dateTime.concat("&ET=", formatted[1]);
  }
  return "".concat("TITLE=",
    title,
    dateTime,
    "&in_loc=",
    location,
    "&DESC=",
    detail
  );
}

function createiCalendarString(startDate, endDate, allDay, startTime, endTime, location, title, detail) {
  formatted = formattedDates(startDate, endDate, allDay, startTime, endTime);
  return "".concat("startDate=",
    formatted[0],
    "&endDate=",
    formatted[1],
    "&allDay=",
    allDay,
    "&location=",
    location,
    "&title=",
    title,
    "&detail=",
    detail
  );
}

function dateString(date, time) {
  if (time) {
    return "".concat(date, "T", time, ":00");
  } else {
    return "".concat(date, "T00:00:00");
  }
}

function formattedDates(startDate, endDate, allDay, startTime, endTime) {
  if (allDay) {
    var ds = dateString(startDate, startTime);
    var d = new Date(ds);
    var dt = twoDigits(d.getDate());
    var mn = twoDigits(d.getMonth() + 1);
    var yr = d.getFullYear();
    var formattedStart = "".concat(yr, mn, dt);
    ds = dateString(endDate, endTime);
    d = new Date(ds);
    d.setDate(d.getDate() + 1);
    dt = twoDigits(d.getDate());
    mn = twoDigits(d.getMonth() + 1);
    yr = d.getFullYear();
    var formattedEnd = "".concat(yr, mn, dt);
  } else {
    var ds = dateString(startDate, startTime);
    var d = new Date(ds);
    var dt = twoDigits(d.getUTCDate());
    var mn = twoDigits(d.getUTCMonth() + 1);
    var yr = d.getUTCFullYear();
    var hr = twoDigits(d.getUTCHours());
    var mt = twoDigits(d.getUTCMinutes());
    var sc = twoDigits(d.getUTCSeconds());
    var formattedStart = "".concat(yr, mn, dt, "T", hr, mt, sc, "Z");
    ds = dateString(endDate, endTime);
    d = new Date(ds);
    dt = twoDigits(d.getUTCDate());
    mn = twoDigits(d.getUTCMonth() + 1);
    yr = d.getUTCFullYear();
    hr = twoDigits(d.getUTCHours());
    mt = twoDigits(d.getUTCMinutes());
    sc = twoDigits(d.getUTCSeconds());
    var formattedEnd = "".concat(yr, mn, dt, "T", hr, mt, sc, "Z");
  }
  return [formattedStart, formattedEnd];
}

function twoDigits(num) {
  var nums = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"];
  if (num < 10) {
    return nums[num];
  } else {
    return num;
  }
}

function hideTime() {
  if (document.getElementById("time-input").style.display == "none") {
    document.getElementById("time-input").style.display = "block";
  } else {
    document.getElementById("time-input").style.display = "none";
  }
}

function downloadICal() {
  var filename = "event.ics";
  var text = "BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\n";
  var url = new URL(window.location.href);
  var startDate = url.searchParams.get("startDate");
  var endDate = url.searchParams.get("endDate");
  var allDay = url.searchParams.get("allDay");
  var location = url.searchParams.get("location");
  var title = url.searchParams.get("title");
  var detail = url.searchParams.get("detail");
  text = text.concat(
    "DTSTART:",
    startDate,
    "\nDTEND:",
    endDate,
    "\nSUMMARY:",
    title,
    "\nDESCRIPTION:",
    detail,
    "\nLOCATION:",
    location,
    "\nEND:VEVENT\nEND:VCALENDAR"
  );
  document.body.innerHTML = "";
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  window.close();
  return false;
}

document.addEventListener("DOMContentLoaded", function() {
  var url = new URL(window.location.href);
  if (url.searchParams.get("action")) {
    downloadICal();
  }
}, false);
