const fs = require('fs');
const request = require('request');

const url = process.argv[2];
const filePath = process.argv[3];

if (!url || !filePath) {
  console.error('Please provide a valid URL and file path.');
  process.exit(1);
}

// Make an HTTP request
request(url, (error, response, body) => {
  if (error || response.statusCode !== 200) {
    console.error('Error downloading the resource:', error || `Status Code: ${response.statusCode}`);
    process.exit(1);
  }

  // Write the response body to a local file
  fs.writeFile(filePath, body, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      process.exit(1);
    }

    // Get the file size
    const fileSize = Buffer.from(body).length;

    console.log(`Downloaded and saved ${fileSize} bytes to ./${filePath}`);
  });
});
// Example for checking if the file already exists
if (fs.existsSync(filePath)) {
  // Handle the case where the file already exists (optional)
  console.log('File already exists. Do you want to overwrite it? (Y/N)');

  // Use the readline module to get user input and decide whether to overwrite or exit
  // (You'll need to implement this part using the readline module)
}
