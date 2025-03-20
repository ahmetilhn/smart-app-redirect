import { isAndroid, isIos } from "@ahmetilhn/handy-utils";
import Params from "../types/params.type";

class SmartAppRedirect {
  private appStoreLink: string;
  private playStoreLink: string;
  private defaultLink: string;
  constructor({ appStoreLink, playStoreLink, defaultLink }: Params) {
    this.appStoreLink = appStoreLink;
    this.playStoreLink = playStoreLink;
    this.defaultLink = defaultLink;
  }
  private getStoreLink = (): string => {
    if (isIos()) return this.appStoreLink;
    else if (isAndroid()) return this.playStoreLink;
    return this.defaultLink;
  };
  redirect = (): void => {
    window.location.replace(this.getStoreLink());
  };
}

export default SmartAppRedirect;
