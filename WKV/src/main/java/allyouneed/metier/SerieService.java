package allyouneed.metier;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import allyouneed.dao.SerieDao;

@Service
public class SerieService extends RestService<Serie>{

	@Autowired
	private SerieDao dao;
	
	@Override
	protected JpaRepository<Serie, Integer> getDao() {
		return this.dao;
	}	
	
	public List<String> getGenres(){
		List<Serie> series = this.getDao().findAll();
		List<String> genres = new ArrayList<String>();
		String genre;
		for(Serie serie : series) {
			genre = serie.getGenre().toLowerCase();
			if(serie.getGenre() != null) {				
				int indexEnd = serie.getGenre().indexOf(", ");
				if(indexEnd == -1) {
					if(!genres.contains(genre.toLowerCase())) {
						genres.add(genre.toLowerCase());
					}
				}else {				
					while(indexEnd != -1) {
						if(!genres.contains(genre.substring(0, indexEnd).toLowerCase())){
							genres.add(genre.substring(0, indexEnd).toLowerCase());
						}
						genre = genre.substring(indexEnd+2);
						indexEnd = genre.indexOf(", ");
					}
					if(!genres.contains(genre.toLowerCase())) {
						genres.add(genre.toLowerCase());
					}
				}
			}
		}
		return genres;
	}
}
