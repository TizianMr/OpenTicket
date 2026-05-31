package dev.tizmr.OpenTicket.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.media.Schema;
import java.util.List;
import java.util.Map;
import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfig {

  @Bean
  public OpenAPI api() {
    return new OpenAPI().info(new Info().title("OpenTicket API").version("1.0.0"));
  }

  @Bean
  public OpenApiCustomizer requiredFieldsCustomizer() {
    return openApi ->
        openApi
            .getComponents()
            .getSchemas()
            .values()
            .forEach(
                rawSchema -> {
                  final Schema<?> schema = (Schema<?>) rawSchema;
                  final Map<?, ?> rawProperties = schema.getProperties();
                  if (rawProperties != null) {
                    final List<String> required =
                        rawProperties.entrySet().stream()
                            .filter(
                                e -> !Boolean.TRUE.equals(((Schema<?>) e.getValue()).getNullable()))
                            .map(e -> (String) e.getKey())
                            .toList();
                    schema.setRequired(required);
                  }
                });
  }
}
