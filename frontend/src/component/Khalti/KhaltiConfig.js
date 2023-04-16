import { payOrder } from "../../actions/orderAction";
import mykey from "./KhaltiKey";

const khalticonfig = (dispatch, orderId, order) => {
  const successPaymentHandler = (paymentResult) => {
    dispatch(
      payOrder(orderId, {
        paymentMethod: order.paymentMethod,
        paymentResult: {
          token: paymentResult.token,
          amount: order.totalPrice * 100,
        },
      })
    );
  };

  return {
    publicKey: mykey.publicTestKey,
    productIdentity: "12345",
    productName: "BikersPortal",
    productUrl: "http://localhost:3000",
    eventHandler: {
      onSuccess(payload) {
        //hitting merchant api for initiating verification
        console.log("Payment Successful");
        console.log(payload);
        successPaymentHandler(payload);
      },

      // onError(error)
      // {
      // handle errors,
      // console.log(error);
      // }
    },

    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };
};

export default khalticonfig;
