import http from "./http.js";
import { setSession } from "./session.js";

function transformUser(item = {}) {
  return {
    ...item, // Copia todas las propiedades
    /*lesson: {
      subject: item.lesson?.subject ?? "Unknown", // retorna valor de la izquierda si no es undefined/null. Si es undefined/null, retorna Unknown
      description: item.lesson?.description ?? "Unknown",
    },*/
  };
}

export async function signInUser({ email, password }) {
  try {
    const { data: response } = await http.post("/users/signin", {
      email,
      password,
    });
    const { data, meta } = response;
    const { token = "" } = meta;

    setSession(token);
    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}

//API Agent
export async function getUsers() {
  try {
    const { data: response } = await http.get(`/users/`);
    const data = response.data.map(transformUser);

    return {
      data,
      meta: response.meta,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getUser({ id }) {
  try {
    const { data: response } = await http.get(`/users/${id}`);
    const data = transformUser(response.data);

    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function signUpUser(payload) {
  try {
    const { data: response } = await http.post(`/users/signup`, payload);
    console.log(response.data);
    const data = transformUser(response.data);

    return {
      data,
    };
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

export async function updateUser({ id, formData }) {
  try {
    const { data: response } = await http.put(`/users/${id}`, formData);
    const data = transformUser(response.data);
    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getMe() {
  try {
    const { data: response } = await http.get(`/users/me`);
    const data = transformUser(response.data);
    return {
      data,
      //meta: response.meta,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function addSubject({ subjectId }) {
  try {
    const { data: response } = await http.post(`/usersontourns/`, {
      subjectId,
    });
    const data = transformUser(response.data);
    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function deleteSubject({ subjectId }) {
  try {
    const { data: response } = await http.delete(
      `/subjectsonUsers/${subjectId}`
    );
    const data = transformUser(response.data);
    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function activateUser(token) {
  try {
    const { data: response } = await http.get(`/users/activate/${token}`);
    const data = transformUser(response.data);
    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function confirmUser(email) {
  try {
    const { data: response } = await http.post(`/users/confirmation`, {
      email,
    });
    const data = transformUser(response.data);
    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function voteUser(id) {
  try {
    const { data: result } = await http.get(`/users/${id}`);
    const currentPoints = result.data.points;
    const { data: response } = await http.put(`/users/${id}`, {
      points: currentPoints + 1,
    });
    const data = transformUser(response.data);
    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}
