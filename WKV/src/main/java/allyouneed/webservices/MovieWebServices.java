package allyouneed.webservices;

import java.util.List;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import allyouneed.metier.Movie;
import allyouneed.metier.MovieService;

@RestController
@RequestMapping("/movies")
@Transactional(readOnly=true)
@CrossOrigin(origins = { 
		"http://localhost:4200",
		"http://localhost:8080"
		})
public class MovieWebServices {
	
	@Autowired
	private MovieService movieService;

	@GetMapping
	public List<Movie> listMovies() {
		return this.movieService.readAll();
	}	
	
	@PostMapping
	public Movie create(@RequestBody Movie movie) {
		return this.movieService.create(movie);
	}
	
	@GetMapping("/{id}")
	public Movie read(@PathVariable Integer id) {
		Movie movie = this.movieService.read(id);
		Hibernate.initialize(movie);
		return movie;
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Integer id) {
		this.movieService.delete(id);
	}
	
	@PutMapping("/{id}")
	public Movie update(@PathVariable Integer id,
			@RequestBody Movie movie) {
		return this.movieService.update(movie);
	}
	
	@GetMapping("/genres")
	public List<String> listGenres() {
		return this.movieService.getGenres();
	}

	@GetMapping("/acteurs")
	public List<String> listTenActors() {
		return this.movieService.getActorsByOccurences();
	}
	
	@GetMapping("/realisateurs")
	public List<String> listTenReals() {
		return this.movieService.getRealsByOccurences();
	}
}
