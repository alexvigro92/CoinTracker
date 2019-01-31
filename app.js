var express = require('express');
var app = express();
const path = require('path');
var http = require("https");
const urlToPost ="https://hooks.slack.com/services/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";
const optionsToPost = {
  "method": "POST",
  "hostname": "hooks.slack.com",
  "port": null,
  "path": "/services/T54BKMBUM/B8MCP98DT/hhBRJcPmg9mPLELphU885pwV",
  "headers": {
    "content-type": "application/json",
  }
};

var optionsToGetConf = {
"method": "GET",
"hostname": "api.bitso.com",
"port": null,
"path": "/v3/trades/?book=ltc_mxn&limit=1",
"json":true,
"headers": {
  "cache-control": "no-cache",
  "postman-token": "eb98f581-c057-73e7-6544-8596dabc5088"
}
};

var jsonToSend = {
  bitcoin:{
    price: 0,
    maker_side: "not defined"
  },
  bitcash:{
    price: 0,
    maker_side: "not defined"
  },
  ethereum:{
    price: 0,
    maker_side: "not defined"
  },
  ripple:{
    price: 0,
    maker_side: "not defined"
  },
  litecoin:{
    price: 0,
    maker_side: "not defined"
  }
}




function getInfoToSend(optionsToGet,coin){
optionsToGetConf.path = optionsToGet;
var req = http.request(optionsToGetConf, function (res) {
  var chunks = [];
  res.on("data", function (chunk) {
    chunks.push(chunk);
  });
  res.on("end", function () {
    var body = Buffer.concat(chunks);
    var time = 0;
    body = JSON.parse(body.toString());
    switch (coin) {
      case "bitcoin":
      if(body.payload !== undefined){
        jsonToSend.bitcoin.price = body.payload[0].price;
        jsonToSend.bitcoin.maker_side = body.payload[0].maker_side;
      }
        getInfoToSend("/v3/trades/?book=bch_btc&limit=1","bitcash");
        break;
      case "bitcash":
      if(body.payload !== undefined){
        jsonToSend.bitcash.price = body.payload[0].price;
        jsonToSend.bitcash.maker_side = body.payload[0].maker_side;
      }
        getInfoToSend("/v3/trades/?book=eth_mxn&limit=1","ethereum");
        break;
      case "ethereum":
      if(body.payload !== undefined){
        jsonToSend.ethereum.price = body.payload[0].price;
        jsonToSend.ethereum.maker_side = body.payload[0].maker_side;
      }
        getInfoToSend("/v3/trades/?book=xrp_mxn&limit=1","ripple");
        break;
      case "ripple":
      if(body.payload !== undefined){
        jsonToSend.ripple.price = body.payload[0].price;
        jsonToSend.ripple.maker_side = body.payload[0].maker_side;
      }
        getInfoToSend("/v3/trades/?book=ltc_mxn&limit=1","litecoin");
        break;
      case "litecoin":
      if(body.payload !== undefined){
        jsonToSend.litecoin.price = body.payload[0].price;
        jsonToSend.litecoin.maker_side = body.payload[0].maker_side;
        time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
      }
        var stringToSend = (
          "Bitcoin price: $" + jsonToSend.bitcoin.price + " Recommended Action: " + jsonToSend.bitcoin.maker_side + "\n" +
          "Bitcash price: $" + (Number(jsonToSend.bitcash.price)*Number(jsonToSend.bitcoin.price)) + " Recommended Action: " + jsonToSend.bitcash.maker_side + "\n" +
          "Ethereum price: $" + jsonToSend.ethereum.price + " Recommended Action: " + jsonToSend.ethereum.maker_side + "\n" +
          "Ripple price: $" + jsonToSend.ripple.price + " Recommended Action: " + jsonToSend.ripple.maker_side + "\n" +
          "Litecoin price: $" + jsonToSend.litecoin.price + " Recommended Action: " + jsonToSend.litecoin.maker_side + "\n" +
          "Created at = " + time + "\n" +
          "---------------------------------------------------------FIN DEL COMUNICADO---------------------------------------------------------"
        );
        postToSlack(stringToSend);
        break;
      default:
      break;
    }
  });
});
req.end();
}

function postToSlack(stringToSend){
  var req = http.request(optionsToPost, function (res) {
    var chunks = [];
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
    res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });
  req.write(JSON.stringify({ text: stringToSend }));
  req.end();
}

setInterval(getInfoToSend,1800000,"/v3/trades/?book=btc_mxn&limit=1","bitcoin");

// Serve static assets
app.use(express.static(path.resolve(__dirname, 'build')));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname,'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
