package allyouneed.webservices;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import allyouneed.metier.User;
import allyouneed.metier.UserService;

@RestController
@RequestMapping("/users")
@Transactional(readOnly=true)
@CrossOrigin(origins = { 
		"http://localhost:4200",
		"http://localhost:8080"
		})
public class UserWebServices {
	
	@Autowired
	private UserService userService;

	@GetMapping
	public List<User> listUsers() {
		return this.userService.readAll();
	}
	
	@PostMapping
	public String register(@RequestBody User user) {
		List<User> users = this.userService.readAll();
		for(User utilisateur : users) {
			if(user.getEmail().equals(utilisateur.getEmail())) {
				return "500";
			}
		}
		this.userService.create(user);
		return "200";
	}
	
	@PutMapping("/{id}")
	public User update(@PathVariable Integer id,
			@RequestBody User user) {
		return this.userService.update(user);
	}

}
