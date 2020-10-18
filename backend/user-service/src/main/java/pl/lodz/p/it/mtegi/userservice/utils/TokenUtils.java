package pl.lodz.p.it.mtegi.userservice.utils;

import pl.lodz.p.it.mtegi.common.exception.ApplicationException;
import pl.lodz.p.it.mtegi.common.security.service.HashEncoder;
import pl.lodz.p.it.mtegi.userservice.exception.UserError;
import pl.lodz.p.it.mtegi.userservice.model.User;

import java.security.NoSuchAlgorithmException;

public class TokenUtils {
    public static String createUserConfirmationToken(User user) throws NoSuchAlgorithmException {
        return HashEncoder.SHA256(user.getId().toString() + user.getUsername());
    }

    public static void checkUserConfirmationToken(User user, String token) throws NoSuchAlgorithmException {
        if(!HashEncoder.SHA256(user.getId().toString() + user.getUsername()).equals(token)){
            throw new ApplicationException(UserError.BAD_TOKEN);
        }
    }
}
