const loginDiv = document.getElementById('login');
const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas.getContext('2d');
let peer;
let connections = [];
let isHost = false;
let username, roomID;

document.getElementById('hostBtn').addEventListener('click', () => {
  username = document.getElementById('username').value;
  roomID = document.getElementById('roomID').value;
  if (username && roomID) {
    isHost = true;
    peer = new Peer(roomID);
    setupPeer();
    startGame();
  }
});

document.getElementById('joinBtn').addEventListener('click', () => {
  username = document.getElementById('username').value;
  roomID = document.getElementById('roomID').value;
  if (username && roomID) {
    peer = new Peer();
    peer.on('open', () => {
      const conn = peer.connect(roomID);
      conn.on('open', () => {
        conn.send({ type: 'join', username });
      });
      conn.on('data', handleData);
    });
  }
});

function setupPeer() {
  peer.on('connection', (conn) => {
    connections.push(conn);
    conn.on('data', handleData);
  });
}

function handleData(data) {
  if (data.type === 'join') {
    console.log(`${data.username}が参加しました`);
  }
}

function startGame() {
  loginDiv.style.display = 'none';
  gameCanvas.style.display = 'block';
  // ゲームの初期化とループ処理をここに追加
}
