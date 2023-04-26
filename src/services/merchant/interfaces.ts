interface UserInput {
  kycId: string;
  kycType: string;
  secretKey: string;
}

interface IMerchant {
  _id: string,
  merchantId: string,
  firstName: string,
  lastName: string,
  ballance: string,
  status: string,
  disabled: string,
  publicKey: string,
  secretKey: string,
  testPublicKey: string,
  testSecretKey: string,
  createdAt: Date,
  updatedAt: Date,
}


type ICreateM = {
  merchantId: string,
  firstName: string,
  lastName: string,

}
export { UserInput, IMerchant, ICreateM };


