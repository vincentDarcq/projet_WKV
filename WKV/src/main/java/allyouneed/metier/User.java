package allyouneed.metier;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name="users")
public class User {


	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column
	private int id;

	@Column
	private String pseudonyme;
	
	@Column
	private String password;
	
	@Column
	private String email;
	
	@Column
	private String question;
	
	@Column
	private String reponse;
	
	@Column
	private String filmsfavoris;
	
	@Column
	private String seriesfavoris;
	
	public User() {
		
	}
	
	public User(int id) {
		this.id = id;
	}
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}

	public String getFilmsfavoris() {
		return filmsfavoris;
	}

	public void setFilmsfavoris(String filmsfavoris) {
		this.filmsfavoris = filmsfavoris;
	}

	public String getSeriesfavoris() {
		return seriesfavoris;
	}

	public void setSeriesfavoris(String seriesfavoris) {
		this.seriesfavoris = seriesfavoris;
	}

	public String getPseudonyme() {
		return pseudonyme;
	}

	public void setPseudonyme(String pseudonyme) {
		this.pseudonyme = pseudonyme;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public String getReponse() {
		return reponse;
	}

	public void setReponse(String reponse) {
		this.reponse = reponse;
	}	
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "pseudo = "+this.pseudonyme+" email = "+this.email;
	}
}
