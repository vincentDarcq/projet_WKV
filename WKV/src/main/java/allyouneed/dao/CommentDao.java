package allyouneed.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import allyouneed.metier.CommentMovie;

@Repository
public interface CommentDao extends JpaRepository<CommentMovie, Integer> {

}
