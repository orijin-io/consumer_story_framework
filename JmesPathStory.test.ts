import "reflect-metadata";
import * as assert from "assert";
import { evaluateWithJMESPathAsync } from "./jsonProcessingUtils";

var json = require("./mocktrace.json");
// @ts-ignore
describe("jmespath for story", function() {


  // @ts-ignore
  it("test", async () => {


    assert.equal(await evaluateWithJMESPathAsync("_trace._originProperties2._prodFacility._location._coordinates._latLong.lat", json), 1);
    assert.equal(await evaluateWithJMESPathAsync("_trace._originProperties2._prodFacility._location._name", json), "finca Camilla Martínez");
    assert.equal(await evaluateWithJMESPathAsync("_trace._originProperties2._collectionDate", json), "2019-05-13T05:00:00.000Z");
    assert.equal(await evaluateWithJMESPathAsync("_trace._traceProdLots2[?_state._currentState=='COLLECTED']._processingProperties._beforeWeight", json), 80);
    assert.equal(await evaluateWithJMESPathAsync
    ("_trace._traceProdLots2[?_state._currentState=='COLLECTED']._finishedDate", json), '2019-05-15T05:00:00.000Z');

    assert.equal(await evaluateWithJMESPathAsync
    ("calculatePeriod(_trace._traceProdLots2[?_state._currentState=='COLLECTED']._startDate,_trace._traceProdLots2[?_state._currentState=='COLLECTED']._finishedDate)", json),
      "1 day");

    assert.equal(await evaluateWithJMESPathAsync("date(_trace._originProperties2._collectionDate, 'DDMMYYYY')", json), "13052019");

    assert.equal(await evaluateWithJMESPathAsync("formatWeight(_trace._traceProdLots2[?_state._currentState=='COLLECTED']._processingProperties._beforeWeight, 'Kg')"
      , json), "80 Kg");

    assert.equal(await evaluateWithJMESPathAsync("formatWeight(_trace._traceProdLots2[?_state._currentState=='FERMENTED']._processingProperties._beforeWeight, 'C')"
      , json), "80 C");

    assert.equal(await evaluateWithJMESPathAsync("[_trace._originProperties2._prodFacility._location._name, 'something']| join('+', @)", json),
      "finca Camilla Martínez+something");

  });




});
