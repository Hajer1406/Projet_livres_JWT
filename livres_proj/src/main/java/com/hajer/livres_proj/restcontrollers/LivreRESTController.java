package com.hajer.livres_proj.restcontrollers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.hajer.livres_proj.entities.Livre;
import com.hajer.livres_proj.service.LivreService;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class LivreRESTController {
	@Autowired
	LivreService livreService;

	@RequestMapping(path = "all", method = RequestMethod.GET)
	public List<Livre> getAllLivres() {
		return livreService.getAllLivres();
	}

	@RequestMapping(value = "/getbyid/{id}", method = RequestMethod.GET)
	public Livre getLivreById(@PathVariable("id") Long id) {
		return livreService.getLivre(id);
	}

	@RequestMapping(path = "/addlivre", method = RequestMethod.POST)
	public Livre createLivre(@RequestBody Livre livre) {
		return livreService.saveLivre(livre);
	}

	@RequestMapping(path = "/updatelivre", method = RequestMethod.PUT)
	public Livre updateLivre(@RequestBody Livre livre) {
		return livreService.updateLivre(livre);
	}

	@RequestMapping(value = "/dellivre/{id}", method = RequestMethod.DELETE)
	public void deleteLivre(@PathVariable("id") Long id) {
		livreService.deleteLivreById(id);
	}

	@RequestMapping(value = "/livrsecriv/{idEcrivain}", method = RequestMethod.GET)
	public List<Livre> getLivresByEcrivainId(@PathVariable("idEcrivain") Long idEcrivain) {
		return livreService.findByEcrivainIdEcrivain(idEcrivain);
	}

	/**
	 * URL : GET /livres/api/livresByTitre/{titre}
	 */
	@RequestMapping(value = "/livresByTitre/{titre}", method = RequestMethod.GET)
	public List<Livre> findByTitreLivreContains(@PathVariable("titre") String titre) {
		return livreService.findByTitreLivreContains(titre);
	}

	/**
	 * URL : GET /livres/api/livresParEcrivain/{idEcrivain}
	 */
	@RequestMapping(value = "/livresParEcrivain/{idEcrivain}", method = RequestMethod.GET)
	public List<Livre> getLivresByEcrivain(@PathVariable("idEcrivain") Long idEcrivain) {
		return livreService.findByEcrivainIdEcrivain(idEcrivain);
	}

}
