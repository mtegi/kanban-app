package pl.lodz.p.it.mtegi.boardservice.service;

import java.util.List;

public interface AssignedCardService {
    void setMembers(String cardId, List<String> usernames);
}
