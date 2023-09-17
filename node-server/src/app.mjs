import express from "express";
import logger from "morgan";
import path from "path";
import { promises as fs } from 'fs';
import http from "http";

const app = express()

export default app
app.use(logger("tiny"))

app.get("/", (req, res) => {
    res.sendFile(path.join('app.mjs'));
});

let results = new Map();

async function readFile(filePath, newMap) {
    const data = await fs.readFile(filePath, 'utf-8');
    let str = data.replace(/\r\n/g, '');
    let arr = str.trim().split(",");
    for (let i = 0; i < arr.length; i++) {
        newMap.set(arr[i].trim(), arr[i + 1].trim())
        i++;
    }
    console.log(newMap);

}
readFile('data.txt', results);
let setTime = setTimeout(() => console.log('res', results), 1000);
export { results };
