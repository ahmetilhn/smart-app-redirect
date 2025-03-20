import { isAndroid, isIos } from "@ahmetilhn/handy-utils";
import Params from "../types/params.type";

class SmartAppRedirect {
  private appStoreLink: string;
  private playStoreLink: string;
  constructor({ appStoreLink, playStoreLink }: Params) {
    this.appStoreLink = appStoreLink;
    this.playStoreLink = playStoreLink;
  }
  private getStoreLink = (): string => {
    if (isIos()) return this.appStoreLink;
    else if (isAndroid()) return this.playStoreLink;
    throw new Error("No matching store link found!");
  };
  redirect = (): void => {
    window.location.replace(this.getStoreLink());
  };
}

export default SmartAppRedirect;
