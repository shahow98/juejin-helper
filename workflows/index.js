const utils = require("./utils/utils");
const {CheckIn} = require('./checkin');
const {Seagold} = require('./seagold');


exports.handler = async (event, context) => {
  const env = buildEnv(context);
  await runCheckIn(env);
  await runSeagold(env);
  return 'successful!';
}

function buildEnv(context) {
  let env = {
    COOKIE: '',
    COOKIE_2: '',
    COOKIE_3: '',
    COOKIE_4: '',
    COOKIE_5: ''
  };

  Object.keys(env).forEach((cookie) => env[cookie] = context.getUserData(cookie));
  return env;
}

async function runCheckIn(env) {
  const cookies = utils.getUsersCookie(env);
  for (let cookie of cookies) {
    const checkin = new CheckIn(cookie);

    await utils.wait(utils.randomRangeNumber(1000, 5000)); // 初始等待1-5s
    await checkin.run(); // 执行

    const content = checkin.toString();
    console.log(content); // 打印结果
  }
}

async function runSeagold(env) {
  const cookies = utils.getUsersCookie(env);
  for (let cookie of cookies) {
    const seaGold = new Seagold(cookie);

    await utils.wait(utils.randomRangeNumber(1000, 5000)); // 初始等待1-5s
    await seaGold.run();

    const content = seaGold.toString();
    console.log(content);
  }
}

