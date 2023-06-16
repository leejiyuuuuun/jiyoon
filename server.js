const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const WebSocket = require('ws');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

  res.json(memo);
});

// 메모 수정
app.put('/api/memos/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const memoIndex = memos.findIndex((memo) => memo.id == id);

  if (memoIndex !== -1) {
    const updatedMemo = { ...memos[memoIndex], title, content };
    memos[memoIndex] = updatedMemo;
    res.json(updatedMemo); // 수정된 메모 데이터를 클라이언트로 응답
    wss.clients.forEach((client) => {
      client.send(JSON.stringify({ type: 'memoUpdated', memo: updatedMemo }));
    });
    console.log('메모가 수정되었습니다.');
  } else {
    res.status(404).json({ error: '메모를 찾을 수 없습니다.' });
  }
});



// 메모 삭제
app.delete('/api/memos/:id', (req, res) => {
  const { id } = req.params;

  const memoIndex = memos.findIndex((memo) => memo.id == id);

  if (memoIndex !== -1) {
    memos.splice(memoIndex, 1);
    res.json({ message: '메모가 삭제되었습니다.' });
  } else {
    res.status(404).json({ error: '메모를 찾을 수 없습니다.' });
  }
});

// 메모 목록 조회
app.get('/api/memos', (req, res) => {
  res.json(memos);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/app.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, 'public', 'app.js'));
});

const server = app.listen(3001, () => {
  console.log('Server started on port 3001');
});

// 메모 조회
app.get('/api/memos/:id', (req, res) => {
  const { id } = req.params;

  const memo = memos.find((memo) => memo.id == id);

  if (memo) {
    res.json(memo);
  } else {
    res.status(404).json({ error: '메모를 찾을 수 없습니다.' });
  }
});


// 웹 소켓 연결
const wss = new WebSocket.Server({ server });

// 웹 소켓 이벤트 처리
wss.on('connection', (socket) => {
  console.log('A client connected');

  // 메모 추가 이벤트
  socket.on('message', (message) => {
    const { type, memo } = JSON.parse(message);
    if (type === 'addMemo') {
      memos.push(memo);
      wss.clients.forEach((client) => {
        if (client !== socket) {
          client.send(JSON.stringify({ type: 'memoAdded', memo }));
        }
      });
      console.log('메모가 추가되었습니다.');
    } else if (type === 'updateMemo') {
      const index = memos.findIndex((m) => m.id === memo.id);
      if (index !== -1) {
        memos[index] = memo;
        wss.clients.forEach((client) => {
          if (client !== socket) {
            client.send(JSON.stringify({ type: 'memoUpdated', memo }));
          }
        });
        console.log('메모가 수정되었습니다.');
      }
    } else if (type === 'deleteMemo') {
      const index = memos.findIndex((m) => m.id === memo.id);
      if (index !== -1) {
        const deletedMemo = memos.splice(index, 1)[0];
        wss.clients.forEach((client) => {
          if (client !== socket) {
            client.send(JSON.stringify({ type: 'memoDeleted', memoId: deletedMemo.id }));
          }
        });
        console.log('메모가 삭제되었습니다.');
      }
    }
  });

  // 연결 해제 이벤트
  socket.on('close', () => {
    console.log('A client disconnected');
  });
});
