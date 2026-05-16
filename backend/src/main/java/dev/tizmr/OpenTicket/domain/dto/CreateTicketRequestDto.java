package dev.tizmr.OpenTicket.domain.dto;

import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;

public record CreateTicketRequestDto(
  @NotBlank(message = ERROR_TITLE_LENGTH)
  @Length(max = 255, message = ERROR_TITLE_LENGTH)
  String title,
  @NotBlank(message = ERROR_DESCRIPTION_LENGTH)
  @Length(max = 255, message = ERROR_DESCRIPTION_LENGTH)
  String description
) {
  private static final String ERROR_TITLE_LENGTH = "Title must be between 1 and 255 characters";
  private static final String ERROR_DESCRIPTION_LENGTH = "Description must be between 1 and 255 characters";

}
