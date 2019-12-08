import { Duration, LocalDateTime } from "js-joda";

const moment = require("moment");
const humanizeDuration = require("humanize-duration");

const myHumanizer = humanizeDuration.humanizer({
  language: "shortEn",
  languages: {
    en_short: {
      y: () => "y",
      mo: () => "mo",
      w: () => "w",
      d: () => "d",
      h: () => "h",
      m: () => "m",
      s: () => "s",
      ms: () => "ms"
    },
    en: {
      y: function(c) {
        return "year" + (c === 1 ? "" : "s");
      },
      mo: function(c) {
        return "month" + (c === 1 ? "" : "s");
      },
      w: function(c) {
        return "week" + (c === 1 ? "" : "s");
      },
      d: function(c) {
        return "day" + (c === 1 ? "" : "s");
      },
      h: function(c) {
        return "hour" + (c === 1 ? "" : "s");
      },
      m: function(c) {
        return "minute" + (c === 1 ? "" : "s");
      },
      s: function(c) {
        return "second" + (c === 1 ? "" : "s");
      },
      ms: function(c) {
        return "millisecond" + (c === 1 ? "" : "s");
      },
      decimal: "."
    },
    es: {
      y: function(c) {
        return "año" + (c === 1 ? "" : "s");
      },
      mo: function(c) {
        return "mes" + (c === 1 ? "" : "es");
      },
      w: function(c) {
        return "semana" + (c === 1 ? "" : "s");
      },
      d: function(c) {
        return "día" + (c === 1 ? "" : "s");
      },
      h: function(c) {
        return "hora" + (c === 1 ? "" : "s");
      },
      m: function(c) {
        return "minuto" + (c === 1 ? "" : "s");
      },
      s: function(c) {
        return "segundo" + (c === 1 ? "" : "s");
      },
      ms: function(c) {
        return "milisegundo" + (c === 1 ? "" : "s");
      },
      decimal: ","
    }
  }
});

export function formatPeriod(periodInSeconds: number): string {
  console.log("Format Period ---------------------------------------:" + periodInSeconds);
  //https://www.npmjs.com/package/humanize-duration
  var sec_num = periodInSeconds;
  var years = Math.floor(sec_num / (3600 * 24 * 365));
  var months = Math.floor(sec_num / (3600 * 24 * 365 / 12));
  var days = Math.floor(sec_num / (3600 * 24));
  var weeks = Math.floor(sec_num / (3600 * 24 * 7));
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

//['y', 'mo', 'w', 'd', 'h', 'm', 's', 'ms']
  periodInSeconds = periodInSeconds * 1000;

  var baselanguage = "en";
  var short = "_short";
  var basicParams = {
    round: true
  };
  if (years > 0) {
    return myHumanizer(periodInSeconds, { units: ["y", "mo"], language: baselanguage, ...basicParams });
  }
  if (months > 0) {
    return myHumanizer(periodInSeconds, { units: ["mo", "d"], language: baselanguage, ...basicParams });
  }

  if (weeks > 0) {
    return myHumanizer(periodInSeconds, { units: ["w", "d"], language: baselanguage, ...basicParams });
  }
  if (days > 0) {
    return myHumanizer(periodInSeconds, { units: ["d", "h"], language: baselanguage, ...basicParams });
  }

  if (hours > 0) {
    if (hours > 5) {
      return myHumanizer(periodInSeconds, { units: ["h"], language: baselanguage + short, ...basicParams });
    } else {
      return myHumanizer(periodInSeconds, { units: ["h", "m"], language: baselanguage + short, ...basicParams });
    }

  }

  if (minutes > 0) {
    if (minutes > 10) {
      return myHumanizer(periodInSeconds, { units: ["m"], language: baselanguage + short, ...basicParams });
    } else {
      return myHumanizer(periodInSeconds, { units: ["m", "s"], language: baselanguage + short, ...basicParams });
    }

  }

  return myHumanizer(periodInSeconds, { units: ["s"], language: baselanguage + short, ...basicParams });


  // console.log("years:" + years)
  // console.log("months:" + months)
  // console.log("days:" + days)
  // console.log("weeks:" + weeks)
  // console.log("hours:" + hours)
  // console.log("minutes:" + minutes)
  // console.log("seconds:" + seconds)
  // console.log("/////////////")
}

export function parseDate(date: string, format: string): Date {

  console.log("parseDate " + date);
  console.log("format " + format);
  if (format) {
    var moment1 = moment(date, format);
    console.log("moment1 " + moment1);
    return moment1.toDate();
  }else{
    var moment1 = moment(date);
    console.log("moment1 " + moment1);
    return moment1.toDate();
  }

}


export function differenceInSeconds(date1: Date, date2: Date ): string {
  // console.log("date1", date1);
  // console.log("date2", date2);
  var m1 = moment(date1);
  var m2= moment(date2);

  // console.log("m1", m1);
  // console.log("m2", m2);
  // return moment.duration(m1.diff(m2)).humanize();
  var periodInSeconds = moment.duration(m2.diff(m1)).asSeconds();

  console.log("periodInSeconds", periodInSeconds);

  // new LocalDateTime();

  // Duration.between(date2, LocalDateTime.now()).seconds()

  return formatPeriod(periodInSeconds);
  //
  //
  // return null;
}

export function formatDate(date: Date, format: string): string {
  if (date == null) {
    // throw Error("
    // ");
    return "";
  }
  return moment(date).format(format);
}

export function formatWithDefaultFormat(date: Date): string {
  if (date == null) {
    //throw Error("date cant be null");
    return "";
  }
  return moment(date).format("DD/MM/YY");
}

export function formatWithDefaultShortFormat(date: Date): string {
  if (date == null) {
    throw Error("date cant be null");
  }
  return moment(date).format("DDMMYY");
}

export function formatDateTimeWithDefaultMediumFormat(date: Date): string {
  if (date == null) {
    throw Error("date cant be null");
  }
  return moment(date).format("DD/MM/YY HH:MM");
}

export function formatDateForStorage(date: Date): string {
  if (date == null) {
    return null;
  }
  //console.log("Date date " + date);
  let s1 = moment(date).format();
  //console.log("Date formatted " + s1);
  return s1;
}

export function formatDateFromStorage(dateString: string): Date {
  //console.log("formatDateFromStorage " + dateString)
  if (dateString == null) {
    return null;
  }
  return new Date(dateString);
  // console.log("Date date " + dateString);
  // let s1 = moment()
  // console.log("Date formatted " + s1);
  // return s1;
}