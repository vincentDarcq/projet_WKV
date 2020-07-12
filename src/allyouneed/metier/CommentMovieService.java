package allyouneed.metier;

import java.text.SimpleDateFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import allyouneed.dao.CommentDao;

@Service
public class CommentMovieService extends RestService<CommentMovie>{

	@Autowired
	private CommentDao dao;

	@Override
	protected JpaRepository<CommentMovie, Integer> getDao() {
		return this.dao;
	}
	
	public String getDate(Object date) {
		String d = new SimpleDateFormat("dd").format(date) + " " +
				   new SimpleDateFormat("MMMM").format(date) + " " +
				   new SimpleDateFormat("YYYY").format(date) + " à " +
				   new SimpleDateFormat("HH").format(date) + "h" +
				   new SimpleDateFormat("mm").format(date);
		return d;
	}
	
}
