import { Catch } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

@Catch(WsException)
export class MyWsExceptionFilter extends BaseWsExceptionFilter {
  handleError<
    TClient extends {
      emit;
    },
  >(client: TClient, exception: WsException) {
    const message = {
      status: 'error',
      message: exception.getError(),
    };
    client.emit('error', message);
  }
}
