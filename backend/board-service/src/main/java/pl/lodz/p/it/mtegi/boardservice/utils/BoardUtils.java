package pl.lodz.p.it.mtegi.boardservice.utils;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang.ArrayUtils;
import org.bouncycastle.util.Arrays;
import pl.lodz.p.it.mtegi.boardservice.model.InviteToken;
import pl.lodz.p.it.mtegi.common.utils.crypto.HmacUtils;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.Random;

public class BoardUtils {
    public static String generateInviteToken(Long boardId) throws InvalidKeyException, NoSuchAlgorithmException {
        byte[] timestamp = String.join(LocalDateTime.now().toString(), boardId.toString()).getBytes();
        byte[] bytes = new byte[6];
        new Random().nextBytes(bytes);
        byte[] digest = ArrayUtils.addAll(timestamp, bytes);
        return Base64.encodeBase64URLSafeString(HmacUtils.sign(digest));
    }

    public static boolean verifyInviteToken(String token, InviteToken entity) throws InvalidKeyException, NoSuchAlgorithmException {
        return Arrays.areEqual(Base64.decodeBase64(entity.getValue()), Base64.decodeBase64(token));
    }
}
