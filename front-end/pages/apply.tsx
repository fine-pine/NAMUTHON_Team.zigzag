import Container from "../components/container";
import { useForm, useFormContext } from "react-hook-form";
import { ApplicationForm, Bank } from "../interfaces";
import DaumPostcode from "react-daum-postcode";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";

export default function ApplyPage() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    setError,
    setValue,
  } = useForm<ApplicationForm>({
    defaultValues: {
      watt: 0,
      address: "",
      address_detail: "",
      phone_number: "",
      bank: Bank.국민,
    },
  });

  const onCompletePost = (data) => {
    setValue("address", data.address);
  };

  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  const onValid = (data: ApplicationForm) => {
    console.log(data);
    reset();
  };

  return (
    <Container>
      {/* 주소 검색 모달 */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <DaumPostcode onComplete={onCompletePost}></DaumPostcode>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <form onSubmit={handleSubmit(onValid)}>
        <div className="space-y-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            신청서
          </h2>
          <div className="mt-10 flex flex-col gap-8">
            {/* 전력량 */}
            <div className="w-64">
              <label
                htmlFor="watt"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                판매할 전력량
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-yellow-500 sm:max-w-md">
                  <input
                    name="watt"
                    id="watt"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    {...register("watt", {
                      required: "판매할 전력량을 입력해주세요.",
                      min: 100,
                    })}
                  />
                </div>
                <span>
                  {errors?.watt?.type === "min"
                    ? "100kWh의 전력량부터 판매 가능합니다."
                    : ""}
                </span>
              </div>
            </div>

            {/* <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  승인거부 사유
                </label>
                <div className="mt-2">
                  <textarea
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                    {...register("watt", {
                      required: "100kWh의 전력량부터 판매 가능합니다.",
                      min: 100,
                    })}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div> */}

            {/* 주소 */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                주소
              </label>
              <div className="mt-2 flex gap-6">
                <input
                  name="address"
                  id="address"
                  className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                  {...register("address", {
                    required: "주소를 입력해주세요.",
                  })}
                />
                {/* 주소 검색 버튼 */}
                <div
                  className="flex items-center justify-center w-32 rounded-md bg-yellow-500 px-3 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  주소 검색
                </div>
              </div>
              <span>{errors?.address?.message}</span>
            </div>

            <div>
              <label
                htmlFor="address_detail"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                상세주소
              </label>
              <div className="mt-2">
                <input
                  name="address_detail"
                  id="address_detail"
                  className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                  {...register("address_detail", {
                    required: "상세주소를 입력해주세요.",
                  })}
                />
              </div>
              <span>{errors?.address_detail?.message}</span>
            </div>
            {/* 전화번호 */}
            {/* 은행 */}
            <div className="flex gap-6">
              <div className="w-32">
                <label
                  htmlFor="bank"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  은행
                </label>
                <div className="mt-2">
                  <select
                    name="bank"
                    id="bank"
                    className="w-full py-1.5 pl-1"
                    {...register("bank")}
                  >
                    <option value={Bank.국민}>국민</option>
                    <option value={Bank.신한}>신한</option>
                    <option value={Bank.하나}>하나</option>
                  </select>
                </div>
              </div>

              {/* 계좌번호 */}
              <div className="w-full">
                <label
                  htmlFor="account"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  계좌번호
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-yellow-500 sm:max-w-md">
                    <input
                      name="account"
                      id="account"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      {...register("account", {
                        required: "계좌번호를 입력해주세요.",
                        pattern: /^(\d{1,})(-(\d{1,})){1,}/,
                      })}
                    />
                  </div>
                  <span>
                    {errors?.account?.message}
                    {errors?.account?.type === "pattern"
                      ? "올바른 계좌번호를 입력해주세요."
                      : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
          >
            Save
          </button>
        </div>
      </form>
    </Container>
  );
}
