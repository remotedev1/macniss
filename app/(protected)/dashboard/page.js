import ImageModel from "@/components/common/Image-model";

export default function Home() {
  return (
    <div className="flex flex-col gap-5 items-center p-5">
      <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
      <div>
        <ImageModel
          path="/images/site/castle"
          width={200}
          height={200}
          loading="lazy"
          alt="Alt text"
        />
      </div>
    </div>
  );
}
