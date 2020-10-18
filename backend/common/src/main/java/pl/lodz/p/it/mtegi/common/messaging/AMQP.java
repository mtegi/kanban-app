package pl.lodz.p.it.mtegi.common.messaging;

public interface AMQP {

    interface EXCHANGES {
        String ACCOUNTS = "accounts.direct";
    }

    interface KEYS {
        String REGISTER = "register";
        String ACCOUNT_CONFIRM = "confirm";
    }

    interface QUEUES {
        String REGISTER = "accounts.register";
        String ACCOUNT_CONFIRM = "accounts.confirm";
    }
}
