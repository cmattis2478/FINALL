// Fetch 1
fetch("http://localhost:3000/movies")
  .then(res => res.json())
  .then(data => {

    const moviesDiv = document.getElementById("movies");

    data.forEach(movie => {

      const div = document.createElement("div");

      div.innerHTML = `
        <h3>${movie.name}</h3>

        <button onclick="saveMovie('${movie.name}')">
          Save Movie
        </button>
      `;

      moviesDiv.appendChild(div);

    });

  
    const ctx = document.getElementById("chart");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map(m => m.name),
        datasets: [{
          label: "Movie IDs",
          data: data.map(m => m.id)
        }]
      }
    });

  });


// Fetch 2
function saveMovie(title) {

  fetch("http://localhost:3000/favorites", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({ title })

  });

}


// Fetch 3
fetch("http://localhost:3000/favorites")
  .then(res => res.json())
  .then(data => {
    console.log(data);
  });
