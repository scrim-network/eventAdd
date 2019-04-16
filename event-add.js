const baseURL = "file:///Users/rsm5139/Git/eventAdd/page.html";
const cheat_sheet = "https://www.cheatography.com/mackan90096/cheat-sheets/json/";

const test_string = `{
  "title":"This Week",
  "start_date":"2019-04-01",
  "end_date":"2019-04-05",
  "blurb":"Additional information",
  "events":[
  { "title":"Earth System Evolution as a Natural Lab for Planetary Science",
    "series":"Geosciences Colloquium",
    "location":"22 Deike Building",
    "start_date":"2019-04-02",
    "end_date":"2019-04-02",
    "start_time":"16:00",
    "end_time":"17:00",
    "all_day":false,
    "web":"https://dev.eesi.psu.edu/",
    "details":"Dr. Christopher Reinhard, Assistant Professor, School of Earth & Atmospheric Sciences, Georgia Institute of Technology"},
  { "title":"Carbon Biogeochemistry of Chesapeake Bay",
    "series":"Water Insights Seminar",
    "location":"312 Agricultural & Biological Engineering Building",
    "start_date":"2019-04-02",
    "end_date":"2019-04-02",
    "start_time":"12:00",
    "end_time":"13:00",
    "all_day":false,
    "details":"Raymond Najjar, Professor of Oceanography and Joint appointment with Department of Geosciences, Penn State"},
  { "title":"From Earth System Science to Coastal Flood Risk Management (and Back)",
    "series":"Energy & Environmental Economics & Policy (EEEP) Seminar",
    "location":"157 Hosler Building",
    "start_date":"2019-04-03",
    "end_date":"2019-04-03",
    "start_time":"12:00",
    "end_time":"13:00",
    "all_day":false,
    "details":"Dr. Klaus Keller, Professor, Department of Geosciences, Penn State"},
  { "title":"Monitoring Ocean Dynamics Through Sound",
    "series":"Meteorology & Atmospheric Science Colloquium",
    "location":"112 Walker Building",
    "start_date":"2019-04-03",
    "end_date":"2019-04-03",
    "start_time":"15:30",
    "end_time":"16:30",
    "all_day":false,
    "details":"Jennifer Miksis-Olds, Associate Director of Research, Research Professor, University of New Hampshire"},
  { "title":"Metamorphism and the Evolution of Plate Tectonics",
    "series":"",
    "location":"341 Deike Building",
    "start_date":"2019-04-05",
    "end_date":"2019-04-05",
    "start_time":"15:30",
    "end_time":"16:30",
    "all_day":false,
    "details":"Robert M. Holder, Postdoctoral Fellow, Department of Earth and Planetary Sciences, Johns Hopkins University"}
]}`;

const default_css = `#formatted {
  font-family: 'Arial',sans-serif;
  background: white;
  width: 100%;
}

#document-title {
  color: #8B0000;
}

.date-title {
  margin-top: 40px;
}

.event-title {
  font-weight: bold;
}

.event-calendar, .event-web {
  font-size: .9em;
}

.event {
  margin-bottom: 20px;
}

.title, .no-event {
  font-style: italic;
}

p {
  padding-bottom: 5px;
}

h4 {
  text-transform: uppercase;
  color: #15429D;
}`;

var default_string = `{

  "title":"This Week",
  "start_date":"2019-04-01",
  "end_date":"2019-04-05",
  "blurb":"",

  "events":[{

    "title":"Put your title here",
    "series":"seminar series, if applicable",
    "speaker": "John Doe, Jane Doe",
    "location":"event location",
    "start_date":"2019-04-02",
    "end_date":"2019-04-02",
    "start_time":"16:00",
    "end_time":"17:00",
    "all_day":false,
    "web":"https://clima.psu.edu",
    "details":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

    },{

    "title":"title",
    "series":"",
    "speaker":"",
    "location":"",
    "start_date":"2019-04-05",
    "end_date":"2019-04-05",
    "start_time":"15:30",
    "end_time":"16:30",
    "all_day":false,
    "details":"",
    "custom_section_1":"",
    "custom_section_2":"",
    "custom_section_3":"",
    "custom_section_4":"",
    "custom_section_5":""

}]}`;

//default_string = test_string;

function validDate(date, time) {
  //Checks that date string and time string are properly formatted.
  //Time is optional, as it is not needed in all-day events.
  //Returns true only if format is valid.
  const valid_date = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/;
  const valid_time = /^[0-9]{2}:[0-9]{2}$/;
  var tested = false;
  if (!date) {
    alert("Missing event date");
    return false;
  }
  tested = valid_date.test(date);
  if (!tested) {
    alert("Invalid date format: " + date + ".\nExcepted format: YYYY-MM-DD");
    return false;
  }
  tested = valid_time.test(time);
  if (time && !tested) {
    alert("Invalid time format: " + time + ". Excepted format: HH:mm");
    return false;
  }
  return true;
}

