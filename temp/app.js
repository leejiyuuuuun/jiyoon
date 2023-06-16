const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

let memos = [];

// 메모 추가
app.post('/api/memos', (req, res) => {
  const { title, content } = req.body;

  const memo = {
    id: memos.length + 1,
    title,
    content,
  };

  memos.push(memo);

  res.redirect('/');
});

// 메모 목록 조회
app.get('/api/memos', (req, res) => {
  res.json(memos);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/app.js', (req, res) => {
  res.set('Content-Type', 'text/javascript');
  res.sendFile(path.join(__dirname, 'public', 'app.js'));
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
