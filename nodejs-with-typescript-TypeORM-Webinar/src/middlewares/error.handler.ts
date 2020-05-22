import {
  BAD_REQUEST_STATUS_CODE,
  BAD_REQUEST_STATUS_MESSAGE,
  INTERNAL_SERVER_MESSAGE,
  INTERNAL_SERVER_STATUS_CODE,
  NOT_FOUND_STATUS_CODE,
  NOT_FOUND_STATUS_MESSAGE,
} from '../config/constants';

import { BadRequestException, NotFoundException, ServerException } from '../lib/custom-errors';
import { Logger } from '../lib/logger';
import APIError from '../app/global/response/apierror';

const middlewares = {
  handleRequestError(error: any, req: any, res: any, next: any) {
    const logger: any = new Logger();
    switch (true) {
      case (error instanceof NotFoundException):
        res.status(NOT_FOUND_STATUS_CODE).json({
          success: false, error: NOT_FOUND_STATUS_MESSAGE, statusCode: NOT_FOUND_STATUS_CODE,
        });
        break;
      case (error instanceof APIError):
        res.status(BAD_REQUEST_STATUS_CODE).json({
          success: false, error: BAD_REQUEST_STATUS_CODE, statusCode: BAD_REQUEST_STATUS_CODE, message: error.message, code: error.ErrorID
        });
        break;
      case (error instanceof ServerException):
        res.status(INTERNAL_SERVER_STATUS_CODE).json({
          success: false, error: INTERNAL_SERVER_MESSAGE, statusCode: INTERNAL_SERVER_STATUS_CODE,
        });
        break;
      case (error instanceof BadRequestException):
        res.status(BAD_REQUEST_STATUS_CODE).json({
          success: false, error: BAD_REQUEST_STATUS_MESSAGE, statusCode: BAD_REQUEST_STATUS_CODE,
        });
        break;
      default:
        res.status(INTERNAL_SERVER_STATUS_CODE).json({
          success: false, error: INTERNAL_SERVER_MESSAGE, statusCode: INTERNAL_SERVER_STATUS_CODE,
        });
      // send email
    }
    logger.log('info', 'Request handle error!!', error);
    res.end();
  },
};

export { middlewares };
