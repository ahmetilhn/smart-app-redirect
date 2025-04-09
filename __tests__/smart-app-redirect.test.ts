import SmartAppRedirect from "../lib/objects/SmartAppRedirect";
const APP_STORE_LINK =
  "https://apps.apple.com/tr/app/gramvey-alt%C4%B1n-portf%C3%B6y/id6741361369";
const PLAY_STORE_LINK =
  "https://play.google.com/store/apps/details?id=com.gramveyapplication";

describe("SmartAppRedirect tests", () => {
  beforeEach(() => {
    // @ts-ignore
    jest.spyOn(window, "location", "get").mockReturnValue({
      replace: jest.fn(),
    });
  });

  test("it should redirect to app store", () => {
    const smartAppRedirect = new SmartAppRedirect({
      appStoreLink: APP_STORE_LINK,
      playStoreLink: PLAY_STORE_LINK,
      defaultLink: PLAY_STORE_LINK,
    });
    Object.defineProperty(global.navigator, "userAgent", {
      value:
        "Mozilla/5.0 (Linux; Android <version>; <device_model> Build/<build_version>) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/<chrome_version> Mobile Safari/537.36",
      configurable: true,
    });
    smartAppRedirect.redirect();
    expect(window.location.replace).toHaveBeenCalledWith(PLAY_STORE_LINK);
  });

  test("it should redirect to play store", () => {
    const smartAppRedirect = new SmartAppRedirect({
      appStoreLink: APP_STORE_LINK,
      playStoreLink: PLAY_STORE_LINK,
      defaultLink: PLAY_STORE_LINK,
    });
    Object.defineProperty(global.navigator, "userAgent", {
      value:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/537.36",
      configurable: true,
    });
    smartAppRedirect.redirect();
    expect(window.location.replace).toHaveBeenCalledWith(APP_STORE_LINK);
  });
  test("it should redirect to app store with use redirectFunction param", () => {
    const redirectFunction = jest.fn();
    const smartAppRedirect = new SmartAppRedirect({
      appStoreLink: APP_STORE_LINK,
      playStoreLink: PLAY_STORE_LINK,
      defaultLink: PLAY_STORE_LINK,
      redirectFunction,
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/537.36",
    });
    smartAppRedirect.redirect();
    expect(redirectFunction).toHaveBeenCalledWith(APP_STORE_LINK);
  });
  test("it should redirect to play store with use redirectFunction param", () => {
    const redirectFunction = jest.fn();
    const smartAppRedirect = new SmartAppRedirect({
      appStoreLink: APP_STORE_LINK,
      playStoreLink: PLAY_STORE_LINK,
      defaultLink: PLAY_STORE_LINK,
      redirectFunction,
      userAgent:
        "Mozilla/5.0 (Linux; Android <version>; <device_model> Build/<build_version>) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/<chrome_version> Mobile Safari/537.36",
    });
    smartAppRedirect.redirect();
    expect(redirectFunction).toHaveBeenCalledWith(PLAY_STORE_LINK);
  });
});
