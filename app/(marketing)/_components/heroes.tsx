import Image from "next/image";

export const Heroes = () => {
  return (
    <div className="flex max-w-5xl flex-col items-center justify-center">
      <div className="flex items-center">
        <div className="relative h-[300px] w-[300px] sm:h-[350px] sm:w-[350px] md:h-[400px] md:w-[400px]">
          <Image
            alt="Documents"
            className="object-contain dark:hidden"
            fill
            src="/documents.png"
          />
          <Image
            alt="Documents"
            className="hidden object-contain dark:block"
            fill
            src="/documents-dark.png"
          />
        </div>
        <div className="relative hidden h-[400px] w-[400px] md:block">
          <Image
            alt="Reading"
            className="object-contain dark:hidden"
            fill
            src="/reading.png"
          />
          <Image
            alt="Reading"
            className="hidden object-contain dark:block"
            fill
            src="/reading-dark.png"
          />
        </div>
      </div>
    </div>
  );
};
