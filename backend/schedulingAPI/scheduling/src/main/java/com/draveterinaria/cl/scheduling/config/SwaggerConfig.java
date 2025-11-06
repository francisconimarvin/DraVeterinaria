package com.draveterinaria.cl.scheduling.config;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API - DraVeterinaria 🐾")
                        .version("1.0.0")
                        .description("API de gestión de tutores, mascotas y servicios para la clínica veterinaria.")
                        .contact(new Contact()
                                .name("Equipo de Desarrollo DraVeterinaria")
                                .email("contacto@draveterinaria.cl")
                                .url("https://draveterinaria.cl"))
                        .license(new License().name("Apache 2.0").url("https://springdoc.org")));
    }
}

