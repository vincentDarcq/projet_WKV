package allyouneed.metier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import allyouneed.dao.UserDao;

@Service
public class UserService extends RestService<User>{

	@Autowired
	private UserDao dao;

	@Override
	protected JpaRepository<User, Integer> getDao() {
		return this.dao;
	}
}
