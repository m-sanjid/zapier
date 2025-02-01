export const CheckFeature = ({ label }: { label: string }) => {
  return (
    <div className="flex">
      <div className="pr-4k">
        <CheckMark />
      </div>
      {label}
    </div>
  );
};

function CheckMark() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      height="20"
      width="20"
      className="size-5"
      color="StatusSuccessStronger"
      name="formCheckCircle"
    >
      <path
        fill="#258323 "
        d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM8.21 10.79l2.79 2.8 5.29-5.3 1.42 1.42-6.71 6.7-4.21-4.2 1.42-1.42Z"
      ></path>
    </svg>
  );
}
