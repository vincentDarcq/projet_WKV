package allyouneed.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import allyouneed.metier.Book;

@Repository
public interface BookDao extends JpaRepository<Book, Integer> {

}
