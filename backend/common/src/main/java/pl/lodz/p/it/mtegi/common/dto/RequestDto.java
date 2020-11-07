package pl.lodz.p.it.mtegi.common.dto;

public interface RequestDto<T> {
    void putProperties(T entity);
}
