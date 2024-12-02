async function fetchFilms() {
  const url = "https://ghibliapi.vercel.app/films";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP-feil! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Det oppsto en feil:", error);
    throw error;
  }
}
async function displayFilms() {
  const filmList = document.getElementById("film-list");

  try {
    const films = await fetchFilms();

    filmList.innerHTML = "";

    films.forEach((film) => {
      const filmDiv = document.createElement("div");
      filmDiv.classList.add("film");

      filmDiv.innerHTML = `
          <h2>${film.title}</h2>
          <p><strong>Director:</strong> ${film.director}</p>
          <p><strong>Release Date:</strong> ${film.release_date}</p>
          <p>${film.description}</p>
        `;

      filmList.appendChild(filmDiv);
    });
  } catch (error) {
    filmList.innerHTML = `<p>Det oppsto en feil: ${error.message}</p>`;
  }
}

displayFilms();
