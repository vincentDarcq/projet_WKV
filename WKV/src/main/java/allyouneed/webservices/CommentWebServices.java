package allyouneed.webservices;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import allyouneed.metier.CommentMovie;
import allyouneed.metier.CommentMovieService;
import allyouneed.metier.MovieService;
import allyouneed.metier.UserService;

@RestController
@RequestMapping("/comments")
@Transactional(readOnly=true)
@CrossOrigin(origins = { 
		"http://localhost:4200",
		"http://localhost:8080"
		})
public class CommentWebServices {

	@Autowired
	private CommentMovieService commentMovieService;
	
	@Autowired
	private MovieService movieService;
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/movie/{idmovie}")
	public List<CommentMovie> listComs(@PathVariable Integer idmovie) {
		List<CommentMovie> comments = this.commentMovieService.readAll();
		List<CommentMovie> commentsByMovie = new ArrayList<CommentMovie>();
		for(CommentMovie comment : comments) {
			if(comment.getMovie().getId() == idmovie) {
				commentsByMovie.add(comment);
			}
		}
		return commentsByMovie;
	}
	
	@PostMapping("/movie/{iduser}/{idmovie}")
	@ResponseBody
	public CommentMovie create(@PathVariable Integer iduser, @PathVariable Integer idmovie, @RequestBody String comment) {
		java.util.Date date = new Date();
		Object dateCom = new java.sql.Timestamp(date.getTime());
		CommentMovie com = new CommentMovie(this.commentMovieService.getDate(dateCom), comment, 
				this.movieService.read(idmovie), this.userService.read(iduser));
		this.commentMovieService.create(com);
		return com;
	}
	
	@DeleteMapping("/movie/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Integer id) {
		this.commentMovieService.delete(id);
	}
}
