const autocannon = require("autocannon");
const { PassThrough } = require("stream");

function run(url) {
  const buf = [];
  const outputStream = new PassThrough();

  const inst = autocannon({
    url,
    connections: 100,
    duration: 20,
  });

  autocannon.track(inst, { outputStream });

  outputStream.on("data", (data) => buf.push(data));
  inst.on("done", () => {
    process.stdout.write(Buffer.concat(buf));
  });
}

console.log("Running all benchmarks in parallel ...");

run("http://localhost:5001/info");
/*
  modo consola
  autocannon -d 20 -c 500 "http://localhost:8080/auth-bloq?username=marian&password=qwerty123"
*/