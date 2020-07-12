package allyouneed.metier;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name="notes_movies")
public class NoteMovie {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column
	private int id;
	
	@Column
	private Float note;

	@OneToOne()
	@JoinColumn(name = "idmovie")
	private Movie movie;
	
	@OneToOne()
	@JoinColumn(name = "iduser")
	private User user;
	
	public NoteMovie() {
		
	}
	
	public NoteMovie(Float note, Movie movie, User user) {
		this.note = note;
		this.movie = movie;
		this.user = user;
	}

	public int getId() {
		return id;
	}

	public Float getNote() {
		return note;
	}

	public void setNote(Float note) {
		this.note = note;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Movie getMovie() {
		return movie;
	}

	public void setMovie(Movie movie) {
		this.movie = movie;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
}
