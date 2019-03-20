function eventAdd() {
  var startDate = document.getElementById("start-date").value;
  var endDate = document.getElementById("end-date").value;
  var allDay = document.getElementById("all-day").checked;
  var startTime = document.getElementById("start-time").value;
  var endTime = document.getElementById("end-time").value;
  var location = document.getElementById("location").value;
  var title = document.getElementById("title").value;
  var detail = document.getElementById("detail").value;
  var tz = document.getElementById("ctz");
  var ctz = tz.options[tz.selectedIndex].value;
  var yahooString = "http://calendar.yahoo.com/?v=60&".concat(createYahooString(startDate, endDate, allDay, startTime, endTime, location, title, detail, ctz));
  var googleString = "https://calendar.google.com/calendar/render?action=TEMPLATE&".concat(createGoogleString(startDate, endDate, allDay, startTime, endTime, location, title, detail, ctz));
  var iCalendarString = "TODO".concat(createiCalendarString(startDate, endDate, allDay, startTime, endTime, location, title, detail, ctz));
  document.getElementById("yahoo").value = encodeURI(yahooString);
  document.getElementById("google").value = encodeURI(googleString);
  document.getElementById("ical").value = encodeURI(iCalendarString);
}

function createGoogleString(startDate, endDate, allDay, startTime, endTime, location, title, detail, ctz) {
  var ds = dateString(startDate, startTime);
  var d = new Date(ds);
  var dt = twoDigits(d.getDate());
  var mn = twoDigits(d.getMonth() + 1);
  var yr = d.getFullYear();
  var hr = twoDigits(d.getHours());
  var mt = twoDigits(d.getMinutes());
  var sc = twoDigits(d.getSeconds());
  if (allDay) {
    var formattedStart = "".concat(yr, mn, dt);
  } else {
    var fomattedStart = "".concat(yr, mn, dt, "T", hr, ":", mt, ":", sc);
  }
  ds = dateString(endDate, endTime);
  d = new Date(ds);
  if (allDay) {
    d.setDate(d.getDate() + 1);
  }
  dt = twoDigits(d.getDate());
  mn = twoDigits(d.getMonth() + 1);
  yr = d.getFullYear();
  hr = twoDigits(d.getHours());
  mt = twoDigits(d.getMinutes());
  sc = twoDigits(d.getSeconds());
  if (allDay) {
    var formattedEnd = "".concat(yr, mn, dt);
  } else {
    var fomattedEnd = "".concat(yr, mn, dt, "T", hr, ":", mt, ":", sc);
  }
  return "".concat("text=",
    title,
    "&dates=",
    formattedStart,
    "/",
    formattedEnd,
    "&location=",
    location,
    "&ctz=",
    ctz,
    "&details=",
    detail
  );
}

function createYahooString(startDate, endDate, allDay, startTime, endTime, location, title, detail, ctz) {
  var ds = dateString(startDate, startTime);
  var d1 = new Date(ds);
  ds = dateString(endDate, endTime);
  var d2 = new Date(ds);
  if (allDay) {
    d2.setDate(d2.getDate() + 1);
  }
  var hrs = twoDigits(Math.floor((d2 - d1) / 1000 / 60 / 60));
  var mts = twoDigits((d2 - d1) / 1000 / 60 % 60);
  var duration = "".concat(hrs, mts);
  var dt = twoDigits(d.getDate());
  var mn = twoDigits(d.getMonth() + 1);
  var yr = d.getFullYear();
  var hr = twoDigits(d.getHours());
  var mt = twoDigits(d.getMinutes());
  var sc = twoDigits(d.getSeconds());
  if (allDay) {
    var formattedDate = "".concat(yr, mn, dt);
  } else {
    var fomattedDate = "".concat(yr, mn, dt, "T", hr, ":", mt, ":", sc);
  }
  return "".concat("TITLE=",
    title,
    "&ST=",
    formattedDate,
    "&in_loc=",
    location,
    "&DUR=",
    duration,
    "&DESC=",
    detail
  );
}

function createiCalendarString(startDate, endDate, allDay, startTime, endTime, location, title, detail, ctz) {
  var string = "";
  return string;
}

function dateString(date, time) {
  if (time) {
    return "".concat(date, "T", time, ":00");
  } else {
    return "".concat(date, "T00:00:00");
  }
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
