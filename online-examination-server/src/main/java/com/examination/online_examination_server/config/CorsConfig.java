package com.examination.online_examination_server.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer webMvcConfigurer(){
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Allow CORS for all endpoints
//                        .allowedOrigins("http://localhost:5173") // Allow only this origin
                        .allowedMethods("GET", "POST", "PUT", "DELETE") // Specify allowed methods
                        .allowedOrigins("*"); // Allow all headers
            }
        };
    }
}
