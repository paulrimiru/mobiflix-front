import { http } from 'src/Utils/axios-helpers';

import { ValidateVoucherActions } from './types';

export const validateVoucherAction = (validateAction: ValidateVoucherActions, voucher: string) => ({ type: validateAction,  voucher});

export const validateVoucher = (voucher) => (dispatch) => {
  return http
          .get(`/content/items/verify/${voucher}/`)
          .then((resp) => {
            if (resp.data.status === 'WATCH') {
              dispatch(validateVoucherAction(ValidateVoucherActions.validateVoucherSuccess, voucher));
            } else {
              dispatch(validateVoucherAction(ValidateVoucherActions.validateVoucherFailure, voucher));
            }
          })
          .catch((error) => {
            dispatch(validateVoucherAction(ValidateVoucherActions.validateVoucherFailure, voucher));
          });
};

export default (state = { isValid: false, voucher: '' }, action) => {
  switch (action.type) {
    case ValidateVoucherActions.validateVoucherSuccess:
      return {
        ...state,
        isValid: true,
        voucher: action.voucher,
      }
    case ValidateVoucherActions.validateVoucherFailure:
      return {
        ...state,
        isValid: false,
        voucher: action.voucher,
      }
    default:
      return state
  }
}
