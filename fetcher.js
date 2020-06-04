const request = require('request');
const fs = require('fs');
const args = process.argv.slice(2);
console.log(args);
const url = args[0];
const filePath = args[1];

fs.access(filePath, fs.F_OK, (err) => {
  if (err) {
    console.error(err)
    return;
  }
  request(url,(error, response, body) => {
    if (error !== null) {
      console.log('error:', error);
      return;
    }  if (response.statusCode !== 200) {
      console.log('statusCode:', response && response.statusCode);
      return;
    }
    fs.writeFile(filePath, body, (err) => {
      if (err) { 
        console.log(err)
      }
      console.log(`Downloaded and saved ${body.length} bytes to ${filePath}`);
    });
  });
})