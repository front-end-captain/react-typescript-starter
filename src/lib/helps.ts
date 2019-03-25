const sleep = function sleep(time: number = 1000): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

export { sleep };
