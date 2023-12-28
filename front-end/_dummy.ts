import { Application, Bank } from "./interfaces";

export const application_dummy: Application = {
  id: 1,
  watt: 200,
  address: "역삼로 180 마루 180 지하 1층",
  phone_number: "010-0000-0000",
  date: new Date("2023-12-29"),
  bank: Bank.국민,
  account: "000000-00-000000",
  status: 1,
  description: "사유입니다.",
  admittedAt: new Date("2023-12-29"),
  collectedAt: null,
  createdAt: new Date("2023-12-29"),
  updatedAt: new Date("2023-12-29"),
  user_id: 1,
};

export const applications_dummy: Application[] = [
  {
    id: 2,
    watt: 200,
    address: "역삼로 180 마루 180 지하 1층",
    phone_number: "010-0000-0000",
    date: new Date("2023-12-29"),
    bank: Bank.국민,
    account: "000000-00-000000",
    status: 1,
    description: "사유입니다.",
    admittedAt: new Date("2023-12-29"),
    collectedAt: null,
    createdAt: new Date("2023-12-29"),
    updatedAt: new Date("2023-12-29"),
    user_id: 2,
  },
  {
    id: 3,
    watt: 200,
    address: "역삼로 180 마루 180 지하 1층",
    phone_number: "010-0000-0000",
    date: new Date("2023-12-29"),
    bank: Bank.국민,
    account: "000000-00-000000",
    status: 1,
    description: "사유입니다.",
    admittedAt: new Date("2023-12-29"),
    collectedAt: null,
    createdAt: new Date("2023-12-29"),
    updatedAt: new Date("2023-12-29"),
    user_id: 3,
  },
];

export const user_dummy = {
  id: 1,
  google_email: "honggildong@gmail.com",
  google_name: "홍길동",
};
