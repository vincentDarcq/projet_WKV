package allyouneed.metier;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import allyouneed.dao.MovieDao;

@Service
public class MovieService extends RestService<Movie> {

	@Autowired
	private MovieDao dao;

	@Override
	protected JpaRepository<Movie, Integer> getDao() {
		return this.dao;
	}
	
	public List<String> getGenres(){
		List<Movie> movies = this.readAll();
		List<String> genres = new ArrayList<String>();
		String genre;
		for(Movie movie : movies) {
			genre = movie.getGenre().toLowerCase();
			if(movie.getGenre() != null) {				
				int indexEnd = genre.indexOf(", ");
				if(indexEnd == -1) {
					if(!genres.contains(genre)) {
						genres.add(genre);
					}
				}else {				
					while(indexEnd != -1) {
						if(!genres.contains(genre.substring(0, indexEnd))){
							genres.add(genre.substring(0, indexEnd));
						}
						genre = genre.substring(indexEnd+2);
						indexEnd = genre.indexOf(", ");
					}
					if(!genres.contains(genre)) {
						genres.add(genre.toLowerCase());
					}
				}
			}
		}
		return genres;
	}
	
	public List<String> getRealisateurs(){
		List<Movie> movies = this.readAll();
		List<String> realisateurs = new ArrayList<String>();
		for(Movie movie : movies) {
			if(movie.getRealisateur() != null) {
				int indexEnd = movie.getRealisateur().indexOf(", ");
				if(indexEnd == -1) {
					if(!realisateurs.contains(movie.getRealisateur().toLowerCase())) {
						realisateurs.add(movie.getRealisateur().toLowerCase());
					}
				}else {				
					while(indexEnd != -1) {
						if(!realisateurs.contains(movie.getRealisateur().substring(0, indexEnd).toLowerCase())){
							realisateurs.add(movie.getRealisateur().substring(0, indexEnd).toLowerCase());
						}
						movie.setRealisateur(movie.getRealisateur().substring(indexEnd+2));
						indexEnd = movie.getRealisateur().indexOf(", ");
					}
					if(!realisateurs.contains(movie.getRealisateur().toLowerCase())) {
						realisateurs.add(movie.getRealisateur().toLowerCase());
					}
				}
			}
		}
		Collections.sort(realisateurs);
		return realisateurs;
	}
	
	public List<Integer> loadYears(){
		List<Movie> movies = this.readAll();
		List<Integer> years = new ArrayList<Integer>();
		for(Movie movie : movies) {
			if(!years.contains(movie.getYear())) {
				years.add(movie.getYear());
			}
		}
		Collections.sort(years, Collections.reverseOrder());
		return years;
	}
	
	public List<String> getActors(){
		List<Movie> movies = this.readAll();
		List<String> actors = new ArrayList<String>();
		for(Movie movie : movies) {
			if(movie.getCasting() != null) {
				int indexEnd = movie.getCasting().indexOf(", ");
				if(indexEnd == -1) {
					if(!actors.contains(movie.getCasting().toLowerCase())) {
						actors.add(movie.getCasting().toLowerCase());
					}
				}else {				
					while(indexEnd != -1) {
						if(!actors.contains(movie.getCasting().substring(0, indexEnd).toLowerCase())){
							actors.add(movie.getCasting().substring(0, indexEnd).toLowerCase());
						}
						movie.setCasting(movie.getCasting().substring(indexEnd+2));
						indexEnd = movie.getCasting().indexOf(", ");
					}
					if(!actors.contains(movie.getCasting().toLowerCase())) {
						actors.add(movie.getCasting().toLowerCase());
					}
				}
			}
		}
		Collections.sort(actors);
		return actors;
	}
}
