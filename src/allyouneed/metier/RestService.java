package allyouneed.metier;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Définition commune pour les services utilisés par les services web REST.
 * 
 * @author vdarcq
 *
 * @param <ENTITY>
 *            l'entité utilisée par le DAO.
 */
public abstract class RestService<ENTITY> {

	/**
	 * @return JpaRepository<ENTITY, Integer> le DAO a utiliser pour effectuer
	 *         l'accès BDD.
	 */
	protected abstract JpaRepository<ENTITY, Integer> getDao();
	
	public ENTITY create(final ENTITY entity) {
		return this.getDao().save(entity);
	}
	
	public ENTITY read(final Integer id) {
		return this.getDao().getOne(id);
	}
	
	public List<ENTITY> readAll() {
		return this.getDao().findAll();
	}
	
	public ENTITY update(final ENTITY entity) {
		return this.getDao().save(entity);
	}
	
	public void delete(final Integer id) {
		this.getDao().deleteById(id);
	}
}
