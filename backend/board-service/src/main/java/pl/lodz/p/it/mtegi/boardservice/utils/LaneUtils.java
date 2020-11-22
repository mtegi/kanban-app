package pl.lodz.p.it.mtegi.boardservice.utils;

import pl.lodz.p.it.mtegi.boardservice.dto.details.CardDetailsDto;
import pl.lodz.p.it.mtegi.boardservice.dto.details.LaneDetailsDto;
import pl.lodz.p.it.mtegi.boardservice.model.Lane;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class LaneUtils {
    public static void sort(List<LaneDetailsDto> list) {
        list.sort(Comparator.comparing(LaneDetailsDto::getIndex));
        list.forEach(l -> l.getCards().sort(Comparator.comparing(CardDetailsDto::getIndex)));
    }

    public static List<LaneDetailsDto> mapToDto(List<Lane> list) {
        return list.stream().map(l -> {
            LaneDetailsDto dto = new LaneDetailsDto();
            dto.fillProperties(l);
            return dto;
        }).collect(Collectors.toList());
    }
}
