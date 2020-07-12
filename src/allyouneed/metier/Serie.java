package allyouneed.metier;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="series")
public class Serie {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column
	private int id;
	
	@Column
	private String titre;
	
	@Column
	private String synopsis;
	
	@Column
	private String genre;
	
	@Column
	private String casting;
	
	@Column
	private String creator;
	
	@Column
	private int seasons;
	
	@Column
	private String cov;
	
	@Column
	private String pegi;
	
	@Column
	private String avertissement;
	
	public Serie() {		
	}

	public String getCov() {
		return cov;
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

	public int getSeasons() {
		return seasons;
	}

	public void setSeasons(int seasons) {
		this.seasons = seasons;
	}	
	
	public String getTitre() {
		return titre;
	}

	public void setTitre(String titre) {
		this.titre = titre;
	}

	public String getSynopsis() {
		return synopsis;
	}

	public void setSynopsis(String synopsis) {
		this.synopsis = synopsis;
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	public String getCasting() {
		return casting;
	}

	public void setCasting(String casting) {
		this.casting = casting;
	}

	public String getCreator() {
		return creator;
	}

	public void setCreator(String creator) {
		this.creator = creator;
	}

	@Override
	public String toString() {
		return "serie : titre="+this.titre+", synopsis="+this.synopsis;
	}
}
