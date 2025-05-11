export default function Loading(){
     return (
    <div className="p-5 animate-pulse flex flex-col gap-5">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="flex gap-20 animate-pulse">
          <div key="div1" className="relative">
            <div className="absolute z-10 size-12 rounded-full bg-neutral-700" />
            <div className="absolute z-20 top-6 left-6 size-12 rounded-md bg-neutral-700 border-2 border-neutral-900" />
          </div>
          <div key="div2" className="flex flex-col gap-2 *:rounded-md">
            <div className="bg-neutral-700 h-5 w-20" />
            <div className="bg-neutral-700 h-5 w-40" />
          </div>
        </div>
      ))}
    </div>
  );
}