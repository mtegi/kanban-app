package pl.lodz.p.it.mtegi.common.dto;

public interface ResponseDto<T> {
    void fillProperties(T entity);
}
