export class Goal {
  constructor(title, status, desc, date = new Date()) {
    this.title = title;
    this.status = status;
    this.desc = desc;
    this.id = this.generateId(desc.trim().substring(1, 5));
    this.createdAt = date;
    this.lastUpdate;
    this.completedAt;
    if (status !== "In Progress") {
      this.completedAt = new Date;
    }
  }

  enableDates = () => {
    if (this.createdAt !== undefined &&
      this.createdAt instanceof Date === false) {
      this.createdAt = new Date()
    }
    if (this.completedAt !== undefined &&
      this.completedAt instanceof Date === false) {
      this.completedAt = new Date(this.completedAt)
    }
  }

  read = () => {
    this.enableDates();
    let completed = this.completedAt || "none";
    let updated = this.lastUpdate || "none";
    let diff = "not available";
    console.log(this.createdAt)
    console.log(this.completedAt)
    if (completed !== "none") {
      diff = this.getDiff();
    }
    console.log(`Title: ${this.title}
  Status: ${this.status}
  Description: ${this.desc}
  Created ${this.createdAt}
  Completed ${completed}
  Last Updated ${updated}
  Time to Complete ${diff}
  `);
  };

  getDiff = () => {
    const diff = (this.completedAt - this.createdAt)/1000;
    console.log(`Seconds: ${diff}`)
    let days = Math.floor(diff / 86400);
    let hours = Math.floor((diff % 86400) / 3600);
    let minutes = Math.floor(((diff % 86400) % 3600) / 60);
    let seconds = parseInt(((diff % 86400) % 3600) % 60);
    return `${days} ${days === 1 ? "day":"days"} ${hours} ${hours === 1 ? "hour":"hours"} ${minutes} ${minutes === 1 ? "minute":"minutes"} ${seconds} ${seconds === 1 ? "second":"seconds"}`;
  }

  generateId = (salt) => {
    return salt + '-' + Math.floor(Math.random() * 10000) + '-' + Date.now();
  }
}