package pl.lodz.p.it.mtegi.common.dto;

import pl.lodz.p.it.mtegi.common.utils.reflection.ReflectionUtils;

import java.util.Arrays;

public abstract class CommonRequestDto<T> implements RequestDto<T> {
    @Override
    public void putProperties(T entity) {
        Arrays.stream(entity.getClass().getDeclaredFields()).forEach(field -> ReflectionUtils.setField(entity, field.getName(), ReflectionUtils.runGetter(field.getName(), this)));
    }
}
