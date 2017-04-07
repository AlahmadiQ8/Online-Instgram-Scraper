import sampleResponse from './sample_response.json';
import sampleExpected from './sample_parsed_response.json';
import { parseItem, parseItems } from '../lib/parser';

it('parseItem returns expected json object given an item', () => {
  const test = parseItem(sampleResponse.items[0]);
  test.should.be.deep.equal(sampleExpected[0]);
});

it('parseItems returns array', () => {
  const test = parseItems(sampleResponse.items);
  test.should.have.length(sampleResponse.items.length);
  JSON.stringify(test).should.be.eq(JSON.stringify(sampleExpected));
});
