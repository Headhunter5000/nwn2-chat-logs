export class Timer {
  name: string;
  startTime: number = 0;

  constructor(name: string) {
    this.name = name;
    return this;
  }

  start() {
    const time = Date.now();
    this.startTime = time;
    return this;
  }

  stop() {
    const stopTime = Date.now();
    return (
      this.name + ' took ' +
      (stopTime - this.startTime) +
      ' ms'
    );
  }
}