const API = "http://localhost:8080/api/reviews";

const authHeader = () => {
  let token = localStorage.getItem("token") || "";
  token = token.replace(/^(BEARER|Bearer)\s+/i, "");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const createReview = async ({ movieId, rating, content }) => {
  const res = await fetch(API, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ movieId, rating, content }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ msg: "Failed to create review" }));
    throw new Error(error.msg || "Failed to create review");
  }

  return res.json();
};

export const getMovieReviews = async (movieId) => {
  const res = await fetch(`${API}/movie/${movieId}`, {
    headers: authHeader(),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ msg: "Failed to fetch movie reviews" }));
    throw new Error(error.msg || "Failed to fetch movie reviews");
  }
  return res.json();
};

export const getMyReviews = async () => {
  const res = await fetch(`${API}/me`, {
    headers: authHeader(),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ msg: "Failed to fetch your reviews" }));
    throw new Error(error.msg || "Failed to fetch your reviews");
  }
  return res.json();
};

export const updateReview = async (id, { rating, content }) => {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify({ rating, content }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ msg: "Failed to update review" }));
    throw new Error(error.msg || "Failed to update review");
  }
  return res.json();
};

export const deleteReview = async (id) => {
  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: authHeader(),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ msg: "Failed to delete review" }));
    throw new Error(error.msg || "Failed to delete review");
  }
  return res.json();
};