function dateString(date, time) {
  //Returns an acceptable string fro creating Date object
  if (time) {
    return "".concat(date, "T", time, ":00");
  } else {
    return "".concat(date, "T00:00:00");
  }
}

function formattedDates(startDate, endDate, allDay, startTime, endTime) {
  //Creates properly formatted strings for calendar URLs/iCal
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

// Easily wrap text into a new element
// defaults to empty p
function textWrap(string, tag, style) {
  const tag_name = (tag) ? tag : "p";
  const text = (string) ? string : "";
  const elem = document.createElement(tag_name);
  const t = document.createTextNode(text);
  if (style) {
    elem.className = style;
  }
  elem.appendChild(t);
  return elem;
}

function twoDigits(num) {
  //Returns num as a 2 character number (or more, if num is more than 2 characters).
  var nums = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"];
  if (num < 10) {
    return nums[num];
  } else {
    return num;
  }
}

function tryParseJSON(jsonString) {
  //Attempts to parse string as JSON object.
  //Returns either object or false.
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
  } catch (e) {}

  return false;
}

//The next 4 functions format the URLs/iCal for adding events.
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
  if (!allDay) {
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

function divMeUp(inner_element) {
  //Simply encloses DOM element in a div.
  const div_element = document.createElement("div");
  div_element.appendChild(inner_element);
  return div_element;
}

//This section deals with formatting the document
//documentTitle
//documentSubTitle
//documentBlurb
//dateTile
//locationTime
//eventTitle
//eventWeb
//eventSpeaker
//calendarLinks
function documentTitle(json_obj) {
  const elem = document.createElement("h1");
  const text = (json_obj.title) ? json_obj.title : "";
  const t = document.createTextNode(text);
  elem.id = "document-title";
  elem.appendChild(t);
  return elem;
}

function documentSubTitle(json_obj) {
  const elem = document.createElement("h3");
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const sd = new Date(dateString(json_obj.start_date, false));
  const ed =new Date(dateString(json_obj.end_date, false));
  const text = "".concat(months[sd.getMonth()], " ", sd.getDate(), " — ", months[ed.getMonth()], " ", ed.getDate(), ", ", ed.getFullYear());
  const t = document.createTextNode(text);
  elem.id = "document-subtitle";
  elem.appendChild(t);
  return elem;
}

function documentBlurb(json_obj) {
  const elem = document.createElement("p");
  const text = (json_obj.blurb) ? json_obj.blurb : "";
  const t = document.createTextNode(text);
  elem.id = "document-blurb";
  elem.appendChild(t);
  return elem;
}

function dateTitle(date_obj) {
  var d = date_obj;
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  var day = days[d.getDay()];
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var month = months[d.getMonth()];
  return "".concat(day, ", ", month, " ", d.getDate());
}

function locationTime(location, date, time, all_day) {
  const elem = document.createElement("p");
  elem.className = "event-location";
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
  if (!all_day) {
    formatted_string = formatted_string.concat("@ ", hour, ":", minute, " ", amPm);
  }
  elem.appendChild(document.createTextNode(formatted_string));
  return elem;
}

function eventTitle(title, series) {
  var formatted_string = "";
  var span_element = document.createElement("span");
  var title_element = document.createElement("p");
  var t = "";
  span_element.className = "title";
  title_element.className = "event-title";
  if (series) {
    t = document.createTextNode(series + ": ");
    title_element.appendChild(t);
  }
  span_element.innerHTML = title;
  title_element.appendChild(span_element);
  return title_element;
}

function eventWeb(event) {
  const a = document.createElement("a");
  const elem = document.createElement("p");
  const t = document.createTextNode("more info: ");
  a.innerHTML = event.web;
  a.href = event.web;
  elem.appendChild(t);
  elem.appendChild(a);
  elem.className = "event-web";
  return elem;
}

function eventSpeaker(json_obj) {
  const elem = document.createElement("p");
  const text = (json_obj.speaker) ? json_obj.speaker : "";
  const t = document.createTextNode(text);
  elem.className = "event-speaker";
  elem.appendChild(t);
  return elem;
}

function calendarLinks(event) {
  const elem = document.createElement("p");
  const event_title = event.series + ": " + event.title;
  const event_details = event.speaker + ", " + event.details;
  const arguments = [event.start_date, event.end_date, event.all_day, event.start_time, event.end_time, event.location, event_title, event_details];
  const yahooString = "http://calendar.yahoo.com/?v=60&".concat(createYahooString.apply(this, arguments));
  const googleString = "https://calendar.google.com/calendar/render?action=TEMPLATE&".concat(createGoogleString.apply(this, arguments));
  const outlookString = "https://outlook.office.com/owa/?path=/calendar/action/compose&rru=addevent&".concat(createOutlookString.apply(this, arguments));
  const iCalendarString = baseURL.concat("?action=DOWNLOAD&", createiCalendarString.apply(this, arguments));
  elem.className = "event-calendar";
  var t = null;
  var a = null;
  t = document.createTextNode("add to calendar: ");
  elem.appendChild(t);
  a = document.createElement("a");
  a.setAttribute("href", encodeURI(googleString));
  t = document.createTextNode("Google");
  a.appendChild(t);
  elem.appendChild(a);
  t = document.createTextNode(" | ");
  elem.appendChild(t);
  a = document.createElement("a");
  a.setAttribute("href", encodeURI(yahooString));
  t = document.createTextNode("Yahoo!");
  a.appendChild(t);
  elem.appendChild(a);
  t = document.createTextNode(" | ");
  elem.appendChild(t);
  a = document.createElement("a");
  a.setAttribute("href", encodeURI(outlookString));
  t = document.createTextNode("Outlook web");
  a.appendChild(t);
  elem.appendChild(a);
  t = document.createTextNode(" | ");
  elem.appendChild(t);
  a = document.createElement("a");
  a.setAttribute("href", encodeURI(iCalendarString));
  t = document.createTextNode("iCalendar file");
  a.appendChild(t);
  elem.appendChild(a);
  t = document.createTextNode(" (Apple Calendar, Outlook desktop)");
  elem.appendChild(t);
  return elem;
}

function generateOutput() {
  // Get editor values
  const json_obj = tryParseJSON(ace.edit("json-input").getValue());
  const current_css = ace.edit("css-input").getValue();

  // Document sections
  const rendered = document.createElement("div");
  rendered.id = "formatted";
  const document_head = document.createElement("div");
  document_head.id = "document-head";
  var date_title = document.createElement("div");

  var num_e = 0;
  var tmp = null;
  var td = null;
  var t = null;
  var i = 0;
  var sd = null;
  var ed = null;

  // Returns flase if object no valid JSON
  if (json_obj) {
    if (validDate(json_obj.start_date, false) && validDate(json_obj.end_date, false)) {
      sd = new Date(dateString(json_obj.start_date, false));
      ed = new Date(dateString(json_obj.end_date, false));
    } else {
      return false;
    }
    document_head.appendChild(documentTitle(json_obj));
    document_head.appendChild(documentSubTitle(json_obj));
    document_head.appendChild(documentBlurb(json_obj));
    rendered.appendChild(document_head);

    // Loop over each event
    json_obj.events.forEach(function(event) {
      i += 1;

      // Test for proper date format
      if (!validDate(event.start_date, event.start_time) || !validDate(event.end_date, event.end_time)) {
        return false;
      }

      // Test for an event title
      if (!event.title) {
        alert("Missing event title");
        return false;
      }

      // Need all_day to be true, or a time to be set
      if (!event.all_day && (!event.end_time || !event.start_time)) {
        alert("Start and end times must be defined unless 'all_day' is set to true");
        return false;
      }

      // Set variables
      var event_element = document.createElement("div");
      var date_element = document.createElement("h4");
      var title_element = document.createElement("p");
      var location_element = document.createElement("p");
      var details_element = document.createElement("p");
      var additional_element = document.createElement("p");
      var web_element = document.createElement("div");
      var speaker_element = document.createElement("p");

      // Start the event
      event_element.id = "event" + i;
      event_element.className = "event";

      // Underlined date
      td = new Date(dateString(event.start_date, false));
      while (td.getDate() > sd.getDate() || td.getMonth() > sd.getMonth()) {
        if (num_e == 0) {
          date_element = document.createElement("h4");
          date_element.innerHTML = dateTitle(sd);
          tmp = document.createElement("p");
          tmp.className = "no-event";
          t = document.createTextNode("no events");
          tmp.appendChild(t);
          date_title = document.createElement("div");
          date_title.className = "date-title";
          date_title.appendChild(date_element);
          date_title.appendChild(tmp);
          rendered.appendChild(date_title);
        }
        sd.setDate(sd.getDate() + 1);
        num_e = 0;
      }
      if (td.getDate() == sd.getDate()) {
        if (num_e == 0) {
          date_element = document.createElement("h4");
          date_element.innerHTML = dateTitle(sd);
          date_title = document.createElement("div");
          date_title.className = "date-title";
          date_title.appendChild(date_element);
          rendered.appendChild(date_title);
        }
        sd.setDate(sd.getDate() + 1);
        num_e = 0;
      }

      // Title of the event
      if (event.custom_section_1) {
        event_element.appendChild(textWrap(event.custom_section_1, "p", "event-title"));
      } else {
        event_element.appendChild(eventTitle(event.title, event.series));
      }

      // Speaker/s
      if (event.custom_section_2) {
        event_element.appendChild(textWrap(event.custom_section_2, "p", "event-speaker"));
      } else if (event.speaker) {
        event_element.appendChild(eventSpeaker(event));
      }

      // Location and time
      if (event.custom_section_3) {
        event_element.appendChild(textWrap(event.custom_section_3, "p", "event-location"));
      } else {
        event_element.appendChild(locationTime(event.location, event.start_date, event.start_time, event.all_day));
      }

      // Details
      if (event.custom_section_4) {
        event_element.appendChild(textWrap(event.custom_section_4, "p", "event-details"));
      } else if (event.details) {
        event_element.appendChild(textWrap(event.details, "p", "event-details"));
      }

      // Optional additional section
      if (event.custom_section_5) {
        event_element.appendChild(textWrap(event.custom_section_5, "p", "event-additional"));
      }

      // Web URL
      if (event.web) {
        event_element.appendChild(eventWeb(event));
      }

      // Bring them altogether
      event_element.appendChild(calendarLinks(event));
      rendered.appendChild(event_element);
    });
    while (ed.getDate() >= sd.getDate() || ed.getMonth() > sd.getMonth()) {
      if (num_e == 0) {
        date_element = document.createElement("h4");
        date_element.innerHTML = dateTitle(sd);
        rendered.appendChild(date_element);
        tmp = document.createElement("p");
        tmp.className = "no-event";
        t = document.createTextNode("no events");
        tmp.appendChild(t);
        rendered.appendChild(tmp);
      }
      sd.setDate(sd.getDate() + 1);
      num_e = 0;
    }
    var style_element = document.createElement("style");
    t = document.createTextNode(current_css);
    style_element.appendChild(t);
    rendered.appendChild(style_element);
    //rendered = divMeUp(rendered);
    document.getElementById("formatted-output").src = "about:blank";
    document.getElementById("formatted-output").src = 'data:text/html;charset=utf-8,' + encodeURI(divMeUp(rendered).innerHTML).replace(new RegExp("#", 'g'), "%23");
  } else {
    alert("Invalid JSON. Please correct errors and try again");
  }
}

function cssEditor() {
  const json_editor = ace.edit("json-input");
  const css_editor = ace.edit("css-input");
  if (document.getElementById("css-section").style.display == "none") {
    document.getElementById("json-section").style = "width:50%;";
    document.getElementById("css-section").style = "display:inline;";
  } else {
    document.getElementById("json-section").style = "width:100%;";
    document.getElementById("css-section").style = "display:none;";
  }
  json_editor.resize();
  css_editor.resize();
}

function initializeApp() {
  var formatted_output = document.createElement("iframe");
  var generate_button = document.createElement("button");
  var css_button = document.createElement("button");
  var buttons = document.createElement("div");
  var json_text = document.createElement("pre");
  var css_text = document.createElement("pre");
  var json_header = document.createElement("h4");
  var css_header = document.createElement("h4");
  var clear = document.createElement("p");
  clear.style = "clear: both;";
  json_header.innerHTML = "edit event details (<a href=\""+cheat_sheet+"\">JSON</a>)";
  json_header = divMeUp(json_header);
  json_header.id = "json-section";
  css_header.innerHTML = "edit style (CSS)";
  css_header = divMeUp(css_header);
  css_header.id = "css-section";
  css_header.style.display = "none";
  formatted_output.id = "formatted-output";
  json_text.id = "json-input";
  css_text.id = "css-input";
  json_header.appendChild(json_text);
  css_header.appendChild(css_text);
  json_header = divMeUp(json_header);
  json_header.id = "custom-input";
  json_header.appendChild(css_header);
  buttons.id = "buttons";
  generate_button.innerHTML = "Generate/Refresh HTML";
  generate_button.addEventListener("click", generateOutput);
  generate_button.id = "generate-button";
  buttons.appendChild(generate_button);
  css_button.innerHTML = "Toggle CSS";
  css_button.addEventListener("click", cssEditor);
  css_button.id = "css-button";
  buttons.appendChild(css_button);
  document.getElementById("eventAdd").appendChild(json_header);
  document.getElementById("eventAdd").appendChild(buttons);
  document.getElementById("eventAdd").appendChild(formatted_output);
  document.getElementById("eventAdd").appendChild(clear);

  // Ace editor
  const json_editor = ace.edit("json-input");
  json_editor.setTheme("ace/theme/xcode");
  json_editor.session.setMode("ace/mode/json");
  json_editor.getSession().setUseWrapMode(true);
  json_editor.setValue(default_string, -1);
  const css_editor = ace.edit("css-input");
  css_editor.setTheme("ace/theme/xcode");
  css_editor.session.setMode("ace/mode/css");
  css_editor.getSession().setUseWrapMode(true);
  css_editor.setValue(default_css, -1);
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
