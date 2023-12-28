export interface ICookieOptions {
  path?: string | undefined;
  domain?: string | undefined;
  expires?: Date | string | undefined;
  "max-age"?: number | undefined;
  secure?: boolean | undefined;
  samesite?: true | false | "lax" | "strict" | "none" | undefined;
  httpOnly?: boolean | undefined;
  priority?: "low" | "medium" | "high" | undefined;
  encode?(value: string): string;
}

export function getCookie(name: string) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(
  name: string,
  value: string,
  options: ICookieOptions
) {
  options = {
    path: "/",
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  Object.entries(options).forEach(([optionKey, optionValue]) => {
    updatedCookie += "; " + optionKey;
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  });

  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, "", {
    "max-age": -1,
  });
}

export function deleteAllCookies() {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    deleteCookie(name.trim());
  }
  console.log("all cookies deleted !");
}

export const setAccessCookie = (token: string) => {
  setCookie("accessToken", token, {
    path: "/main",
    secure: true,
    samesite: "strict",
  });
};

export const getAccessCookie = () => {
  return getCookie("accessToken");
};
