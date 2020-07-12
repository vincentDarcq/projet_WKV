package allyouneed.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import allyouneed.metier.User;

@Repository
public interface UserDao extends JpaRepository<User, Integer> {

}
