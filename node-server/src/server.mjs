import app  from "./app.mjs";
import chalk from 'chalk';

const port = 4000

app.listen(port, () =>
  console.log(`The server is listning on port ${chalk.green(port)}`)
)