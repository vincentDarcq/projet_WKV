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
		String realisateur;
		for(Movie movie : movies) {
			realisateur = movie.getRealisateur().toLowerCase();
			if(movie.getRealisateur() != null) {
				int indexEnd = realisateur.indexOf(", ");
				if(indexEnd == -1) {
					if(!realisateurs.contains(realisateur.toLowerCase())) {
						realisateurs.add(realisateur.toLowerCase());
					}
				}else {				
					while(indexEnd != -1) {
						if(!realisateurs.contains(realisateur.substring(0, indexEnd).toLowerCase())){
							realisateurs.add(realisateur.substring(0, indexEnd).toLowerCase());
						}
						realisateur = realisateur.substring(indexEnd+2);
						indexEnd = realisateur.indexOf(", ");
					}
					if(!realisateurs.contains(realisateur.toLowerCase())) {
						realisateurs.add(realisateur.toLowerCase());
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
		String casting;
		for(Movie movie : movies) {
			casting = movie.getCasting().toLowerCase();
			if(movie.getCasting() != null) {
				int indexEnd = casting.indexOf(", ");
				if(indexEnd == -1) {
					if(!actors.contains(casting.toLowerCase())) {
						actors.add(casting.toLowerCase());
					}
				}else {				
					while(indexEnd != -1) {
						if(!actors.contains(casting.substring(0, indexEnd).toLowerCase())){
							actors.add(casting.substring(0, indexEnd).toLowerCase());
						}
						casting = casting.substring(indexEnd+2);
						indexEnd = casting.indexOf(", ");
					}
					if(!actors.contains(casting.toLowerCase())) {
						actors.add(casting.toLowerCase());
					}
				}
			}
		}
		Collections.sort(actors);
		return actors;
	}
}
