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
@Table(name="movies")
public class Movie{

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column
	private int id;
	
	@Column
	private String titre;
	
	@Column
	private String synopsis;
	
	@Column
	private String genres;
	
	@Column
	private String genresPrecis;
	
	@Column
	private String casting;
	
	@Column
	private String realisateur;
	
	@Column
	private String cov;
	
	@Column
	private int year;
	
	@Column
	private String pegi;
	
	@Column
	private String avertissement;
	
	public Movie() {
		
	}
	
	public Movie(int id) {
		this.id = id;
	}
	
	@Override
	public String toString() {
		return "Movie [id=" + this.id + ", titre=" + this.titre + ", genres=" + this.genres + ", synopsis=" + this.synopsis + ", realisateur=" + this.realisateur+ ", year=" + this.year + "]";
	}
	
	public String getAvertissement() {
		return avertissement;
	}

	public void setAvertissement(String avertissement) {
		this.avertissement = avertissement;
	}

	public String getCov() {
		return cov;
	}	

	public String getPegi() {
		return pegi;
	}

	public void setPegi(String peggi) {
		this.pegi = peggi;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public void setCov(String cov) {
		this.cov = cov;
	}

	public int getId() {
		return id;
	}	

	public void setId(int id) {
		this.id = id;
	}

	public String getTitre() {
		return titre;
	}

	public void setTitre(String titre) {
		this.titre = titre;
	}

	public String getGenre() {
		return genres;
	}

	public void setGenre(String genre) {
		this.genres = genre;
	}

	public String getCasting() {
		return casting;
	}

	public void setCasting(String casting) {
		this.casting = casting;
	}

	public String getRealisateur() {
		return realisateur;
	}

	public void setRealisateur(String realisateur) {
		this.realisateur = realisateur;
	}

	public String getSynopsis() {
		return synopsis;
	}

	public void setSynopsis(String synopsis) {
		this.synopsis = synopsis;
	}
	
}
