package allyouneed.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import allyouneed.metier.Movie;

@Repository
public interface MovieDao extends JpaRepository<Movie, Integer> {

}
