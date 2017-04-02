const _ = require('lodash');

const parseItem = item => ({
  link: item.link,
  type: item.type,
  video_views: !_.isNil(item.video_views) ? item.video_views : undefined,
  created_time: item.created_time,
  likes_count: item.likes.count,
  caption_text: !_.isNil(item.caption) ? item.caption.text : undefined,
  videos: !_.isNil(item.videos) ? item.videos : undefined,
  images: item.images,
  comments_count: item.comments.count,
});

const parseItems = items => items.map(item => parseItem(item));

exports.parseItem = parseItem;
exports.parseItems = parseItems;
