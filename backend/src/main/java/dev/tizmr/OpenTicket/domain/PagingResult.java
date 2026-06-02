package dev.tizmr.OpenTicket.domain;

import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PagingResult<T> {

  private List<T> content;
  private Integer totalPages;
  private long totalElements;
  private Integer size;
  private Integer page;

  public PagingResult(
      List<T> content, Integer totalPages, long totalElements, Integer size, Integer page) {
    this.content = content;
    this.totalPages = totalPages;
    this.totalElements = totalElements;
    this.size = size;
    this.page = page;
  }
}
