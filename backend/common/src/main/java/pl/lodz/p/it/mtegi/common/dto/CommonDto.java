package pl.lodz.p.it.mtegi.common.dto;

import pl.lodz.p.it.mtegi.common.utils.reflection.ReflectionUtils;

import java.util.Arrays;

public abstract class CommonDto<T> implements RequestDto<T>, ResponseDto<T> {
    @Override
    public void putProperties(T entity) {
        Arrays.stream(this.getClass().getDeclaredFields()).forEach(field -> ReflectionUtils.setField(entity, field.getName(), ReflectionUtils.runGetter(field.getName(), this)));
    }

    @Override
    public void fillProperties(T entity) {
        Arrays.stream(this.getClass().getDeclaredFields()).forEach(field -> ReflectionUtils.setField(this, field.getName(), ReflectionUtils.runGetter(field.getName(), entity)));
    }
}
