let page = 1;
const btnPrevious = document.getElementById("btnPrevious");
const btnNext = document.getElementById("btnNext");

btnNext.addEventListener("click", () => {
  if (page < 1000) {
    page += 1;
    loadMovies();
  }
});
btnPrevious.addEventListener("click", () => {
  if (page > 1) {
    page -= 1;
    loadMovies();
  }
});

const loadMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=edbb59e3bd91ab572f838b1bb068e84f&Language=en=US&page=${page}`
    );
    console.log(response);
    if (response.status === 200) {
      const data = await response.json();

      let movies = "";
      data.results.forEach((movie) => {
        console.log(data);
        movies += `
       <div class='movie'>
        <img class='poster' src='https://image.tmdb.org/t/p/w500/${movie.poster_path}'>
        <h3 class='title'>${movie.title}</h3>
        </div>
    `;
      });

      document.getElementById("container").innerHTML = movies;
    } else if (response.status === 401) {
      console.log("wrong key");
    } else {
      console.log("you messed up!");
    }
  } catch (error) {
    console.log(error);
  }
};

loadMovies();
