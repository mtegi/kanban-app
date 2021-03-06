package pl.lodz.p.it.mtegi.common.dto;

import pl.lodz.p.it.mtegi.common.utils.reflection.ReflectionUtils;

import java.util.Arrays;

public abstract class CommonResponseDto<T> implements ResponseDto<T> {
    @Override
    public void fillProperties(T entity) {
        Arrays.stream(entity.getClass().getDeclaredFields()).forEach(field -> ReflectionUtils.setField(this, field.getName(), ReflectionUtils.runGetter(field.getName(), entity)));
    }
}
