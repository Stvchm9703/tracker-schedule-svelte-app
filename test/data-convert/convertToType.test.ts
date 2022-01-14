// import { Options } from '../src/Classes/Options/Options'; // this will be your custom import
import { expect } from 'chai';
import { convertToType } from '../../src/libs/data-convert';

// sample interface 
import type { ITaskNode } from '../../src/libs/calender-utils';

// other dpp 
import { DateTime } from 'luxon';

describe('convert-to-type function ', () => { // the tests container
  it('convert json object, without array field', () => { // the single test
    /**
    const options = new Options(); // this will be your class

    // detect retina 
    expect(options.detectRetina).to.be.false; // Do I need to explain anything? It's like writing in English!

    // fps limit 
    expect(options.fpsLimit).to.equal(30); // As I said 3 lines above

    expect(options.interactivity.modes.emitters).to.be.empty; // emitters property is an array and for this test must be empty, this syntax works with strings too
    expect(options.particles.color).to.be.an("object").to.have.property("value").to.equal("#fff"); // this is a little more complex, but still really clear
  
      */

    ///ITaskNode
    const sample_json = `
  {
    "id" : "0000-00-0009",
    "project-id" : "000-1234-1234",
    "title" : "test" ,
    "start-time" : "2022-01-13T01:44:52",
    "end-time" : "2022-01-03T01:45:34"
  }
  `;

    const sample_data: ITaskNode = {
      Id: "0000-00-0009",
      ProjectId: "000-1234-1234",
      Title: "test",
      StartTime: DateTime.fromObject({
        year: 2022,
        month: 1,
        day: 13,
        hour: 1,
        minute: 44,
        second: 52
      }),

      EndTime: DateTime.fromObject({
        year: 2022,
        month: 1,
        day: 13,
        hour: 1,
        minute: 45,
        second: 34,
      }),
    }


    const testAS = convertToType<ITaskNode>(JSON.parse(sample_json));
    console.log(testAS);
    // const sample_json  = 
  });
});