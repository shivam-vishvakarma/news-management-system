export default function ContainerWithHeading({ children, heading }) {
  return (
    <div className="w-full bg-slate-50 dark:bg-gray-800/50 shadow-sm   p-3 grid  gap-4 rounded-md">
      <h2 className=" mx-auto  w-min  whitespace-nowrap capitalize text-3xl dark:text-white ">
        {heading}
      </h2>
      <div className={`w-full grid gap-2`}>
            {children}
          </div>
    </div>
  );
}
