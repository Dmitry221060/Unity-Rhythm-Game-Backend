export function formatTimestamp(date: Date = new Date()): string {
  return `[${
    padToTwoNum(date.getDate())
  }.${
    padToTwoNum(date.getMonth() + 1)
  }.${
    date.getFullYear()
  } ${
    padToTwoNum(date.getHours())
  }:${
    padToTwoNum(date.getMinutes())
  }:${
    padToTwoNum(date.getSeconds())
  }]`;
}

export function padToTwoNum(str: number): string {
  const length = 2;
  return `0${str}`.slice(-length);
}
