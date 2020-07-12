package allyouneed.allyouneed;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

public class JavaTimeObjectMapper extends ObjectMapper {

	private static final long serialVersionUID = 1L;

	/**
	 * Enregistrement du module de conversion de LocalDate (API Java Time ==
	 * JSR310) pour Jackson.
	 */
	public JavaTimeObjectMapper() {
		// JavaTimeModule permet la sérialisation/déserialisation des objets
		// java.time.LocalDate.
		registerModule(new JavaTimeModule());
	}
}