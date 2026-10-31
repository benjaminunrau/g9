package py.una.crm.common.openapi;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfiguration {

    @Bean
    OpenAPI realEstateCrmOpenApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("Real Estate CRM API")
                        .description("REST API for the academic real-estate CRM project.")
                        .version("0.1.0"));
    }
}
