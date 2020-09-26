package allyouneed.metier;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

import allyouneed.dao.MovieDao;
import allyouneed.dao.NoteDao;

@Service
@Transactional
public class NoteMovieService extends RestService<NoteMovie> {

	@Autowired
	private NoteDao daoNote;
	
	@Autowired
	private MovieDao daoMovie;
	
	@Override
	protected JpaRepository<NoteMovie, Integer> getDao() {
		return this.daoNote;
	}
	
	public List<Movie> getBestGrades(){
		List<NoteMovie> notesObjet = this.daoNote.findAll();
		List<Movie> movies = this.daoMovie.findAll();
		Map<Float, Movie> grades = new HashMap<Float, Movie>();
		List<Movie> bestMovies = new ArrayList<Movie>();
		for(Movie movie : movies) {
			int compt = 0;
			Float value = 0.0f;
			for(NoteMovie note : notesObjet) {
				if(note.getMovie().getTitre().equals(movie.getTitre())) {
					compt ++;
					value += note.getNote();
				}
			}
			if(compt >= 1) {
				grades.put((value/compt), movie);
			}
		}
		List<Float> notes = new ArrayList<Float>(grades.keySet());
		Collections.sort(notes, Collections.reverseOrder());
		for(int i=0; i<9; i++) {
			bestMovies.add(grades.get(notes.get(i)));
		}
		return bestMovies;
	}
	
	public List<Movie> getBestAlloGrades(){
		List<Movie> movies = this.daoMovie.findAll();
		Map<Movie, Float> grades = new HashMap<Movie, Float>();
		List<Movie> bestMovies = new ArrayList<Movie>();
		List<Float> notes = new ArrayList<Float>();
		for(Movie movie : movies) {
			if(movie.getAlloGrade() != null) {
				grades.put(movie, movie.getAlloGrade());
				notes.add(movie.getAlloGrade());
			}
		}
		Collections.sort(notes, Collections.reverseOrder());
		for(int i=0; i<notes.size(); i++) {
			for(Movie movie : grades.keySet()) {
				if(movie.getAlloGrade() == notes.get(i)) {
					bestMovies.add(movie);
				}
			}
		}
		return bestMovies;
	}

}
