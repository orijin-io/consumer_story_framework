import { differenceInSeconds, formatDate, formatPeriod,timeDiffferenceToPast } from "./dateFormatterUtils";
const myjmespath_withfunctions = require("./myjmespath_withfunctions");
import { headingDistanceTo } from "geolocation-utils";
import {getCurrentLocation} from "./nativeLocationController";
// 0: 'number',
//   1: 'any',
//   2: 'string',
//   3: 'array',
//   4: 'object',
//   5: 'boolean',
//   6: 'expression',
//   7: 'null',
//   8: 'Array<number>',
//   9: 'Array<string>'



var date = {
  _func: async function(resolvedArgs) {
    var toFormat = resolvedArgs[0];
    var format = resolvedArgs[1];
    let date = formatDate(toFormat, format);
    return new Promise(resolve => {
      resolve(date);
    });
  },
  _signature: [
    {
      types: [1]
    },
    {
      types: [2]
    }
  ]
};
var formatWeight = {
  _func: async function(resolvedArgs) {
    var toFormat = resolvedArgs[0];
    var format = resolvedArgs[1];
    let result = toFormat + ' ' + format;
    return new Promise(resolve => {
      resolve(result);
    });
  },
  _signature: [
    {
      types: [1]
    },
    {
      types: [2]
    }
  ]
};
var formatPercentage = {
  _func: async function(resolvedArgs) {
    var toFormat = resolvedArgs[0];
    let result = toFormat + '%';
    return new Promise(resolve => {
      resolve(result);
    });
  },
  _signature: [
    {
      types: [1]
    }
  ]
};

var calculatePeriod = {
  _func: async function(resolvedArgs) {
    var first = resolvedArgs[0];
    var second = resolvedArgs[1];


    // var result = formatPeriod(differenceInSeconds(first, second));
    var result = differenceInSeconds( first[0],second[0]);
    return new Promise(resolve => {
      resolve(result);
    });
  },
  _signature: [
    {
      types: [1]
    },
    {
      types: [1]
    }
  ]
};

var calculateTimeDiffferenceToPast = {
  _func: async function(resolvedArgs) {
    var first = resolvedArgs[0];

    if (Array.isArray(first)) {
      var result = timeDiffferenceToPast(first[0]);
    } else {
      var result = timeDiffferenceToPast(first);
    }

    return new Promise(resolve => {
      resolve(result);
    });
  },
  _signature: [
    {
      types: [1]
    }
  ]
};
var calculateDistanceBetweenPoints = {
  _func: async function(resolvedArgs) {
    var first = resolvedArgs[0];
    console.log("first :currentLocation", first);

    var firstElement = first;
    if (Array.isArray(first)) {
      firstElement = first[0];
    }

    var current = await getCurrentLocation();

    if(!current){
      return new Promise(resolve => {
        resolve("");
      });
    }else {
      var from1 = {lat: current.latitude, lon: current.longitude};
      var to = {lat: firstElement._lat, lon: firstElement._lon};

      console.log("calculateDistanceBetweenPoints :currentLocation", from1);
      console.log("calculateDistanceBetweenPoints", to);
      var result = headingDistanceTo(from1, to);

      var distance = result.distance;
      var inKms = distance / 1000;
      var r = parseFloat(inKms.toFixed(0));

      if (r > 1000) {
        r = Math.round(r / 1000) * 1000;
      } else if (r > 100) {
        r = Math.round(r / 100) * 100;
      }

      return new Promise(resolve => {
        resolve(r + "km from you");
      });
    }
  },
  _signature: [
    {
      types: [1]
    }
  ]
};



export async function evaluateWithJMESPathAsync(exp: string, object: any): Promise<any> {
  try {
    console.log("evaluateWithJMESPath " + exp, object);
    var res = await myjmespath_withfunctions.search(object, exp, {
      functionTable: {
        formatWeight: formatWeight,
        formatTemperature: formatWeight,
        formatPercentage: formatPercentage,
        calculatePeriod: calculatePeriod,
        calculateTimeDiffferenceToPast: calculateTimeDiffferenceToPast,
        calculateDistanceBetweenPoints: calculateDistanceBetweenPoints,
        date: date
      }
    });
    return res;
  } catch (e) {
    console.log(e);
    console.log("evaluateWithJMESPath error" + exp, object);
    throw Error(e);
  }
}
