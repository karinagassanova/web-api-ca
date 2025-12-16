const API = "http://localhost:8080/api/usermovies";

const authHeader = () => {
  let token = localStorage.getItem("token") || "";
  token = token.replace(/^(BEARER|Bearer)\s+/i, "");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };
};

export const getUserMovies = async () => {
  const res = await fetch(API, { headers: authHeader() });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ msg: "Failed to fetch user movies" }));
    throw new Error(error.msg || "Failed to fetch user movies");
  }
  return res.json();
};

export const addFavorite = async (movieId) => {
  const res = await fetch(`${API}/favorites`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ movieId })
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ msg: "Failed to add favorite" }));
    throw new Error(error.msg || `Failed to add favorite: ${res.status} ${res.statusText}`);
  }
  return res.json();
};

export const removeFavorite = async (movieId) => {
  const res = await fetch(`${API}/favorites/${movieId}`, {
    method: "DELETE",
    headers: authHeader()
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ msg: "Failed to remove favorite" }));
    throw new Error(error.msg || "Failed to remove favorite");
  }
  return res.json();
};

export const addMustWatch = async (movieId) => {
  const res = await fetch(`${API}/mustwatch`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ movieId })
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ msg: "Failed to add to must watch" }));
    throw new Error(error.msg || "Failed to add to must watch");
  }
  return res.json();
};

export const removeMustWatch = async (movieId) => {
  const res = await fetch(`${API}/mustwatch/${movieId}`, {
    method: "DELETE",
    headers: authHeader()
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ msg: "Failed to remove from must watch" }));
    throw new Error(error.msg || "Failed to remove from must watch");
  }
  return res.json();
};
