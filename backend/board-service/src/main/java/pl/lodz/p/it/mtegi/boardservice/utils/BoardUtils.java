package pl.lodz.p.it.mtegi.boardservice.utils;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang.ArrayUtils;

import java.time.LocalDateTime;
import java.util.Random;

public class BoardUtils {
    public static String generateInviteToken(Long boardId) {
        byte[] timestamp = String.join(LocalDateTime.now().toString(), boardId.toString()).getBytes();
        byte[] bytes = new byte[6];
        new Random().nextBytes(bytes);
        return Base64.encodeBase64URLSafeString(ArrayUtils.addAll(timestamp, bytes));
    }
}
