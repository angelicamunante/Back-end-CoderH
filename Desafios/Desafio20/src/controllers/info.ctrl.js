const minimist = require("minimist");
const { logger } = require("../config/log");
const os = require("os");
let options = { alias: { p: "puerto" } };
let args = minimist(process.argv.slice(2), options);

const getInfo = (req, res) => {
  logger.info(`Método GET: ruta "/info"`);
  const mRAM = process.memoryUsage();
  const CPU_CORES = os.cpus().length;
  const info = {
    port: ` ${args.p}`,
    platform: ` ${process.platform}`,
    pid: ` ${process.pid}`,
    directory: ` ${process.cwd()}`,
    node: ` ${process.version}`,
    nameProcess: ` ${process.title}`,
    cpus: `${CPU_CORES}`,
    memory: ` rss:${mRAM.rss} heapTotal: ${mRAM.heapTotal} heapUsed:${mRAM.heapUsed} external: ${mRAM.external} arrayBuffer: ${mRAM.arrayBuffers}`,
  };

  // console.log(info);
  res.render("info", { info });
};

const getRandom = (req, res) => {
  logger.info(`Método GET: ruta "/api/random"`);
  res.send(`Ruta random PID: ${process.pid}`);
};

const errorPage = (req, res) => {
  const { url } = req;
  logger.warn(`Ruta ${url} no existe.`);
  return res.send("Ruta no existe");
};
module.exports = { getInfo, getRandom, errorPage };