var baseURL = "file:///Users/rsm5139/Git/eventAdd/page.html";

var test_string = `{
  "title":"'This Week'",
  "date_range":"April 01 - April 05, 2019",
  "events":[
  { "title":"Geosciences Colloquium Series Speaker",
    "location":"22 Deike Building",
    "start_date":"2019-04-02",
    "end_date":"2019-04-02",
    "start_time":"16:00",
    "end_time":"17:00",
    "all_day":false,
    "details":"Dr. Christopher Reinhard, Assistant Professor, School of Earth & Atmospheric Sciences, Georgia Institute of Technology - \\"Earth System Evolution as a Natural Lab for Planetary Science\\""},
  { "title":"Water Insights Seminar",
    "location":"312 Agricultural & Biological Engineering Building",
    "start_date":"2019-04-02",
    "end_date":"2019-04-02",
    "start_time":"12:00",
    "end_time":"13:00",
    "all_day":false,
    "details":"Raymond Najjar, Professor of Oceanography and Joint appointment with Department of Geosciences, Penn State - \\"Carbon Biogeochemistry of Chesapeake Bay\\""},
  { "title":"Energy & Environmental Economics & Policy (EEEP) Seminar",
    "location":"157 Hosler Building",
    "start_date":"2019-04-03",
    "end_date":"2019-04-03",
    "start_time":"12:00",
    "end_time":"13:00",
    "all_day":false,
    "details":"Dr. Klaus Keller, Professor, Department of Geosciences, Penn State - \\"From Earth System Science to Coastal Flood Risk Management (and Back)\\""},
  { "title":"Meteorology & Atmospheric Science Colloquium",
    "location":"112 Walker Building",
    "start_date":"2019-04-03",
    "end_date":"2019-04-03",
    "start_time":"15:30",
    "end_time":"16:30",
    "all_day":false,
    "details":"Jennifer Miksis-Olds, Associate Director of Research, Research Professor, University of New Hampshire - \\"Monitoring Ocean Dynamics Through Sound\\""},
  { "title":"Geochemistry Forum",
    "location":"341 Deike Building",
    "start_date":"2019-04-05",
    "end_date":"2019-04-05",
    "start_time":"15:30",
    "end_time":"16:30",
    "all_day":false,
    "details":"Robert M. Holder, Postdoctoral Fellow, Department of Earth and Planetary Sciences, Johns Hopkins University - \\"Metamorphism and the Evolution of Plate Tectonics\\""}
]}`;

var default_css = `#formatted {
  text-align:center;
  font-family: 'Arial',sans-serif;
}

#location {
  font-weight: bold;
}

ul {
  padding-left: 0;
}

ul li {
  display:inline;
  padding-right: 10px;
}

h3 {
  margin-bottom: 50px;
}

h4 {
  font-style: italic;
  text-decoration: underline;
  color: #215868;
  padding-top: 40px;
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

function createOutlookString(startDate, endDate, allDay, startTime, endTime, location, title, detail) {
  formatted = formattedDates(startDate, endDate, allDay, startTime, endTime);
  return "".concat("subject=",
    title,
    "&startdt=",
    formatted[0],
    "&enddt",
    formatted[1],
    "&location=",
    location,
    "&body=",
    detail,
    "&allday=",
    allDay
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

function dateTitle (date, time) {
  var ds = dateString(date, time);
  var d = new Date(ds);
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  var day = days[d.getDay()];
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var month = months[d.getMonth()];
  return "".concat(day, ", ", month, " ", d.getDate());
}

function locationTime (location, date, time, all_day) {
  var ds = dateString(date, time);
  var d = new Date(ds);
  var hours = ["12", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"];
  var amPm = "PM"
  var hour = hours[d.getHours()];
  var minute = twoDigits(d.getMinutes());
  var formatted_string = "";
  if (d.getHours < 12) {
    amPm = "AM";
  }
  if (location) {
    formatted_string = formatted_string.concat(location, " ");
  }
  if (! all_day) {
    formatted_string = formatted_string.concat("@ ", hour, ":", minute, " ", amPm);
  }
  return formatted_string;
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
      var date_element = document.createElement("h4");
      var title_element = document.createElement("p");
      var location_element = document.createElement("p");
      var details_element = document.createElement("p");
      var links_element = document.createElement("ul");
      var links_element2 = document.createElement("ul");
      var arguments = [event.start_date, event.end_date, event.all_day, event.start_time, event.end_time, event.location, event.title, event.details];
      var yahooString = "http://calendar.yahoo.com/?v=60&".concat(createYahooString.apply(this, arguments));
      var googleString = "https://calendar.google.com/calendar/render?action=TEMPLATE&".concat(createGoogleString.apply(this, arguments));
      var outlookString = "https://outlook.live.com/owa/?path=/calendar/action/compose&rru=addevent&".concat(createOutlookString.apply(this, arguments));
      var iCalendarString = baseURL.concat("?action=DOWNLOAD&", createiCalendarString.apply(this, arguments));
      event_element.id = "event"+i;
      date_element.innerHTML = dateTitle(event.start_date, event.start_time);
      var t = document.createTextNode(event.title);
      title_element.appendChild(t);
      t = document.createTextNode(locationTime(event.location, event.start_date, event.start_time, event.all_day));
      location_element.appendChild(t);
      location_element.id = "location";
      t = document.createTextNode(event.details);
      details_element.appendChild(t);
      var le = document.createElement("li");
      t = document.createTextNode("Add to calendar:");
      le.appendChild(t);
      links_element.appendChild(le);
      le = document.createElement("li");
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
      a.setAttribute("href", encodeURI(outlookString));
      t = document.createTextNode("Outlook.com");
      a.appendChild(t);
      le.appendChild(a);
      links_element.appendChild(le);
      le = document.createElement("li");
      t = document.createTextNode("Download:");
      le.appendChild(t);
      links_element2.appendChild(le);
      le = document.createElement("li");
      a = document.createElement("a");
      a.setAttribute("href", encodeURI(iCalendarString));
      t = document.createTextNode("Apple calendar & Outlook desktop");
      a.appendChild(t);
      le.appendChild(a);
      links_element2.appendChild(le);
      event_element.appendChild(date_element);
      event_element.appendChild(title_element);
      event_element.appendChild(location_element);
      event_element.appendChild(details_element);
      event_element.appendChild(links_element);
      event_element.appendChild(links_element2);
      rendered.appendChild(event_element);
    });
    var style_element = document.createElement("style");
    t = document.createTextNode(current_css);
    style_element.appendChild(t);
    rendered.appendChild(style_element);
    var title = document.createElement("h1");
    t = document.createTextNode(json_obj.title);
    title.appendChild(t);
    rendered.insertBefore(title, rendered.childNodes[0]);
    var date_range = document.createElement("h3");
    t = document.createTextNode(json_obj.date_range);
    date_range.appendChild(t);
    rendered.insertBefore(date_range, rendered.childNodes[1]);
    rendered = divMeUp(rendered);
    document.getElementById("formatted-output").src = 'data:text/html;charset=utf-8,' + encodeURI(rendered.innerHTML).replace("#", "%23");
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
  formatted_output.height = "500";
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
