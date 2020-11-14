import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useEffect, useState } from 'react';

const defaultClient = new Client({
  webSocketFactory: () => new SockJS('http://localhost:8100/ws'),
  reconnectDelay: 5000,
  debug: (str) => console.log(str),
});

const useWebSockets = () => {
  const prefix = '/api';
  const [client, setClient] = useState(defaultClient);

  const send = (url, body) => {
    try {
      client.publish({
        destination: `${prefix}${url}`,
        body: JSON.stringify(body),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const subscribe = (dest, handler) => {
    try {
      setTimeout(() => {
        client.subscribe(dest, handler);
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setClient(defaultClient);
    try {
      client.activate();
    } catch (e) {
      try {
        setTimeout(() => client.activate(), 200);
      } catch (err) {
        console.error(err);
      }
    }
    return () => {
      client.deactivate();
    };
  }, []);

  return { send, subscribe };
};

export default useWebSockets;
