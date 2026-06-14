package dev.tizmr.OpenTicket.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PageInfo {
  private Integer totalPages;
  private long totalElements;
  private Integer size;
  private Integer page;
}
