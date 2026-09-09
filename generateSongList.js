const fs = require("fs");
const path = require("path");

const musicFolder = path.join(__dirname, "All Music");
const outputFile = path.join(__dirname, "songlist.js");

function getSongs(directory) {
    let songs = [];

    const files = fs.readdirSync(directory, { withFileTypes: true });

    for (const file of files) {
        const fullPath = path.join(directory, file.name);

        if (file.isDirectory()) {
            songs = songs.concat(getSongs(fullPath));
        } else if (path.extname(file.name).toLowerCase() === ".mp3") {
            const relativePath = path.relative(__dirname, fullPath);

            songs.push(relativePath.replace(/\\/g, "/"));
        }
    }

    return songs;
}

const songlist = getSongs(musicFolder);

const output = `const songlist = ${JSON.stringify(songlist, null, 2)};\n`;

fs.writeFileSync(outputFile, output);

console.log(`Found ${songlist.length} songs.`);
console.log(`Created ${outputFile}`);