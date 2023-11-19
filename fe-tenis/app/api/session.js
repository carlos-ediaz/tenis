const KEY = "token";

export function setSession(payload) {
  let data = payload;

  if (typeof data === "object") {
    data = JSON.stringify(payload);
  }

  localStorage.setItem(KEY, payload);
}

export function getSession() {
  let data = localStorage.getItem(KEY);

  if (typeof data === "object") {
    data = JSON.stringify(data);
  }

  return data;
}

export function clearSession() {
  localStorage.removeItem(KEY);
  localStorage.setItem("user", null);
}
