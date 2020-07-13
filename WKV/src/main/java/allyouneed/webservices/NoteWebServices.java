package allyouneed.webservices;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import allyouneed.metier.MovieService;
import allyouneed.metier.NoteMovie;
import allyouneed.metier.NoteMovieService;
import allyouneed.metier.UserService;

@RestController
@RequestMapping("/notes")
@Transactional(readOnly=true)
@CrossOrigin(origins = { 
		"http://localhost:4200",
		"http://localhost:8080"
		})
public class NoteWebServices {

	@Autowired
	private NoteMovieService noteMovieService;
	
	@Autowired
	private MovieService movieService;
	
	@Autowired
	private UserService userService;
	
	@GetMapping
	public List<NoteMovie> notes(){
		return this.noteMovieService.readAll();
	}
	
	@PostMapping("/movie/{idmovie}/{iduser}")
	public Float create(@PathVariable Integer iduser, @PathVariable Integer idmovie, @RequestBody Float note) {
		NoteMovie noteMovie = new NoteMovie(note, this.movieService.read(idmovie), this.userService.read(iduser));
		this.noteMovieService.create(noteMovie);
		return note;
	}
}
