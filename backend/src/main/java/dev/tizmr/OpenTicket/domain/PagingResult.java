package dev.tizmr.OpenTicket.domain;

import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PagingResult<T> {

  private List<T> content;
  private PageInfo pageInfo;

  public PagingResult(
      List<T> content, Integer totalPages, long totalElements, Integer size, Integer page) {
    this.content = content;
    this.pageInfo = new PageInfo(totalPages, totalElements, size, page);
  }
}
