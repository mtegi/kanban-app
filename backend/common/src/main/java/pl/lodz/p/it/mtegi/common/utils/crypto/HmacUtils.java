package pl.lodz.p.it.mtegi.common.utils.crypto;

import org.bouncycastle.util.Arrays;
import org.bouncycastle.util.encoders.Hex;

import javax.crypto.KeyGenerator;
import javax.crypto.Mac;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

public class HmacUtils {
    private final byte[] secretKey;

    private static HmacUtils instance = null;

    private HmacUtils() {
        secretKey = "my-test-secret".getBytes();
    }


    private static HmacUtils getInstance() {
        if (instance == null)
            instance = new HmacUtils();
        return instance;
    }

    public static byte[] sign(byte[] digest) throws NoSuchAlgorithmException, InvalidKeyException {
        HmacUtils signer = HmacUtils.getInstance();
        Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
        sha256_HMAC.init(new SecretKeySpec(signer.secretKey, "HmacSHA256"));
        return sha256_HMAC.doFinal(digest);
    }


    public static String signToHex(byte[] digest) throws NoSuchAlgorithmException, InvalidKeyException {
            return new String(Hex.encode(sign(digest)));
    }

    public static boolean verify(byte[] signature, byte[] digest) throws NoSuchAlgorithmException, InvalidKeyException {
            HmacUtils signer = HmacUtils.getInstance();
            Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
            sha256_HMAC.init(new SecretKeySpec(signer.secretKey, "HmacSHA256"));
            byte[] result = sha256_HMAC.doFinal(digest);
            return Arrays.areEqual(signature, result);
    }
}
