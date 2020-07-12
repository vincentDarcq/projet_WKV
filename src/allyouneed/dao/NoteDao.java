package allyouneed.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import allyouneed.metier.NoteMovie;

public interface NoteDao extends JpaRepository<NoteMovie, Integer>{

}
