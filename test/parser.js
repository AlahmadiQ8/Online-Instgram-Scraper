const data = require('./mock_data/sample.json');
const parseItem = require('../lib/parser').parseItem;
const parseItems = require('../lib/parser').parseItems;

it('parseItem returns expected json object given an item', () => {
  const test = parseItem(data.items[0]);
  test.should.have.property('link');
  test.should.have.property('type');
  test.should.have.property('video_views');
  test.should.have.property('created_time');
  test.should.have.property('likes_count');
  test.should.have.property('videos');
  test.should.have.property('images');
  test.should.have.property('comments_count');
});

it('parseItems returns array', () => {
  const test = parseItems(data.items);
  test.should.have.length(data.items.length);
});




