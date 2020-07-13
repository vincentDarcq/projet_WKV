package allyouneed.metier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import allyouneed.dao.NoteDao;

@Service
@Transactional
public class NoteMovieService extends RestService<NoteMovie> {

	@Autowired
	private NoteDao dao;
	
	@Override
	protected JpaRepository<NoteMovie, Integer> getDao() {
		return this.dao;
	}

}
