var baseURL = "file:///Users/rsm5139/Git/eventAdd/page.html";

var test_string = `{
  "events":[
  { "title":"New Years Party",
    "location":"Penn State",
    "start_date":"2019-12-31",
    "end_date":"2020-01-01",
    "start_time":"23:00",
    "end_time":"01:00",
    "all_day":false,
    "details":"Come join us for this epic party!"},
  { "title":"New Years Hangover",
    "location":"Everywhere",
    "start_date":"2020-01-01",
    "end_date":"2020-01-01",
    "all_day":true,
    "details":"Nurse your hangover and try to get through the workday."}
]}`;

var default_css = `h2 {
  color:inherit;
}`;

var default_string = test_string;

function dateString(date, time) {
  if (time) {
    return "".concat(date, "T", time, ":00");
  } else {
    return "".concat(date, "T00:00:00");
  }
}

function formattedDates(startDate, endDate, allDay, startTime, endTime) {
  var ds = dateString(startDate, startTime);
  var d = new Date(ds);
  var dt = null;
  var mn = null;
  var yr = null;
  var hr = null;
  var mt = null;
  var sc = null;
  var formattedStart = null;
  var formattedEnd = null;
  if (allDay) {
    dt = twoDigits(d.getDate());
    mn = twoDigits(d.getMonth() + 1);
    yr = d.getFullYear();
    formattedStart = "".concat(yr, mn, dt);
    ds = dateString(endDate, endTime);
    d = new Date(ds);
    d.setDate(d.getDate() + 1);
    dt = twoDigits(d.getDate());
    mn = twoDigits(d.getMonth() + 1);
    yr = d.getFullYear();
    formattedEnd = "".concat(yr, mn, dt);
  } else {
    dt = twoDigits(d.getUTCDate());
    mn = twoDigits(d.getUTCMonth() + 1);
    yr = d.getUTCFullYear();
    hr = twoDigits(d.getUTCHours());
    mt = twoDigits(d.getUTCMinutes());
    sc = twoDigits(d.getUTCSeconds());
    formattedStart = "".concat(yr, mn, dt, "T", hr, mt, sc, "Z");
    ds = dateString(endDate, endTime);
    d = new Date(ds);
    dt = twoDigits(d.getUTCDate());
    mn = twoDigits(d.getUTCMonth() + 1);
    yr = d.getUTCFullYear();
    hr = twoDigits(d.getUTCHours());
    mt = twoDigits(d.getUTCMinutes());
    sc = twoDigits(d.getUTCSeconds());
    formattedEnd = "".concat(yr, mn, dt, "T", hr, mt, sc, "Z");
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

function tryParseJSON (jsonString) {
    try {
        var o = JSON.parse(jsonString);

        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns null, and typeof null === "object",
        // so we must check for that, too. Thankfully, null is falsey, so this suffices:
        // https://stackoverflow.com/questions/3710204/how-to-check-if-a-string-is-a-valid-json-string-in-javascript-without-using-try
        if (o && typeof o === "object") {
            return o;
        }
    }
    catch (e) { }

    return false;
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
    dateTime = dateTime.concat("&ET=", formatted[1]);
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

function generateOutput () {
  var json_obj = tryParseJSON(document.getElementById("json-input").value);
  var current_css = document.getElementById("css-input").value;
  var rendered = document.createElement("div");
  rendered.id = "formatted";
  var i = 0;
  if (json_obj) {
    json_obj.events.forEach(function(event) {
      i += 1;
      var event_element = document.createElement("div");
      var title_element = document.createElement("h2");
      var location_element = document.createElement("p");
      var details_element = document.createElement("p");
      var time_element = document.createElement("p");
      var links_element = document.createElement("ul");
      var arguments = [event.start_date, event.end_date, event.all_day, event.start_time, event.end_time, event.location, event.title, event.details];
      var yahooString = "http://calendar.yahoo.com/?v=60&".concat(createYahooString.apply(this, arguments));
      var googleString = "https://calendar.google.com/calendar/render?action=TEMPLATE&".concat(createGoogleString.apply(this, arguments));
      var iCalendarString = baseURL.concat("?action=DOWNLOAD&", createiCalendarString.apply(this, arguments));
      event_element.id = "event"+i;
      var t = document.createTextNode(event.title);
      title_element.appendChild(t);
      t = document.createTextNode(event.location);
      location_element.appendChild(t);
      t = document.createTextNode(event.details);
      details_element.appendChild(t);
      t = document.createTextNode(dateString(event.start_date, event.start_time)+" to "+dateString(event.end_date, event.end_time));
      time_element.appendChild(t);
      var le = document.createElement("li");
      var a = document.createElement("a");
      a.setAttribute("href", encodeURI(googleString));
      t = document.createTextNode("Google");
      a.appendChild(t);
      le.appendChild(a);
      links_element.appendChild(le);
      le = document.createElement("li");
      a = document.createElement("a");
      a.setAttribute("href", encodeURI(yahooString));
      t = document.createTextNode("Yahoo");
      a.appendChild(t);
      le.appendChild(a);
      links_element.appendChild(le);
      le = document.createElement("li");
      a = document.createElement("a");
      a.setAttribute("href", encodeURI(iCalendarString));
      t = document.createTextNode("iCal");
      a.appendChild(t);
      le.appendChild(a);
      links_element.appendChild(le);
      event_element.appendChild(title_element);
      event_element.appendChild(location_element);
      event_element.appendChild(details_element);
      event_element.appendChild(time_element);
      event_element.appendChild(links_element);
      rendered.appendChild(event_element);
    });
    var style_element = document.createElement("style");
    t = document.createTextNode(current_css);
    style_element.appendChild(t);
    rendered.appendChild(style_element);
    rendered = divMeUp(rendered);
    document.getElementById("formatted-output").src = 'data:text/html;charset=utf-8,' + encodeURI(rendered.innerHTML);
  } else {
    alert("Invalid JSON. Please correct errors and try again");
  }
}

function divMeUp (inner_element) {
  var div_element = document.createElement("div");
  div_element.appendChild(inner_element);
  return div_element;
}

function initializeApp () {
  var formatted_output = document.createElement("iframe");
  var generate_button = document.createElement("button");
  var json_text = document.createElement("textarea");
  var css_text = document.createElement("textarea");
  json_text.cols = "50";
  json_text.rows = "25";
  css_text.cols = "50";
  css_text.rows = "25";
  formatted_output.width = "641";
  formatted_output.id = "formatted-output";
  json_text.value = default_string;
  json_text.id = "json-input";
  css_text.value = default_css;
  css_text.id = "css-input";
  json_text = divMeUp(json_text);
  json_text.appendChild(css_text);
  generate_button.innerHTML = "GENERATE";
  generate_button.addEventListener("click", generateOutput);
  generate_button = divMeUp(generate_button);
  document.getElementById("eventAdd").appendChild(formatted_output);
  document.getElementById("eventAdd").appendChild(json_text);
  document.getElementById("eventAdd").appendChild(generate_button);
}

initializeApp();

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
