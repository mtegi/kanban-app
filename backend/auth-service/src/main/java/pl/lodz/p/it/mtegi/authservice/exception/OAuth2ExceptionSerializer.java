package pl.lodz.p.it.mtegi.authservice.exception;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;

public class OAuth2ExceptionSerializer extends StdSerializer<OAuth2ExceptionDto> {

    public OAuth2ExceptionSerializer() {
        super(OAuth2ExceptionDto.class);
    }

    @Override
    public void serialize(OAuth2ExceptionDto oAuth2ExceptionDto, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeObjectField("message", oAuth2ExceptionDto.getMessage());
        jsonGenerator.writeEndObject();
    }
}
