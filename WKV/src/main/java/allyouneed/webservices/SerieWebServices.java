package allyouneed.webservices;

import java.util.List;

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

import allyouneed.metier.Serie;
import allyouneed.metier.SerieService;

@RestController
@RequestMapping("/series")
@Transactional(readOnly=true)
@CrossOrigin(origins = { 
		"http://localhost:4200",
		"http://localhost:8080"
		})
public class SerieWebServices {

	@Autowired
	private SerieService serieService;

	@GetMapping
	public List<Serie> listMovies() {
		return this.serieService.readAll();
	}
	
	
	@PostMapping
	public Serie create(@RequestBody Serie movie) {
		return this.serieService.create(movie);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Integer id) {
		this.serieService.delete(id);
	}
	
	@PutMapping("/{id}")
	public Serie update(@PathVariable Integer id,
			@RequestBody Serie serie) {
		return this.serieService.update(serie);
	}
	
	@GetMapping("/genres")
	public List<String> listGenres() {
		return this.serieService.getGenres();
	}
}
