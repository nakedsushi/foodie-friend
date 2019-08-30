const fs = require('fs');

const nonTags = ['lunch', 'breakfast', 'dinner', 'low', 'medium', 'high'];
const response = JSON.parse(fs.readFileSync('tags.json'));

const tags = [];
response.Items.forEach((item) => {
  item.tags.L.forEach((tag) => {
    tags.push(tag.S);
  });
});

const uniqTags = Array.from(new Set(tags));

console.log(uniqTags.filter(tag => nonTags.indexOf(tag) < 0 ).sort());
