package pl.lodz.p.it.mtegi.boardservice.service;

import pl.lodz.p.it.mtegi.boardservice.dto.report.BoardReportDto;

public interface BoardReportService {
    BoardReportDto getReportData(Long boardId);
}
