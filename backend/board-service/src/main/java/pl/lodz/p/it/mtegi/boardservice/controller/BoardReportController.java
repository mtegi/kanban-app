package pl.lodz.p.it.mtegi.boardservice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.lodz.p.it.mtegi.boardservice.dto.report.BoardReportDto;
import pl.lodz.p.it.mtegi.boardservice.service.BoardReportService;


@RestController
@RequestMapping("/reports")
@RequiredArgsConstructor
public class BoardReportController {
    private final BoardReportService reportService;

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{id}")
    BoardReportDto getReportDetails(@PathVariable Long id){
        return reportService.getReportData(id);
    }
}
