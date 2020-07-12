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
@Table(name="comments_movies")
public class CommentMovie {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column
	private int id;
	
	@Column
	private String date;

	@Column
	private String comment;
	
	@OneToOne()
	@JoinColumn(name = "idmovie")
	private Movie movie;
	
	@OneToOne()
	@JoinColumn(name = "iduser")
	private User user;
	

	public CommentMovie() {
		
	}

	public CommentMovie(String date, String comment, Movie idmovie, User iduser) {
		this.date = date;
		this.comment = comment;
		this.movie = idmovie;
		this.user = iduser;
	}
	
	@Override
	public String toString() {
		return "Commentaire : date ="+this.date+" comment ="+this.comment+" movie ="+this.movie+" user ="+this.user;
	}
	
	public Object getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public Movie getMovie() {
		return movie;
	}

	public void setMovie(Movie idMovie) {
		this.movie = idMovie;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User iduser) {
		this.user = iduser;
	}	
	
}
