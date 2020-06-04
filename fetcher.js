const request = require('request');
const fs = require('fs');

const args = process.argv.splice(2);
const url = args[0];
const localPath = args[1];

const done = function (error, response, body) {
  if (error) {
    console.log("URL resulted in a non-200 result. Bad URL.")
    throw error
  }
  fs.writeFile(localPath, body, function (err) {
    let stats = fs.statSync('./index.html')
    let fileSizeInBytes = stats["size"]
    if (err) throw err
    console.log(`Downloaded and saved ${fileSizeInBytes} bytes to ${localPath}`);
  });
}
request(url, (error, response, body) => {
  done(error, response, body);
});

