import http from './http';

function transformSubject(item = {}) {
  return {
    ...item, // Copia todas las propiedades
    /*lesson: {
        subject: item.lesson?.subject ?? "Unknown", // retorna valor de la izquierda si no es undefined/null. Si es undefined/null, retorna Unknown
        description: item.lesson?.description ?? "Unknown",
      },*/
  };
}

//API Agent
export async function getSubjects() {
  try {
    const { data: response } = await http.get(`/subjects/`);
    const data = response.data.map(transformSubject);
    return {
      data,
      meta: response.meta,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getSubject(id) {
  try {
    const { data: response } = await http.get(`/subjects/${id}`);
    const data = transformSubject(response.data);
    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getSubjectId(subjectname) {
  try {
    const { data: response } = await http.get(`/subjects/n/${subjectname}`);
    const data = transformSubject(response.data);

    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getTeachersFromSubject(subjectId) {
  try {
    const { data: response } = await http.get(
      `/subjects/${subjectId}/teachers`,
    );

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
