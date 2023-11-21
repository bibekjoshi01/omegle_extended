function setCookie(name, value, options = {}) {
  options = {
    path: "/",
    ...options,
  };
  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
    if (options.domain) {
      updatedCookie += `; domain=${options.domain}`;
    }
  }

  document.cookie = updatedCookie;
}

export default setCookie;
