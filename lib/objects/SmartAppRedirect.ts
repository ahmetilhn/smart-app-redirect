import { isAndroid, isClient, isIos } from "@ahmetilhn/handy-utils";
import Params from "../types/params.type";

class SmartAppRedirect {
  private appStoreLink: Params["appStoreLink"];
  private playStoreLink: Params["playStoreLink"];
  private defaultLink: Params["defaultLink"];
  private redirectFunction: Params["redirectFunction"];
  private userAgent: Params["userAgent"];

  constructor({
    appStoreLink,
    playStoreLink,
    defaultLink,
    userAgent,
    redirectFunction,
  }: Params) {
    this.appStoreLink = appStoreLink;
    this.playStoreLink = playStoreLink;
    this.defaultLink = defaultLink;
    if (!!userAgent && !!redirectFunction) {
      this.userAgent = userAgent;
      this.redirectFunction = redirectFunction;
    }
  }

  private getStoreLink = (): string => {
    if (isIos(this.userAgent)) return this.appStoreLink;
    else if (isAndroid(this.userAgent)) return this.playStoreLink;
    return this.defaultLink;
  };

  redirect = (): void => {
    const targetUrl = this.getStoreLink();
    if (!!this.redirectFunction) {
      this.redirectFunction(targetUrl);
      return;
    }
    if (!isClient())
      throw new Error(
        "Redirect method only supported on browser, If you use smart app redirect on server please give the redirectFunction param."
      );
    window.location.replace(targetUrl);
  };
}

export default SmartAppRedirect;
