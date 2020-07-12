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
		for(Serie serie : series) {
			if(serie.getGenre() != null) {				
				int indexEnd = serie.getGenre().indexOf(", ");
				if(indexEnd == -1) {
					if(!genres.contains(serie.getGenre().toLowerCase())) {
						genres.add(serie.getGenre().toLowerCase());
					}
				}else {				
					while(indexEnd != -1) {
						if(!genres.contains(serie.getGenre().substring(0, indexEnd).toLowerCase())){
							genres.add(serie.getGenre().substring(0, indexEnd).toLowerCase());
						}
						serie.setGenre(serie.getGenre().substring(indexEnd+2));
						indexEnd = serie.getGenre().indexOf(", ");
					}
					if(!genres.contains(serie.getGenre().toLowerCase())) {
						genres.add(serie.getGenre().toLowerCase());
					}
				}
			}
		}
		return genres;
	}
}
