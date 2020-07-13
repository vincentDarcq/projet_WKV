package allyouneed.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import allyouneed.metier.Serie;

@Repository
public interface SerieDao extends JpaRepository<Serie, Integer> {

}
