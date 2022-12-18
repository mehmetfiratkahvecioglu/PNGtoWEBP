const { exec } = require("child_process");
const fs = require("fs");

const directory = ".";

// Check if the webp directory exists
if (!fs.existsSync("webp")) {
  console.error("Error: webp directory not found");
  return;
}

// Get a list of all the PNG files in the directory
exec(`find ${directory} -name "*.png"`, (err, stdout) => {
  if (err) {
    console.error(err);
    return;
  }

  // Split the list of files by newline
  const files = stdout.split("\n");

  // Iterate over the list of files
  files.forEach((file) => {
    // Skip the file if it's an empty string (happens when the list ends with a newline)
    if (!file) return;

    // Construct the output file path by replacing the .png extension with .webp
    const outputFile = `webp/${file.replace(/\.png$/, ".webp")}`;

    // Execute the cwebp command for the current file
    exec(`cwebp -q 80 ${file} -o ${outputFile}`, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Successfully converted ${file} to ${outputFile}`);
      }
    });
  });
});
