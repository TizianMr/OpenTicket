package dev.tizmr.OpenTicket.controllers;

import dev.tizmr.OpenTicket.domain.dto.ErrorDto;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ErrorDto> handleValidationExceptions(MethodArgumentNotValidException ex) {

    final String errorMsg =
        ex.getBindingResult().getFieldErrors().stream()
            .findFirst()
            .map(DefaultMessageSourceResolvable::getDefaultMessage)
            .orElse("Validation failed.");

    final ErrorDto errorDto = new ErrorDto(errorMsg);

    return new ResponseEntity<>(errorDto, HttpStatus.BAD_REQUEST);
  }
}
