// server.js

const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.use(express.json());
app.use(express.static('.'));

const TOKEN = '8755645463:AAGfbGDb6XFcB70D7od6iP51eiLHEYlmt-w';
const CHAT_ID = '1003986721009';

app.post('/order', async (req,res)=>{

try{

const d = req.body;

const text =
'🛒 ĐƠN MỚI\n' +
'👤 ' + d.name + '\n' +
'📦 ' + d.service + '\n' +
'🔢 ' + d.qty + '\n' +
'🔗 ' + d.link;

const result = await fetch(
'https://api.telegram.org/bot' + TOKEN + '/sendMessage',
{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
chat_id: CHAT_ID,
text: text
})
}
);

const data = await result.json();

console.log(data);

if(data.ok){
res.json({message:'Đặt hàng thành công - đã gửi Telegram'});
}else{
res.json({message:'Lỗi Telegram: ' + data.description});
}

}catch(err){

res.json({message:'Lỗi server'});

}

});

app.listen(process.env.PORT || 3000);