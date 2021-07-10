export interface IMeetingMutable {
  openToReviews: boolean;
  openToSubmissions: boolean;
}

export interface IMeeting extends IMeetingMutable {
  id: string;
  name: string;
  date: string;
  location: string;
}

class Meeting implements IMeeting {
  get id(): string {
    return this.data.id;
  }
  get name(): string {
    return this.data.name;
  }
  get date(): string {
    return this.data.date;
  }
  get location(): string {
    return this.data.location;
  }
  get openToReviews(): boolean {
    return this.data.openToReviews;
  }
  get openToSubmissions(): boolean {
    return this.data.openToSubmissions;
  }
  set openToSubmissions(t: boolean) {}
  set openToReviews(t: boolean) {}

  constructor(private data: IMeeting) {}

  public formatDate(): string {
    return new Date(this.date).toLocaleDateString("en", {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  }

  public toggleSubmissions() {
    this.openToSubmissions = !this.openToSubmissions;
  }

  public toggleReviews() {
    this.openToReviews = !this.openToReviews;
  }
}

export default Meeting;
