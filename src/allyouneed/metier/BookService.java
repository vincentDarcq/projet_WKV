package allyouneed.metier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import allyouneed.dao.BookDao;

@Service
public class BookService extends RestService<Book> {

	@Autowired
	private BookDao dao;
	
	@Override
	protected JpaRepository<Book, Integer> getDao() {
		return this.dao;
	}

}
