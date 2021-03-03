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
	private String casting;
	
	@Column
	private String realisateur;
	
	@Column
	private String cov_horizontale;
	
	@Column
	private String cov_verticale;
	
	private Float grade;
	
	private Float alloGrade;
	
	private Float imdbGrade;
	
	@Column
	private int year;
	
	@Column
	private String pegi;
	
	@Column
	private String avertissement;
	
	private String time;
	
	public Movie() {
		
	}
	
	public Movie(int id) {
		this.id = id;
	}
	
	@Override
	public String toString() {
		return "Movie [id=" + this.id + ", titre=" + this.titre + ", genres=" + this.genres + ", synopsis=" + this.synopsis + ", realisateur=" + this.realisateur+ ", year=" + this.year + "]";
	}
	
	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public Float getImdbGrade() {
		return imdbGrade;
	}

	public void setImdbGrade(Float imdbGrade) {
		this.imdbGrade = imdbGrade;
	}

	public String getCov_horizontale() {
		return cov_horizontale;
	}

	public void setCov_horizontale(String cov_horizontale) {
		this.cov_horizontale = cov_horizontale;
	}

	public String getCov_verticale() {
		return cov_verticale;
	}

	public void setCov_verticale(String cov_verticale) {
		this.cov_verticale = cov_verticale;
	}

	public Float getGrade() {
		return grade;
	}

	public void setGrade(Float grade) {
		this.grade = grade;
	}

	public Float getAlloGrade() {
		return alloGrade;
	}

	public void setAlloGrade(Float alloGrade) {
		this.alloGrade = alloGrade;
	}

	public String getAvertissement() {
		return avertissement;
	}

	public void setAvertissement(String avertissement) {
		this.avertissement = avertissement;
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

	public String getGenres() {
		return genres;
	}

	public void setGenres(String genre) {
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
