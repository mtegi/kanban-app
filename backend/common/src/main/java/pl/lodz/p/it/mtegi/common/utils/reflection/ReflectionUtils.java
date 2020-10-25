package pl.lodz.p.it.mtegi.common.utils.reflection;

import java.lang.reflect.Field;
import java.lang.reflect.Method;

public class ReflectionUtils {
    public static boolean setField(Object targetObject, String fieldName, Object fieldValue) {
        Field field;
        try {
            field = targetObject.getClass().getDeclaredField(fieldName);
        } catch (NoSuchFieldException e) {
            field = null;
        }
        Class superClass = targetObject.getClass().getSuperclass();
        while (field == null && superClass != null) {
            try {
                field = superClass.getDeclaredField(fieldName);
            } catch (NoSuchFieldException e) {
                superClass = superClass.getSuperclass();
            }
        }
        if (field == null) {
            return false;
        }
        field.setAccessible(true);
        try {
            field.set(targetObject, fieldValue);
            return true;
        } catch (IllegalAccessException e) {
            return false;
        }
    }

    public static Object runGetter(String fieldName, Object o) {
        for (Method method : o.getClass().getDeclaredMethods()) {
            if ((method.getName().startsWith("get")) && (method.getName().length() == (fieldName).length() + 3) ||
                    (method.getName().startsWith("is")) && (method.getName().length() == (fieldName).length() + 2)) {
                if (method.getName().toLowerCase().endsWith(fieldName.toLowerCase())) {
                    try {
                        return method.invoke(o);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        }
        return null;
    }
}
