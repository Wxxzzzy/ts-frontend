import * as moment from "moment";

export abstract class DateTime {
  public static get Now(): moment.Moment {
    return moment();
  }

  public static get Today(): moment.Moment {
    return this.Now.startOf('date');
  }

  public static moment(date?: Date): moment.Moment {
    return moment(date);
  }
}
