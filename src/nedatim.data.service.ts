import { Injectable } from '@nestjs/common';
import NedarimData from "./nedarimData";

@Injectable()
export class  NedatimDataService {
  public data
  getNedarimData() {
    return this.data
  }
  setNedarimData(data: NedarimData) {
    this.data = data
  }
}
