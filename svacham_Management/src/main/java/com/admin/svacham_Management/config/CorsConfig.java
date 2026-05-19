package com.admin.svacham_Management.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * Global CORS configuration to allow browser-based React/JS apps to access the API
 * during development. Adjust allowed origins for production.
 */
@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        // allow credentials (cookies, authorization headers)
        config.setAllowCredentials(true);
        // allowed origins - include your React dev server(s) here
        // explicit local dev origins - add or remove as needed
        config.setAllowedOrigins(Arrays.asList(
                "http://localhost:3000", // Create React App default
                "http://127.0.0.1:3000",
                "http://localhost:5173", // Vite / pnpm dev server default
                "http://127.0.0.1:5173",
                "http://localhost:5174",
                "http://127.0.0.1:5174"
        ));

        // allow all headers and methods typically used by REST clients (convenient for local dev)
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}