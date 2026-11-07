package com.hajer.livres_proj.security;

import java.util.Collections;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.csrf(csrf -> csrf.disable())
				.cors(cors -> cors.configurationSource(new CorsConfigurationSource() {
					@Override
					public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
						CorsConfiguration cors = new CorsConfiguration();
						cors.setAllowedOrigins(Collections.singletonList("http://localhost:4200"));
						cors.setAllowedMethods(Collections.singletonList("*"));
						cors.setAllowedHeaders(Collections.singletonList("*"));
						cors.setExposedHeaders(Collections.singletonList("Authorization"));
						return cors;
					}
				}))
				.authorizeHttpRequests(requests -> requests
						// Consulter tous les livres et un livre par son ID : autorisé pour ADMIN et USER
						.requestMatchers("/api/all/**").hasAnyAuthority("ADMIN", "USER")
						.requestMatchers(HttpMethod.GET, "/api/getbyid/**").hasAnyAuthority("ADMIN", "USER")
						.requestMatchers(HttpMethod.GET, "/api/livrsecriv/**").hasAnyAuthority("ADMIN", "USER")
						.requestMatchers(HttpMethod.GET, "/api/livresByTitre/**").hasAnyAuthority("ADMIN", "USER")
						.requestMatchers(HttpMethod.GET, "/api/livresParEcrivain/**").hasAnyAuthority("ADMIN", "USER")
						.requestMatchers(HttpMethod.GET, "/api/ecriv/**").hasAnyAuthority("ADMIN", "USER")

						// Ajouter, Modifier, Supprimer un livre : réservé uniquement à l'ADMIN
						.requestMatchers(HttpMethod.POST, "/api/addlivre/**").hasAnyAuthority("ADMIN")
						.requestMatchers(HttpMethod.PUT, "/api/updatelivre/**").hasAuthority("ADMIN")
						.requestMatchers(HttpMethod.DELETE, "/api/dellivre/**").hasAuthority("ADMIN")

						// Tout le reste nécessite une authentification
						.anyRequest().authenticated())
				.addFilterBefore(new JWTAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

}

